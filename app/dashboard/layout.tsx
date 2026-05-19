import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Sidebar } from "@/components/shared/Sidebar";
import { BottomNav } from "@/components/shared/BottomNav";
import { TopBar } from "@/components/shared/TopBar";
import { GradientBlobs } from "@/components/shared/GradientBlobs";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  await connectDB();
  const user = await User.findOne({ email: session.user.email.toLowerCase() }).lean();
  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/onboarding");

  const admin = await isAdmin();

  return (
    <div className="relative flex min-h-screen">
      <GradientBlobs />
      <Sidebar showAdmin={admin} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          name={user.name}
          avatar={user.avatar}
          xp={user.xp}
          streak={user.streak}
        />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-24 pt-4 lg:px-8 lg:pb-8">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
