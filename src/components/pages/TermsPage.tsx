import React from 'react';
import { FileCheck } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          <FileCheck className="w-4 h-4" />
          <span>Terms of Service</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight mb-2">
          Terms and Conditions
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Last Revised: October 15, 2026
        </p>
      </div>

      <div className="prose-editorial max-w-none space-y-6 text-sm text-slate-700 dark:text-slate-300">
        <p>
          Welcome to <strong>NexaJournal</strong>. By accessing or using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.
        </p>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          1. Intellectual Property & Copyright
        </h2>
        <p>
          All editorial articles, original graphics, research syntheses, and layout structures hosted on NexaJournal are protected by copyright and intellectual property laws. You may quote short passages (up to 150 words) with clear attribution and a direct do-follow link to the original article on NexaJournal. Automated scraping or mass reproduction without prior written consent is strictly prohibited.
        </p>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          2. Acceptable Use
        </h2>
        <p>
          You agree not to use the website to transmit malicious code, attempt unauthorized access to server infrastructure, conduct automated denial-of-service operations, or forge HTTP request headers to simulate artificial traffic impressions on advertising banners.
        </p>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          3. Limitation of Liability
        </h2>
        <p>
          NexaJournal provides all articles, recommendations, and tutorials on an "as is" and "as available" basis. While our editors conduct rigorous testing, software interfaces and security protocols evolve rapidly. NexaJournal is not liable for data loss, hardware damage, or software incompatibility arising from following technical guides.
        </p>

        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white pt-4">
          4. Governing Law
        </h2>
        <p>
          These terms are governed by the laws of the State of California, without regard to its conflict of law principles.
        </p>
      </div>
    </div>
  );
};
