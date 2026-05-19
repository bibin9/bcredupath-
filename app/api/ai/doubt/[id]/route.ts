import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Doubt } from "@/models/Doubt";

export const dynamic = "force-dynamic";

const PatchBody = z.object({
  helpful: z.boolean().nullable().optional(),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const parsed = PatchBody.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  await connectDB();
  const me = await User.findOne({ email: session.user.email.toLowerCase() }).select("_id").lean();
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  await Doubt.updateOne(
    { _id: params.id, userId: me._id },
    { $set: parsed.data }
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await connectDB();
  const me = await User.findOne({ email: session.user.email.toLowerCase() }).select("_id").lean();
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  await Doubt.deleteOne({ _id: params.id, userId: me._id });
  return NextResponse.json({ ok: true });
}
