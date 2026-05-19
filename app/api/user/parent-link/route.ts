import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

const Body = z.object({
  parentEmail: z.string().email().optional(),
});

/** Generate / rotate the parent share token. */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = Body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  await connectDB();
  const token = crypto.randomBytes(18).toString("base64url");

  await User.updateOne(
    { email: session.user.email.toLowerCase() },
    {
      $set: {
        parentShareToken: token,
        ...(parsed.data.parentEmail ? { parentEmail: parsed.data.parentEmail } : {}),
      },
    }
  );

  return NextResponse.json({ token });
}

/** Revoke the parent share token. */
export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  await User.updateOne(
    { email: session.user.email.toLowerCase() },
    { $unset: { parentShareToken: "" } }
  );
  return NextResponse.json({ ok: true });
}
