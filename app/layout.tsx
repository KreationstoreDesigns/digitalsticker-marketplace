import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Digital Sticker Marketplace - Premium Stickers",
  description:
    "Discover premium digital stickers for your creative projects. High-quality, unique designs.",
  keywords:
    "digital stickers, creative stickers, premium designs, digital downloads",
  viewport: "width=device-width, initial-scale=1",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stickers.example.com",
    siteName: "Digital Sticker Marketplace",
    title: "Premium Digital Stickers",
    description: "Discover premium digital stickers for your creative projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Sticker Marketplace",
    description: "Discover premium digital stickers for your creative projects",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
