"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPreview = pathname?.startsWith("/preview");

  if (isPreview) {
    // Isolated view for component previews without Navbar/Footer
    return <main className="w-full min-h-screen bg-black overflow-hidden">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <div className="pt-16">{children}</div>
      <Footer />
    </>
  );
}
