export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-24 prose prose-invert prose-zinc prose-headings:font-bold prose-headings:tracking-tight prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline">
        <h1>Privacy Policy</h1>
        <p className="lead text-zinc-400">Last updated: April 13, 2026</p>

        <h2>1. Introduction</h2>
        <p>Modern UI Vault (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy. This policy explains how we collect, use, and protect your information when you use our website and CLI tool.</p>

        <h2>2. Information We Collect</h2>
        <h3>2.1 Information You Provide</h3>
        <ul>
          <li><strong>Email address</strong> — When you purchase a license through LemonSqueezy</li>
          <li><strong>Name</strong> — Associated with your payment</li>
          <li><strong>License key</strong> — Generated upon purchase</li>
        </ul>

        <h3>2.2 Information Collected Automatically</h3>
        <ul>
          <li><strong>IP address</strong> — For rate limiting and abuse prevention</li>
          <li><strong>Component download logs</strong> — Which components are downloaded (for analytics)</li>
          <li><strong>CLI usage data</strong> — Command usage patterns (no personal data)</li>
        </ul>

        <h3>2.3 Information We Do NOT Collect</h3>
        <ul>
          <li>We do NOT access your source code or project files</li>
          <li>We do NOT track your browsing history outside our website</li>
          <li>We do NOT sell or share personal data with third parties</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To verify license keys and manage access to Pro components</li>
          <li>To prevent abuse (rate limiting, activation limits)</li>
          <li>To improve our component library based on download analytics</li>
          <li>To send important product updates (only to license holders)</li>
        </ul>

        <h2>4. Data Storage</h2>
        <p>Your data is stored securely on Supabase (PostgreSQL) with Row Level Security enabled. License keys are stored in plain text for verification purposes but are never exposed via public APIs.</p>

        <h2>5. Third-Party Services</h2>
        <ul>
          <li><strong>LemonSqueezy</strong> — Payment processing (Merchant of Record). They handle all payment data independently under their own privacy policy.</li>
          <li><strong>Supabase</strong> — Database hosting</li>
          <li><strong>Vercel</strong> — Website hosting</li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>We retain your license information for as long as your license is active. Download analytics are anonymized after 90 days. You can request deletion of your data at any time.</p>

        <h2>7. Your Rights (GDPR)</h2>
        <p>If you are in the EU/EEA, you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Rectify inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to data processing</li>
          <li>Data portability</li>
        </ul>

        <h2>8. Cookies</h2>
        <p>Our website uses only essential cookies for theme preferences. We do not use tracking cookies, advertising cookies, or third-party analytics cookies.</p>

        <h2>9. Children&apos;s Privacy</h2>
        <p>Modern UI Vault is a developer tool not intended for children under 13. We do not knowingly collect data from children.</p>

        <h2>10. Contact Us</h2>
        <p>For privacy-related questions or data requests, contact: abdulmazid.dev@gmail.com</p>
      </div>
    </main>
  );
}
