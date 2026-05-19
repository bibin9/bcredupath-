"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Download, X, ArrowRight } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "bcr_pwa_install_dismissed";

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent || "") && !("MSStream" in window);
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export function PWARegister() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [iosMode, setIosMode] = useState(false);

  /* Register service worker (production only) */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch((err) => console.warn("[sw] register failed:", err));
  }, []);

  /* Capture install prompt OR show iOS banner */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isStandalone()) return; // already installed

    const dismissed = localStorage.getItem(DISMISS_KEY);
    const dismissedRecently =
      dismissed && Date.now() - Number(dismissed) < 7 * 24 * 3600_000; // 7 days

    if (dismissedRecently) return;

    // iOS: no beforeinstallprompt event ever. Show our own banner pointing at /install.
    if (isIOS()) {
      setIosMode(true);
      setShowBanner(true);
      return;
    }

    function onBeforeInstall(e: Event) {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  async function install() {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === "accepted") {
      toast.success("BCRedupath installed 🎉");
    }
    setInstallEvent(null);
    setShowBanner(false);
  }

  function dismiss() {
    setShowBanner(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    }
  }

  if (!showBanner) return null;

  return (
    <div
      className="fixed left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0"
      style={{
        bottom: "calc(6rem + env(safe-area-inset-bottom))",
      }}
    >
      <div className="card-glass !p-4 shadow-glow-pink">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-grad-pink-purple text-xl shadow-glow-pink">
            📲
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display text-sm font-bold">Install BCRedupath</div>
            <p className="mt-0.5 text-xs text-white/65">
              {iosMode
                ? "Add to your iPhone home screen — opens like a native app."
                : "Daily reminders, offline questions, never miss a streak."}
            </p>
            <div className="mt-2 flex gap-2">
              {iosMode ? (
                <Link
                  href="/dashboard/install"
                  onClick={() => setShowBanner(false)}
                  className="inline-flex items-center gap-1 rounded-xl bg-grad-pink-purple px-3 py-1.5 text-xs font-bold text-white shadow-glow-pink"
                >
                  Show me how <ArrowRight className="h-3 w-3" />
                </Link>
              ) : (
                <button
                  onClick={install}
                  className="inline-flex items-center gap-1 rounded-xl bg-grad-pink-purple px-3 py-1.5 text-xs font-bold text-white shadow-glow-pink"
                >
                  <Download className="h-3 w-3" /> Install
                </button>
              )}
              <button
                onClick={dismiss}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70"
              >
                Later
              </button>
            </div>
          </div>
          <button onClick={dismiss} aria-label="Dismiss" className="text-white/45 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
