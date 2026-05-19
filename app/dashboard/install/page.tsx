"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Smartphone, Apple, Globe, ChevronRight, Download, Share2, Plus, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type Platform = "ios" | "android" | "desktop" | "unknown";

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua) && !("MSStream" in window)) return "ios";
  if (/android/i.test(ua)) return "android";
  if (/Mobi/i.test(ua)) return "android"; // best guess
  return "desktop";
}

export default function InstallPage() {
  const [platform, setPlatform] = useState<Platform>("unknown");
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
    // Detect if already running as installed PWA
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setInstalled(isStandalone);

    function onPrompt(e: Event) {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  async function nativeInstall() {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === "accepted") {
      toast.success("BCRedupath installed 🎉");
      setInstalled(true);
    }
    setInstallEvent(null);
  }

  return (
    <div className="space-y-5">
      <header className="relative overflow-hidden rounded-4xl border border-neon-cyan/25 bg-gradient-to-br from-neon-cyan/15 via-bg-2 to-neon-purple/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-cyan/20 blur-3xl" />
        <div className="relative">
          <span className="pill-neon-cyan">
            <Smartphone className="h-3 w-3" /> One-tap install · free · ~2 MB
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            Install <span className="grad-text">BCRedupath</span> 📲
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/65 md:text-base">
            Add it to your home screen → opens like a real app, works <b className="text-white">even offline</b>,
            no Play Store / App Store needed.
          </p>
        </div>
      </header>

      {installed ? (
        <div className="card-glass !border-neon-green/30 !bg-neon-green/8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-neon-green" />
          <h2 className="mt-3 font-display text-xl font-bold">You're already installed 🎉</h2>
          <p className="mt-1 text-sm text-white/65">
            Tap the BCRedupath icon on your home screen anytime.
          </p>
        </div>
      ) : (
        <>
          {/* Platform tabs */}
          <div className="inline-flex gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
            <PlatformTab id="android" current={platform} setCurrent={setPlatform} icon="🤖" label="Android" />
            <PlatformTab id="ios" current={platform} setCurrent={setPlatform} icon="🍎" label="iPhone / iPad" />
            <PlatformTab id="desktop" current={platform} setCurrent={setPlatform} icon="💻" label="Desktop" />
          </div>

          {/* Auto-install button if browser supports it */}
          {installEvent && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-glass !border-neon-pink/30 !bg-neon-pink/8"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-display text-lg font-bold">⚡ One-tap install</div>
                  <div className="text-xs text-white/65">
                    Your browser supports automatic install. Skip the manual steps below.
                  </div>
                </div>
                <button onClick={nativeInstall} className="btn-neon shrink-0 text-sm">
                  <Download className="h-4 w-4" /> Install
                </button>
              </div>
            </motion.div>
          )}

          {/* Platform-specific instructions */}
          {platform === "ios" && <IOSInstructions />}
          {platform === "android" && <AndroidInstructions />}
          {platform === "desktop" && <DesktopInstructions />}
          {platform === "unknown" && (
            <div className="card-glass text-center text-sm text-white/65">
              Pick your device above for step-by-step instructions.
            </div>
          )}
        </>
      )}

      {/* Why install */}
      <section className="card-glass">
        <h2 className="mb-3 font-display text-lg font-bold">What you get when you install</h2>
        <ul className="grid gap-2 text-sm text-white/80 sm:grid-cols-2">
          <Perk emoji="🚀" title="Opens instantly" text="Like a real app — no browser bar, splash screen, full screen." />
          <Perk emoji="📴" title="Works offline" text="Question bank pages and bookmarks are cached. Study without WiFi." />
          <Perk emoji="🔔" title="Stays out of the way" text="No ads, no notifications you didn't ask for." />
          <Perk emoji="🎯" title="Home-screen icon" text="One tap to jump straight to today's daily challenge." />
        </ul>
      </section>
    </div>
  );
}

