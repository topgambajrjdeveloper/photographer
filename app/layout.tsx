import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BottomTabBar } from "@/components/bottom-tab-bar"
import { CookieConsent } from "@/components/cookie-consent"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { PWASetup } from "./pwa"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Photography Portfolio",
    template: "%s | Photography Portfolio",
  },
  description: "Professional photography portfolio showcasing elegant imagery",
  keywords: ["photography", "portfolio", "professional", "wedding", "portrait", "landscape"],
  authors: [{ name: "Photography Portfolio" }],
  creator: "Photography Portfolio",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Photography Portfolio",
    description: "Professional photography portfolio showcasing elegant imagery",
    siteName: "Photography Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Photography Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photography Portfolio",
    description: "Professional photography portfolio showcasing elegant imagery",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Photography Portfolio",
  },
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
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2d2d2d" },
    { media: "(prefers-color-scheme: dark)", color: "#2d2d2d" },
  ],
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} bg-neutral-800 text-neutral-200 min-h-screen`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <CookieConsent />
          <BottomTabBar />
          <PWAInstallPrompt />
          <PWASetup />
          <Toaster />
        </div>
      </body>
    </html>
  )
}
