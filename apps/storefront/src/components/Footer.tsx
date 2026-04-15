"use client";

import React from "react";
import Link from "next/link";
import { Zap, Code, Globe, Heart } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Components", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Documentation", href: "/docs" },
    { label: "Changelog", href: "/changelog" },
  ],
  Resources: [
    { label: "Getting Started", href: "/docs" },
    { label: "CLI Reference", href: "/docs#cli" },
    { label: "Contributing", href: "https://github.com/Abdulmazid24/modern-ui-components" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "License", href: "/terms#license" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-black text-lg tracking-tight">
                <span className="text-white">Modern UI</span>
                <span className="text-purple-400"> Vault</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-6">
              Enterprise-grade animated React components. Built with Framer Motion,
              Tailwind CSS v4, and TypeScript. Ship stunning interfaces in minutes.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/Abdulmazid24/modern-ui-components"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                aria-label="GitHub"
              >
                <Code size={18} />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                aria-label="Twitter"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600 tracking-widest uppercase font-semibold">
            © {new Date().getFullYear()} Abdul Mazid. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700 flex items-center gap-1">
            Built with <Heart size={12} className="text-red-500" /> using Next.js, React & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
