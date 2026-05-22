import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Generate Qs is paused — the UI page renders a static notice and
 * never calls this endpoint.
 */
export async function POST() {
  return NextResponse.json(
    { error: "Question generator is currently paused — see /dashboard/generate." },
    { status: 503 }
  );
}
