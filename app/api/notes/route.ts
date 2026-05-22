import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Revision Notes is paused — the UI page renders a static notice and
 * never calls this endpoint. Stale callers get a clean 503.
 */
export async function GET() {
  return NextResponse.json(
    { error: "Revision Notes is currently paused — see /dashboard/notes." },
    { status: 503 }
  );
}
