import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Ask AI is paused. All methods return a quiet 503 so any stale client
 * calls don't trigger red error toasts. The UI never invokes these
 * anymore — /dashboard/doubt renders a static "feature paused" notice.
 */
const PAUSED = NextResponse.json(
  { error: "Ask AI is currently paused — see /dashboard/doubt for alternatives." },
  { status: 503 }
);

export async function GET() {
  // Return empty list so any client expecting a list shape renders cleanly.
  return NextResponse.json({ items: [] });
}

export async function POST() {
  return PAUSED;
}

export async function PATCH() {
  return PAUSED;
}
