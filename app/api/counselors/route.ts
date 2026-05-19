import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Counselor } from "@/models/Counselor";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const specialization = searchParams.get("spec");

  const filter: Record<string, unknown> = { verified: true };
  if (city) filter.city = city;
  if (state) filter.state = state;
  if (specialization) filter.specialization = specialization;

  const items = await Counselor.find(filter).sort({ rating: -1, name: 1 }).lean();
  return NextResponse.json({ items });
}
