import { GradientBlobs } from "@/components/shared/GradientBlobs";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen">
      <GradientBlobs />
      <div
        className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5"
        style={{
          paddingTop: "max(3rem, env(safe-area-inset-top))",
          paddingBottom: "max(3rem, env(safe-area-inset-bottom))",
        }}
      >
        {children}
      </div>
    </main>
  );
}
