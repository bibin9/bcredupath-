import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { AdminConsole } from "@/components/admin/AdminConsole";
import { Shield, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const ok = await isAdmin();
  if (!ok) redirect("/dashboard");

  return (
    <div className="space-y-6">
      <header className="relative overflow-hidden rounded-4xl border border-neon-pink/25 bg-gradient-to-br from-neon-pink/15 via-bg-2 to-neon-purple/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-pink/20 blur-3xl" />
        <div className="relative">
          <span className="pill-neon-pink">
            <Shield className="h-3 w-3" /> Admin
          </span>
          <h1 className="mt-3 flex items-center gap-3 font-display text-3xl font-bold md:text-5xl">
            Content Console <span className="grad-text">⚡</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/65 md:text-base">
            Import real PYQs from CSV (Oswaal, Educart, official papers) and approve AI-generated questions.
            Verified questions get a ✓ badge for students.
          </p>
        </div>
      </header>

      <AdminConsole />
    </div>
  );
}
