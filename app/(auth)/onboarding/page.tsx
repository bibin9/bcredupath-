import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  if (session.user.onboarded) redirect("/dashboard");

  return (
    <OnboardingFlow
      defaultName={session.user.name ?? ""}
      defaultAvatar={session.user.avatar ?? "🦊"}
    />
  );
}
