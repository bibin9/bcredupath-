import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "@/components/shared/Providers";
import { PWARegister } from "@/components/shared/PWARegister";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BCRedupath — Crack Boards 2026",
  description:
    "Gamified CBSE Class 10 & 12 prep with AI-predicted questions, PYQs, streaks and leaderboards. Built for India by Bibin CutRiver.",
  authors: [{ name: "Bibin CutRiver" }],
  creator: "Bibin CutRiver",
  keywords: [
    "CBSE 2026",
    "Class 10 board",
    "Class 12 board",
    "PYQ",
    "question predictor",
    "NCERT",
  ],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "BCRedupath",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", sizes: "180x180" }],
  },
  openGraph: {
    title: "BCRedupath — Crack Boards 2026",
    description:
      "Gamified CBSE Class 10 & 12 prep with AI predictions and 900+ PYQs.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a1f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover", // enables env(safe-area-inset-*) on iOS notch/home-indicator
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden">
        <Providers>{children}</Providers>
        <PWARegister />
        <Toaster
          theme="dark"
          position="top-center"
          richColors
          toastOptions={{
            style: {
              background: "rgba(20, 20, 43, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
            },
          }}
        />
      </body>
    </html>
  );
}
