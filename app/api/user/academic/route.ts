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
    class: z.union([z.literal(10), z.literal(12)]).optional(),
    stream: z.enum(["pcm", "pcb", "commerce", "humanities"]).nullable().optional(),
    country: z.string().min(2).max(60).optional(),
    state: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
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

  const set: Record<string, unknown> = {};
  if (parsed.data.class !== undefined) {
    set.class = parsed.data.class;
    set.stream = parsed.data.class === 10 ? null : parsed.data.stream ?? null;
  }
  if (parsed.data.country !== undefined) set.country = parsed.data.country;
  if (parsed.data.state !== undefined) set.state = parsed.data.state ?? null;
  if (parsed.data.city !== undefined) set.city = parsed.data.city ?? null;

  if (Object.keys(set).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  await connectDB();
  const updated = await User.findOneAndUpdate(
    { email: session.user.email.toLowerCase() },
    { $set: set },
    { new: true }
  ).lean();

  if (!updated) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({
    ok: true,
    class: updated.class,
    stream: updated.stream,
    country: updated.country,
  });
}