function PlatformTab({
  id,
  current,
  setCurrent,
  icon,
  label,
}: {
  id: Platform;
  current: Platform;
  setCurrent: (p: Platform) => void;
  icon: string;
  label: string;
}) {
  const active = current === id;
  return (
    <button
      onClick={() => setCurrent(id)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
        active
          ? "bg-neon-purple/20 text-white shadow-glow-purple"
          : "text-white/55 hover:text-white"
      )}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function IOSInstructions() {
  return (
    <section className="card-glass">
      <div className="mb-3 flex items-center gap-2">
        <Apple className="h-4 w-4 text-white" />
        <h2 className="font-display text-lg font-bold">iPhone / iPad — Safari</h2>
      </div>
      <ol className="space-y-3">
        <Step num={1} icon={<Globe className="h-4 w-4" />}>
          <span>
            Open this page in <b>Safari</b>{" "}
            <span className="text-white/55">(not Chrome or any other browser — iOS only allows installs from Safari)</span>
          </span>
        </Step>
        <Step num={2} icon={<Share2 className="h-4 w-4" />}>
          Tap the <b>Share</b> icon at the bottom (the square with an arrow pointing up)
        </Step>
        <Step num={3} icon={<Plus className="h-4 w-4" />}>
          Scroll the share sheet and tap <b>"Add to Home Screen"</b>
        </Step>
        <Step num={4} icon={<CheckCircle2 className="h-4 w-4 text-neon-green" />}>
          Tap <b>"Add"</b> in the top right. Done — icon appears on your home screen.
        </Step>
      </ol>
      <p className="mt-4 rounded-2xl border border-neon-yellow/25 bg-neon-yellow/8 p-3 text-xs text-white/80">
        💡 iOS doesn't have a one-tap install. The "Add to Home Screen" path is the Apple-blessed way.
      </p>
    </section>
  );
}

function AndroidInstructions() {
  return (
    <section className="card-glass">
      <div className="mb-3 flex items-center gap-2">
        <Smartphone className="h-4 w-4 text-neon-green" />
        <h2 className="font-display text-lg font-bold">Android — Chrome</h2>
      </div>
      <ol className="space-y-3">
        <Step num={1}>
          Open this page in <b>Chrome</b>
        </Step>
        <Step num={2}>
          Tap the <b>three-dot menu</b> in the top-right of Chrome
        </Step>
        <Step num={3} icon={<Download className="h-4 w-4" />}>
          Tap <b>"Install app"</b> or <b>"Add to Home Screen"</b>{" "}
          <span className="text-white/55">(wording varies by Chrome version)</span>
        </Step>
        <Step num={4} icon={<CheckCircle2 className="h-4 w-4 text-neon-green" />}>
          Confirm. The BCRedupath icon now lives next to your other apps.
        </Step>
      </ol>
      <p className="mt-4 rounded-2xl border border-neon-cyan/25 bg-neon-cyan/8 p-3 text-xs text-white/80">
        💡 On most Chrome Android setups you'll also see an "Install" pop-up in the address bar — tap that instead for one-step install.
      </p>
    </section>
  );
}

function DesktopInstructions() {
  return (
    <section className="card-glass">
      <div className="mb-3 flex items-center gap-2">
        <Globe className="h-4 w-4 text-neon-cyan" />
        <h2 className="font-display text-lg font-bold">Desktop — Chrome / Edge</h2>
      </div>
      <ol className="space-y-3">
        <Step num={1}>
          Look at the address bar. On the right side, you'll see a small{" "}
          <b>install icon</b> (a monitor with an arrow ⬇)
        </Step>
        <Step num={2}>
          Click it → <b>"Install"</b>
        </Step>
        <Step num={3} icon={<CheckCircle2 className="h-4 w-4 text-neon-green" />}>
          BCRedupath opens in its own window with no browser chrome. Pin it to your dock / taskbar.
        </Step>
      </ol>
      <p className="mt-4 rounded-2xl border border-neon-yellow/25 bg-neon-yellow/8 p-3 text-xs text-white/80">
        💡 No install icon? Click the three-dot menu → "Cast, save and share" → "Install BCRedupath".
      </p>
    </section>
  );
}

function Step({ num, children, icon }: { num: number; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-grad-pink-purple text-xs font-bold shadow-glow-pink">
        {num}
      </div>
      <div className="flex-1 pt-0.5 text-sm text-white/85">
        {children}
        {icon && <span className="ml-2 inline-block align-middle text-white/45">{icon}</span>}
      </div>
    </li>
  );
}

function Perk({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <li className="flex gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
      <div className="text-2xl">{emoji}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-white/65">{text}</div>
      </div>
    </li>
  );
}
