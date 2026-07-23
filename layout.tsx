import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AdSenseScript } from "@/components/adsense-script";
import { GoogleAnalytics } from "@/components/google-analytics";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Life Toolkit AI - Free Online Tools for Everyday Use",
    template: "%s | Life Toolkit AI",
  },
  description: "Your all-in-one collection of useful daily tools. Calculate age, convert units, generate passwords, create QR codes, and more - all free online.",
  keywords: ["online tools", "calculator", "converter", "generator", "free tools", "productivity"],
  authors: [{ name: "Life Toolkit AI" }],
  creator: "Life Toolkit AI",
  publisher: "Life Toolkit AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lifetoolkit.ai",
    siteName: "Life Toolkit AI",
    title: "Life Toolkit AI - Free Online Tools for Everyday Use",
    description: "Your all-in-one collection of useful daily tools. Calculate, convert, generate, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life Toolkit AI - Free Online Tools",
    description: "Your all-in-one collection of useful daily tools.",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Life Toolkit AI",
  },
  formatDetection: {
    telephone: false,
  },
  verification: {
    google: 'google-adsense-account',
  },
  other: {
    "google-adsense-account": "ca-pub-5554704158829427",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* AdSense Verification Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-5554704158829427" />
      </head>
      <body className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col">
        {/* AdSense - Must be first */}
        <AdSenseScript />
        
        {/* Google Analytics (optional) */}
        {gaId && <GoogleAnalytics gaId={gaId} />}
        
        {/* Main App */}
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
