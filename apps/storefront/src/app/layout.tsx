import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientLayoutWrapper } from "@/components/ClientLayoutWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://modern-ui-vault.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Modern UI Vault | Enterprise React Components",
    template: "%s | Modern UI Vault",
  },
  description:
    "Enterprise-grade animated React component library. 180+ premium components with Framer Motion physics, Tailwind CSS v4, and TypeScript. CLI-powered, code-ownership model.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Modern UI Vault",
    description:
      "Premium animated React components for modern interfaces. Ship stunning UIs in minutes.",
    url: SITE_URL,
    siteName: "Modern UI Vault",
    images: [
      {
        url: "/api/og?title=Modern%20UI%20Vault&category=Enterprise%20Components",
        width: 1200,
        height: 630,
        alt: "Modern UI Vault — Enterprise React Components",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern UI Vault",
    description: "180+ premium animated React components with physics-based interactions.",
    images: ["/api/og?title=Modern%20UI%20Vault&category=Enterprise%20Components"],
  },
  keywords: [
    "React components",
    "UI library",
    "Framer Motion",
    "Tailwind CSS",
    "animated components",
    "Next.js components",
    "TypeScript UI",
    "premium UI library",
    "enterprise components",
    "modern UI",
  ],
  authors: [{ name: "Abdul Mazid" }],
  creator: "Abdul Mazid",
};

// Structured Data for SEO (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Modern UI Vault",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  description:
    "Enterprise-grade animated React component library with 180+ premium components.",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free",
      description: "70+ core animated components",
    },
    {
      "@type": "Offer",
      price: "79",
      priceCurrency: "USD",
      name: "Pro",
      description: "All 300+ components with commercial license",
    },
  ],
  author: {
    "@type": "Person",
    name: "Abdul Mazid",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 selection:bg-purple-500/30"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
