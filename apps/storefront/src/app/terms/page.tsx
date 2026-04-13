export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-24 prose prose-invert prose-zinc prose-headings:font-bold prose-headings:tracking-tight prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-code:text-cyan-400 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
        <h1>Terms of Service</h1>
        <p className="lead text-zinc-400">Last updated: April 13, 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using Modern UI Vault (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>

        <h2>2. Description of Service</h2>
        <p>Modern UI Vault is a premium React UI component library distributed via CLI tool. Components are provided as source code files (TSX/JSX) that users copy into their own projects.</p>

        <h2 id="license">3. License</h2>
        <h3>3.1 Free Components</h3>
        <p>Free-tier components are provided under the MIT License. You may use, modify, copy, merge, publish, distribute, sublicense, and sell them freely.</p>

        <h3>3.2 Pro/Team/Enterprise Components</h3>
        <p>Pro-tier components require a valid commercial license. Upon purchase, you receive:</p>
        <ul>
          <li>The right to use components in unlimited personal and commercial projects</li>
          <li>The right to modify component source code</li>
          <li>Access to updates for the duration specified by your license tier</li>
        </ul>
        <p>You may NOT:</p>
        <ul>
          <li>Redistribute, resell, or sublicense Pro components</li>
          <li>Share your license key with others outside your licensed team</li>
          <li>Include Pro components in open-source repositories</li>
          <li>Create a competing component library using Pro components</li>
        </ul>

        <h2>4. Payment & Refunds</h2>
        <p>All payments are processed through LemonSqueezy as our Merchant of Record. Prices are one-time payments in USD. We offer a 14-day refund policy — no questions asked.</p>

        <h2>5. Activation Limits</h2>
        <p>License keys have activation limits based on tier (Pro: 3, Team: 10, Enterprise: unlimited). Exceeding activation limits requires revoking existing activations or upgrading your tier.</p>

        <h2>6. Intellectual Property</h2>
        <p>The design patterns, animation techniques, and visual aesthetics of Modern UI Vault components are the intellectual property of Abdul Mazid. The license grants you the right to USE these components but not to claim authorship.</p>

        <h2>7. Disclaimer of Warranties</h2>
        <p>The Service is provided &quot;AS IS&quot; without warranties of any kind. We do not guarantee that components will be error-free, compatible with all frameworks, or suitable for any particular purpose.</p>

        <h2>8. Limitation of Liability</h2>
        <p>In no event shall Modern UI Vault or its creator be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of the Service.</p>

        <h2>9. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms.</p>

        <h2>10. Contact</h2>
        <p>For questions about these terms, please contact: abdulmazid.dev@gmail.com</p>
      </div>
    </main>
  );
}
