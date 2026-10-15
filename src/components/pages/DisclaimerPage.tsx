import React from 'react';
import { AlertCircle } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          <AlertCircle className="w-4 h-4" />
          <span>Editorial Disclosures</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight mb-2">
          Editorial & Monetization Disclaimer
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Last Updated: October 15, 2026
        </p>
      </div>

      <div className="prose-editorial max-w-none space-y-6 text-sm text-slate-700 dark:text-slate-300">
        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          1. Informational & Educational Purposes Only
        </h2>
        <p>
          The content published on <strong>NexaJournal</strong> is provided solely for educational, research, and informational purposes. While our writers include cybersecurity professionals and systems architects, the articles do not constitute formal legal counsel, institutional cybersecurity audits, or professional financial advice. Readers should always test technical configurations in isolated staging environments prior to production implementation.
        </p>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          2. Advertising Disclosures (RevBid & Programmatic Partners)
        </h2>
        <p>
          NexaJournal generates revenue through non-intrusive display advertising provided by verified programmatic exchanges such as RevBid and Google AdSense.
        </p>
        <p>
          Our editorial evaluations are strictly decoupled from commercial ad placements. Advertisers possess zero advance review rights over article text, software ratings, or journalistic critiques. Sponsored slots are explicitly demarcated as <code>[Advertisement]</code> or <code>[Sponsored Placement]</code> to ensure complete transparency.
        </p>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          3. Affiliate Links Disclosure
        </h2>
        <p>
          Certain product or book references may contain affiliate links. If you purchase through these links, NexaJournal may earn a small referral commission at no additional cost to you. We only recommend software, hardware, or literature that our staff has tested and confirmed to be of legitimate utility.
        </p>
      </div>
    </div>
  );
};
