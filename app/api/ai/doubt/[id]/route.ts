import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PAUSED = NextResponse.json({ error: "Ask AI paused" }, { status: 503 });

export async function PATCH() {
  return PAUSED;
}

export async function DELETE() {
  return PAUSED;
}
