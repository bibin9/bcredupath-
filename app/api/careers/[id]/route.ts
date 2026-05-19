import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Career } from "@/models/Career";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  await connectDB();
  const career = await Career.findById(params.id).populate("topColleges").lean();
  if (!career) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ career });
}
