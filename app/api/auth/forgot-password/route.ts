import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "node:crypto";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { PasswordResetToken } from "@/models/PasswordResetToken";
import { sendEmail, passwordResetEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

const Body = z.object({
  email: z.string().email(),
});

const TOKEN_TTL_MIN = 30;

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  await connectDB();
  const user = await User.findOne({ email: parsed.data.email.toLowerCase() }).select("_id name email").lean();

  // ALWAYS return success to prevent email enumeration.
  // If the user exists, we generate + send a token. If not, we just lie politely.
  if (user) {
    const rawToken = crypto.randomBytes(32).toString("base64url");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MIN * 60_000);

    // Invalidate any prior tokens for this user
    await PasswordResetToken.deleteMany({ userId: user._id });
    await PasswordResetToken.create({ userId: user._id, tokenHash, expiresAt });

    const origin = req.headers.get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3000";
    const resetUrl = `${origin}/reset-password?token=${rawToken}`;

    const result = await sendEmail({
      to: user.email,
      ...passwordResetEmail({ name: user.name ?? "Student", resetUrl }),
    });
    if (!result.ok) {
      console.error("[forgot-password] email failed:", result.error);
    }
  }

  return NextResponse.json({
    ok: true,
    message: "If that email is registered, a reset link is on the way.",
  });
}
