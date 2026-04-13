"use client";

import React from "react";
import { Terminal, Code2, Zap, BookOpen, ArrowRight, Copy, Check, Boxes } from "lucide-react";
import Link from "next/link";

const codeExamples = {
  init: `npx modern-ui-vault init`,
  add: `npx modern-ui-vault add liquid-chrome-button`,
  login: `npx modern-ui-vault login`,
  list: `npx modern-ui-vault list --category navbar`,
  search: `npx modern-ui-vault search "modal"`,
  doctor: `npx modern-ui-vault doctor`,
  usage: `import { LiquidChromeButton } from "@/components/ui/LiquidChromeButton";

export default function MyPage() {
  return (
    <LiquidChromeButton
      text="Click Me"
      onClick={() => console.log("Clicked!")}
    />
  );
}`,
};

function CodeSnippet({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {label && (
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1 block">{label}</span>
      )}
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 font-mono text-sm">
        <code className="text-cyan-400 overflow-x-auto">{code}</code>
        <button
          onClick={handleCopy}
          className="ml-4 p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all shrink-0"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-purple-400 text-sm font-bold uppercase tracking-widest mb-4">
            <BookOpen size={16} />
            Documentation
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-4">Getting Started</h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Install beautiful, animated components directly into your project.
            No black-box packages — you own every line of code.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {/* Step 1: Init */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-bold">1</div>
              <h2 className="text-2xl font-bold">Initialize Your Project</h2>
            </div>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              Run the init command in your Next.js or React project. This installs core dependencies
              (<code className="text-cyan-400">framer-motion</code>, <code className="text-cyan-400">lucide-react</code>, <code className="text-cyan-400">clsx</code>, <code className="text-cyan-400">tailwind-merge</code>)
              and creates the <code className="text-cyan-400">components.json</code> config file.
            </p>
            <CodeSnippet code={codeExamples.init} />
          </section>

          {/* Step 2: Add */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-bold">2</div>
              <h2 className="text-2xl font-bold">Add Components</h2>
            </div>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              Browse the <Link href="/" className="text-purple-400 hover:underline">component gallery</Link> and add any component.
              The CLI automatically resolves dependencies and saves the file to your <code className="text-cyan-400">components/ui/</code> directory.
            </p>
            <div className="space-y-3">
              <CodeSnippet code={codeExamples.add} label="Add a component" />
              <CodeSnippet code={codeExamples.list} label="Browse by category" />
              <CodeSnippet code={codeExamples.search} label="Search components" />
            </div>
          </section>

          {/* Step 3: Use */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-bold">3</div>
              <h2 className="text-2xl font-bold">Use in Your App</h2>
            </div>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              Import the component and use it like any other React component.
              Every prop is fully typed with TypeScript.
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-zinc-300 whitespace-pre">{codeExamples.usage}</pre>
            </div>
          </section>

          {/* Step 4: Pro */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 text-sm font-bold">4</div>
              <h2 className="text-2xl font-bold">Unlock Pro Components</h2>
            </div>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              Some components require a Pro license. <Link href="/pricing" className="text-purple-400 hover:underline">Purchase a license</Link>,
              then authenticate your CLI:
            </p>
            <CodeSnippet code={codeExamples.login} />
          </section>

          {/* CLI Reference */}
          <section id="cli">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Terminal size={24} className="text-cyan-500" />
              CLI Reference
            </h2>
            <div className="space-y-4">
              {[
                { cmd: "init", desc: "Initialize Modern UI Vault in your project" },
                { cmd: "add <name>", desc: "Install a component (supports --dialect jsx)" },
                { cmd: "list", desc: "List all available components (supports --category filter)" },
                { cmd: "search <query>", desc: "Search components by name, title, or category" },
                { cmd: "login", desc: "Authenticate with a Pro License Key" },
                { cmd: "logout", desc: "Remove stored credentials" },
                { cmd: "doctor", desc: "Check project setup for issues" },
              ].map((item) => (
                <div key={item.cmd} className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-xl">
                  <code className="text-cyan-400 font-mono text-sm font-bold shrink-0 min-w-[220px]">
                    npx modern-ui-vault {item.cmd}
                  </code>
                  <span className="text-zinc-500 text-sm">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Code2 size={24} className="text-emerald-500" />
              Tech Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "React 19", desc: "Latest React with Server Components support" },
                { name: "Next.js 16", desc: "Full App Router compatibility" },
                { name: "TypeScript 5.9", desc: "Full type safety for all components" },
                { name: "Framer Motion 12", desc: "Physics-based spring animations" },
                { name: "Tailwind CSS v4", desc: "Utility-first styling with CSS variables" },
                { name: "Lucide React", desc: "Beautiful, consistent icons" },
              ].map((tech) => (
                <div key={tech.name} className="p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-xl">
                  <h3 className="font-bold mb-1">{tech.name}</h3>
                  <p className="text-zinc-500 text-sm">{tech.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
