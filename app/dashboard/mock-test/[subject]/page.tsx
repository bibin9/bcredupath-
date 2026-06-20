import { MockTestRunner } from "@/components/mock-test/MockTestRunner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MockTestSubjectPage({
  params,
}: {
  params: { subject: string };
}) {
  return (
    <div className="space-y-4">
      <Link
        href="/dashboard/mock-test"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Other subjects
      </Link>
      <MockTestRunner subject={params.subject} />
    </div>
  );
}
