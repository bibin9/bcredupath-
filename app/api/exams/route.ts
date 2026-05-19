import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ExamInfo } from "@/models/ExamInfo";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const upcomingOnly = searchParams.get("upcoming") === "true";

  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (upcomingOnly) filter.examDate = { $gte: new Date() };

  const items = await ExamInfo.find(filter).sort({ examDate: 1, name: 1 }).lean();
  return NextResponse.json({ items });
}
