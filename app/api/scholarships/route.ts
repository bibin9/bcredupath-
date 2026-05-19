import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Scholarship } from "@/models/Scholarship";

export const dynamic = "force-dynamic";

/** GET /api/scholarships?state=&type=&matchMe=true */
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const type = searchParams.get("type");

  const orClauses: Record<string, unknown>[] = [];
  if (state) {
    // Show all-India (state: null) AND user's state
    orClauses.push({ state: null }, { state });
  }

  const filter: Record<string, unknown> = {};
  if (type) filter.type = type;
  if (orClauses.length) filter.$or = orClauses;

  const items = await Scholarship.find(filter).sort({ amount: -1, name: 1 }).lean();
  return NextResponse.json({ items });
}
