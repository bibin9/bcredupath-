import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { CareerQuiz } from "@/components/careers/CareerQuiz";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CareerQuizPage() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();

  return (
    <div className="space-y-4">
      <Link
        href="/dashboard/careers"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to careers
      </Link>

      <div className="text-center">
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          What gets you going? <span className="grad-text">⚡</span>
        </h1>
        <p className="mt-1 text-sm text-white/65">
          20 questions · ~2 min · We'll match you to careers
        </p>
      </div>

      <CareerQuiz defaultInterests={user?.interests ?? []} />
    </div>
  );
}
