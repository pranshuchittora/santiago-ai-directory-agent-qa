import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
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
  metadataBase: new URL("https://aitoolsdirectory.dev"),
  title: {
    default: "AI Tools Directory - Discover the Best AI Tools",
    template: "%s | AI Tools Directory",
  },
  description:
    "Discover and compare the best AI tools for every use case. Browse 201+ curated tools across 15 categories including text generation, image creation, code assistants, productivity, and more.",
  keywords: [
    "AI tools",
    "AI directory",
    "productivity",
    "automation",
    "machine learning",
    "artificial intelligence",
    "ChatGPT alternatives",
    "productivity tools",
  ],
  creator: "AI Tools Directory",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI Tools Directory",
    title: "AI Tools Directory - Discover the Best AI Tools",
    description:
      "Curated directory of 201+ AI tools across 15 categories. Find the perfect tool for productivity, creativity, and innovation.",
    url: "https://aitoolsdirectory.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools Directory",
    description:
      "Discover 201+ curated AI tools across 15 categories for productivity and creativity.",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://aitoolsdirectory.dev",
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
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {/* Skip to content link for keyboard navigation */}
        <a
          href="#main-content"
          className="absolute -top-10 left-0 z-50 bg-accent text-white px-4 py-2 rounded focus:top-0 transition-all"
        >
          Skip to main content
        </a>

        <header className="sticky top-0 z-40 border-b border-card-border bg-background/95 backdrop-blur-sm">
          <nav aria-label="Main navigation" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-80 focus-ring rounded transition-opacity" aria-label="AI Tools Directory - Home">
              <span className="text-accent" aria-hidden="true">✨</span>
              <span>AI Tools Directory</span>
            </Link>
            <div className="hidden sm:flex items-center gap-8 text-sm">
              <Link
                href="/"
                className="text-muted hover:text-foreground focus-ring rounded transition-colors"
              >
                Home
              </Link>
              <Link
                href="/categories/text-generation"
                className="text-muted hover:text-foreground focus-ring rounded transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/submit"
                className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover focus-ring transition-colors"
              >
                Submit Tool
              </Link>
            </div>
            <div className="sm:hidden flex items-center gap-4">
              <Link
                href="/submit"
                className="text-sm text-accent hover:text-accent-hover focus-ring rounded transition-colors px-3 py-2"
              >
                Submit
              </Link>
            </div>
          </nav>
        </header>
        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>
        <footer className="border-t border-card-border bg-card-bg mt-16" role="contentinfo">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <section aria-labelledby="footer-about">
                <h2 id="footer-about" className="font-semibold text-foreground mb-4">About</h2>
                <p className="text-sm text-muted">A curated directory of the best AI tools for productivity and creativity.</p>
              </section>
              <nav aria-labelledby="footer-links">
                <h2 id="footer-links" className="font-semibold text-foreground mb-4">Quick Links</h2>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-muted hover:text-foreground focus-ring transition-colors">Home</Link></li>
                  <li><Link href="/categories/text-generation" className="text-muted hover:text-foreground focus-ring transition-colors">Browse Categories</Link></li>
                  <li><Link href="/submit" className="text-muted hover:text-foreground focus-ring transition-colors">Submit a Tool</Link></li>
                </ul>
              </nav>
              <nav aria-labelledby="footer-resources">
                <h2 id="footer-resources" className="font-semibold text-foreground mb-4">Resources</h2>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="text-muted hover:text-foreground focus-ring transition-colors">About Us</Link></li>
                  <li><a href="#" className="text-muted hover:text-foreground focus-ring transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-muted hover:text-foreground focus-ring transition-colors">Privacy Policy</a></li>
                </ul>
              </nav>
            </div>
            <div className="border-t border-card-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
              <p>&copy; {new Date().getFullYear()} AI Tools Directory. Open source.</p>
              <p>Discover {tools.length}+ AI tools across {categories.length} categories.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
