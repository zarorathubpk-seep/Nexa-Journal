import React from 'react';
import { Cookie } from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          <Cookie className="w-4 h-4" />
          <span>Cookies & Telemetry</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight mb-2">
          Cookie Policy
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Last Updated: October 15, 2026
        </p>
      </div>

      <div className="prose-editorial max-w-none space-y-6 text-sm text-slate-700 dark:text-slate-300">
        <p>
          This Cookie Policy explains how <strong>NexaJournal</strong> uses cookies, localStorage keys, and similar client-side web technologies when you browse our website.
        </p>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          1. What Are Cookies?
        </h2>
        <p>
          Cookies are small text files placed on your device by websites you visit. They are widely used to make web applications function efficiently, provide personalized display settings, and generate aggregated analytics.
        </p>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          2. Categories of Cookies We Use
        </h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
              Strictly Necessary / Essential Cookies & Storage
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              These client-side keys are required for the website to function. They store your dark/light theme preference (<code className="font-mono text-indigo-600">nexajournal_theme</code>), saved article bookmarks (<code className="font-mono text-indigo-600">nexajournal_bookmarks</code>), and your cookie consent record. They do not track you across external sites.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
              Performance & Readership Analytics
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We collect privacy-first aggregate metrics regarding which articles receive readership and what search terms are queried. This information allows our editorial board to commission deeper follow-up guides on in-demand topics.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
              Advertising Exchange Cookies (RevBid / Google AdSense)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Programmatic advertising partners utilize cookies to deliver non-intrusive display advertisements and ensure ad impressions are frequency-capped (preventing you from seeing identical ads repetitively).
            </p>
          </div>
        </div>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          3. How to Control and Delete Cookies
        </h2>
        <p>
          You can adjust your cookie preferences at any time using our Cookie Consent Banner or via your browser's native settings. You can delete existing cookies or configure your browser to block third-party cookies by default. For step-by-step browser configuration instructions, refer to our guide on{' '}
          <em>How to Protect Your Privacy Online</em>.
        </p>
      </div>
    </div>
  );
};
