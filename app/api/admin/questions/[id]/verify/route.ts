import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";

export const dynamic = "force-dynamic";

const Body = z.object({
  verified: z.boolean(),
});

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  await connectDB();
  await Question.updateOne(
    { _id: params.id },
    {
      $set: {
        verified: parsed.data.verified,
        ...(parsed.data.verified
          ? { verifiedBy: auth.user.email, verifiedAt: new Date() }
          : { $unset: { verifiedBy: "", verifiedAt: "" } }),
      },
    }
  );
  return NextResponse.json({ ok: true });
}
