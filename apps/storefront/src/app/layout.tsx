import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  title: "Modern UI Vault | Enterprise React Components",
  description: "Experience the next generation of UI components. An enterprise-grade, multi-dialect library featuring unprecedented animations and physics-based interactions.",
  openGraph: {
    title: "Modern UI Vault",
    description: "Premium React components for modern interfaces.",
    url: "https://modern-ui-vault.dev",
    siteName: "Modern UI Vault",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
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
      <body suppressHydrationWarning className="min-h-full bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 selection:bg-purple-500/30">
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
         >
            {children}
         </ThemeProvider>
      </body>
    </html>
  );
}
