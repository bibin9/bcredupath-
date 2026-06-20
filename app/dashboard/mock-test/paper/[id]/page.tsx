import Link from "next/link";
import { MockTestRunner } from "@/components/mock-test/MockTestRunner";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MockPaperRunnerPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-4">
      <Link
        href="/dashboard/mock-test"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/55 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All sample papers
      </Link>
      <MockTestRunner paperId={params.id} />
    </div>
  );
}
