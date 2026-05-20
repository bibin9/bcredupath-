"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the page is running as an installed PWA (standalone mode).
 * - Android / Chrome / Edge: matchMedia("(display-mode: standalone)").matches
 * - iOS Safari: navigator.standalone
 *
 * Always returns false on server render and initial client hydration to
 * avoid hydration mismatches. Updates after mount.
 */
export function useIsStandalone(): boolean {
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function check() {
      const fromMedia = window.matchMedia("(display-mode: standalone)").matches;
      const fromIos =
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setStandalone(fromMedia || fromIos);
    }
    check();

    // Listen for changes (e.g. user installs while page is open)
    const mq = window.matchMedia("(display-mode: standalone)");
    if (mq.addEventListener) {
      mq.addEventListener("change", check);
      return () => mq.removeEventListener("change", check);
    }
    // Fallback for older Safari
    mq.addListener?.(check);
    return () => mq.removeListener?.(check);
  }, []);

  return standalone;
}
