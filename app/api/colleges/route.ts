import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { College } from "@/models/College";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const type = searchParams.get("type");
  const search = searchParams.get("q");

  const filter: Record<string, unknown> = {};
  if (state) filter.state = state;
  if (type) filter.type = type;
  if (search) filter.name = { $regex: search, $options: "i" };

  const items = await College.find(filter).sort({ nirfRank: 1, name: 1 }).lean();
  return NextResponse.json({ items });
}
