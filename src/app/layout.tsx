import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Tools Directory - Discover the Best AI Tools",
    template: "%s | AI Tools Directory",
  },
  description:
    "Discover and compare the best AI tools for every use case. Browse 50+ curated tools across text generation, image creation, code assistants, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI Tools Directory",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-border">
          <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              AI Tools Directory
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/categories/text-generation" className="text-muted hover:text-foreground transition-colors">
                Categories
              </Link>
              <Link href="/submit" className="text-muted hover:text-foreground transition-colors">
                Submit Tool
              </Link>
              <Link href="/about" className="text-muted hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border mt-16">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <p>&copy; {new Date().getFullYear()} AI Tools Directory. Open source.</p>
              <div className="flex gap-6">
                <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                <Link href="/submit" className="hover:text-foreground transition-colors">Submit a Tool</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
