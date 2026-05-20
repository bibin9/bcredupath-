import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

const Body = z.object({
  name: z.string().min(2).max(60).optional(),
  avatar: z.string().min(1).max(8).optional(),
  class: z.union([z.literal(10), z.literal(12)]),
  stream: z.enum(["pcm", "pcb", "commerce", "humanities"]).optional().nullable(),
  country: z.string().min(2).max(60).optional().default("India"),
  state: z.string().optional(),
  city: z.string().optional(),
  school: z.string().optional(),
  interests: z.array(z.string()).max(20).optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectDB();
  const updated = await User.findOneAndUpdate(
    { email: session.user.email.toLowerCase() },
    { $set: { ...parsed.data, onboarded: true } },
    { new: true }
  ).lean();

  if (!updated) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
