import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Career } from "@/models/Career";
import { College } from "@/models/College";

export const dynamic = "force-dynamic";

/**
 * GET /api/careers/:id/colleges?degree=MBBS
 *
 * Returns colleges relevant to this career, optionally filtered by degree.
 * Falls back to the career's topColleges list when no specific filter matches.
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const { searchParams } = new URL(req.url);
  const degree = searchParams.get("degree")?.toLowerCase() ?? "";

  await connectDB();
  // Force College model registration so populate doesn't trip
  void College;

  const career = await Career.findById(params.id)
    .populate({
      path: "topColleges",
      model: "College",
    })
    .lean();
  if (!career) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const topColleges = (career.topColleges ?? []) as unknown as Array<{
    _id: unknown;
    name: string;
    type: string;
    country: string;
    state: string;
    city: string;
    nirfRank?: number;
    globalRank?: number;
    courses: string[];
    website?: string;
    admissionLink?: string;
    address?: string;
    phone?: string;
    email?: string;
    highlights?: string[];
    nriQuota?: {
      available: boolean;
      annualFeeINR?: number;
      cutoffNotes?: string;
      seatPercent?: number;
      notes?: string;
    };
  }>;

  // Try to filter by degree match (courses array contains keywords from degree)
  let filtered = topColleges;
  if (degree) {
    // Extract significant words from the degree string ("MBBS" / "B.Tech CSE" / "MD (Cardiology)")
    const keywords = degree
      .replace(/[()/-]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 3);

    filtered = topColleges.filter((c) => {
      const haystack = (c.courses ?? []).join(" ").toLowerCase();
      return keywords.some((k) => haystack.includes(k));
    });

    // If no matches, fall back to broader matching by category-style keywords
    if (filtered.length === 0) {
      const broadKeywords: Record<string, string[]> = {
        mbbs: ["mbbs", "medicine"],
        md: ["md", "ms"],
        bds: ["bds"],
        "b.tech": ["b.tech", "btech", "engineering"],
        "m.tech": ["m.tech", "mtech"],
        mba: ["mba", "pgp"],
        llb: ["llb", "law"],
        "b.des": ["b.des", "design"],
        "b.arch": ["b.arch", "architecture"],
        "b.sc": ["b.sc", "msc"],
        ca: ["ca", "accountancy"],
      };
      for (const key of keywords) {
        for (const [k, alts] of Object.entries(broadKeywords)) {
          if (key.startsWith(k) || alts.some((a) => key.startsWith(a))) {
            filtered = topColleges.filter((c) => {
              const haystack = (c.courses ?? []).join(" ").toLowerCase();
              return alts.some((a) => haystack.includes(a));
            });
            if (filtered.length > 0) break;
          }
        }
        if (filtered.length > 0) break;
      }
    }

    // Still nothing → show all topColleges (better than blank)
    if (filtered.length === 0) filtered = topColleges;
  }

  const colleges = filtered.map((c) => ({
    _id: String(c._id),
    name: c.name,
    type: c.type,
    country: c.country ?? "India",
    state: c.state,
    city: c.city,
    nirfRank: c.nirfRank,
    globalRank: c.globalRank,
    website: c.website,
    admissionLink: c.admissionLink,
    address: c.address,
    phone: c.phone,
    email: c.email,
    highlights: c.highlights ?? [],
    nriQuota: c.nriQuota,
  }));

  return NextResponse.json({ colleges, total: colleges.length, degree });
}
