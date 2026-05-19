import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { PasswordResetToken } from "@/models/PasswordResetToken";

export const dynamic = "force-dynamic";

const Body = z.object({
  token: z.string().min(20),
  password: z.string().min(6).max(72),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid token or password" }, { status: 400 });
  }
  const { token, password } = parsed.data;

  await connectDB();
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const record = await PasswordResetToken.findOne({ tokenHash, used: false });
  if (!record) {
    return NextResponse.json({ error: "Token invalid or already used" }, { status: 400 });
  }
  if (record.expiresAt < new Date()) {
    return NextResponse.json({ error: "Token expired — request a new one" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.updateOne({ _id: record.userId }, { $set: { passwordHash } });
  await PasswordResetToken.updateOne({ _id: record._id }, { $set: { used: true } });

  return NextResponse.json({ ok: true });
}
