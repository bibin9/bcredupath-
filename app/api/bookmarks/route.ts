import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  await connectDB();
  return User.findOne({ email: session.user.email.toLowerCase() });
}

/** GET /api/bookmarks → list of bookmarked question IDs (string[]) */
export async function GET() {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ ids: user.bookmarks.map((id) => String(id)) });
}

/** POST { questionId } → add bookmark */
export async function POST(req: Request) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const id = body?.questionId;
  if (!id || !mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid questionId" }, { status: 400 });
  }
  await User.updateOne(
    { _id: user._id },
    { $addToSet: { bookmarks: new mongoose.Types.ObjectId(id) } }
  );
  return NextResponse.json({ ok: true });
}

/** DELETE ?questionId=... → remove bookmark */
export async function DELETE(req: Request) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("questionId");
  if (!id || !mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid questionId" }, { status: 400 });
  }
  await User.updateOne(
    { _id: user._id },
    { $pull: { bookmarks: new mongoose.Types.ObjectId(id) } }
  );
  return NextResponse.json({ ok: true });
}
