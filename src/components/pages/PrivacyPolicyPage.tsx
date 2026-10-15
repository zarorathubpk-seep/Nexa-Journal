import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          <Shield className="w-4 h-4" />
          <span>Legal & Transparency</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Effective Date: October 15, 2026 · Compliant with GDPR, CCPA & RevBid Publisher Guidelines
        </p>
      </div>

      <div className="prose-editorial max-w-none space-y-6 text-sm text-slate-700 dark:text-slate-300">
        <p>
          At <strong>NexaJournal</strong> ("we", "our", or "the Publication"), we prioritize reader privacy and data sovereignty. This Privacy Policy details the types of information we collect, how it is processed, and the measures we employ to safeguard your personal data when accessing our website.
        </p>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          1. Information We Collect
        </h2>
        <p>
          We deliberately minimize data collection to what is strictly necessary to deliver high-quality editorial content:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Directly Provided Information:</strong> When you subscribe to our newsletter or submit an inquiry via our contact form, we collect your email address, name, and message content.</li>
          <li><strong>Client-Side Local Storage:</strong> We use your browser's local storage exclusively to persist your reading theme (dark/light mode), bookmarked article IDs, and cookie consent preferences. This data remains on your local device.</li>
          <li><strong>Server Log Telemetry:</strong> Like all standard web hosts, our servers log pseudonymous access telemetry (IP addresses, user-agent strings, timestamp, and requested paths) for security auditing, DDoS mitigation, and diagnostic uptime tracking.</li>
        </ul>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          2. Advertising Networks & Monetization (RevBid / Header Bidding)
        </h2>
        <p>
          NexaJournal participates in legitimate digital advertising exchanges, including <strong>RevBid</strong> and Google AdSense, to sustain our independent editorial team.
        </p>
        <p>
          These programmatic partners may use pseudonymous identifiers, cookies, and mobile advertising IDs to serve relevant non-deceptive advertisements. We prohibit behavioral profiling of readers without explicit consent. You can manage your preferences or opt out of personalized third-party advertising at any time via the Digital Advertising Alliance (DAA) or Network Advertising Initiative (NAI) opt-out portals.
        </p>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          3. Analytics & Measurement
        </h2>
        <p>
          We employ privacy-preserving measurement tools to aggregate readership metrics (e.g., page views, popular search terms, reading duration). These analytics do not correlate your reading habits with personally identifiable financial or demographic profiles.
        </p>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          4. Your Rights Under GDPR and CCPA
        </h2>
        <p>
          Depending on your jurisdiction (including the European Economic Area, the United Kingdom, and the State of California), you possess specific statutory rights regarding your personal data:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Right to Access:</strong> You may request an export of personal data we retain about you.</li>
          <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You may request immediate deletion of your contact form submissions or newsletter subscription.</li>
          <li><strong>Right to Non-Discrimination:</strong> We will never deny services or degrade reading experience based on your privacy choices.</li>
        </ul>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          5. Contacting the Data Protection Officer
        </h2>
        <p>
          For privacy inquiries, data subject access requests, or regulatory communications, contact our privacy desk directly at <code className="font-mono text-indigo-600">privacy@nexajournal.com</code> or write to NexaJournal Media Group, 540 Market Street, Suite 800, San Francisco, CA 94104.
        </p>
      </div>
    </div>
  );
};
