import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Career } from "@/models/Career";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;

  const items = await Career.find(filter).sort({ name: 1 }).lean();
  return NextResponse.json({ items });
}
