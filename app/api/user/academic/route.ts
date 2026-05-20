import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/user/academic
 *
 * Lets an already-onboarded user change their class/stream after the
 * fact (e.g. promoted from Class 10 to 11/12, picked wrong stream).
 */
const Body = z
  .object({
    class: z.union([z.literal(10), z.literal(12)]),
    stream: z.enum(["pcm", "pcb", "commerce", "humanities"]).nullable().optional(),
  })
  .refine(
    (d) => (d.class === 12 ? !!d.stream : true),
    { message: "Stream required for Class 12", path: ["stream"] }
  );

export async function PATCH(req: Request) {
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
    {
      $set: {
        class: parsed.data.class,
        stream: parsed.data.class === 10 ? null : parsed.data.stream ?? null,
      },
    },
    { new: true }
  ).lean();

  if (!updated) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ ok: true, class: updated.class, stream: updated.stream });
}
