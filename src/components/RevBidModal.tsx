import React, { useState } from 'react';
import { generateAdsTxt } from '../utils/blogLogic.ts';
import { ShieldCheck, Copy, Check, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface RevBidModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RevBidModal: React.FC<RevBidModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [publisherId, setPublisherId] = useState('pub-98421094821034');
  const adsTxtContent = generateAdsTxt(publisherId);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(adsTxtContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const checklistItems = [
    { title: 'Original & Substantial Content', desc: '12 original articles with primary SEO keywords, original analysis, and zero AI scraping or plagiarism.', done: true },
    { title: 'Mandatory Policy & Compliance Pages', desc: 'Working About Us, Contact Us, Privacy Policy, Terms, Disclaimer, and Cookie Policy in place.', done: true },
    { title: 'Strict Editorial Separation', desc: 'Ad placements are distinctly demarcated from editorial copy; no deceptive button placements or forced clicks.', done: true },
    { title: 'Standard IAB Ads.txt Implementation', desc: 'Support for direct and reseller lines compliant with IAB Tech Lab Ads.txt v1.1 standards.', done: true },
    { title: 'Fast Core Web Vitals & Responsiveness', desc: 'Zero layout shift, responsive mobile viewports, lightweight modern build.', done: true },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="RevBid Monetization Hub"
    >
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-white">
                RevBid & Ad Network Monetization Hub
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Publisher compliance, transparent ad slots, and authorized ads.txt configuration.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg text-sm"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-600 dark:text-slate-300">
          {/* Status banner */}
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-emerald-900 dark:text-emerald-200 text-sm">
                Monetization Architecture Ready
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 leading-relaxed">
                NexaJournal meets all primary review requirements for legitimate ad exchanges (RevBid, Google AdSense, Mediavine): high-quality original writing, responsive layouts, clear privacy disclosures, and clean ad slots.
              </p>
            </div>
          </div>

          {/* Publisher Checklist */}
          <div>
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white mb-3">
              Publisher Network Checklist
            </h3>
            <div className="space-y-2.5">
              {checklistItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3"
                >
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-xs text-slate-900 dark:text-white">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ads.txt Generator & Viewer */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Authorized Digital Sellers (ads.txt)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Standard format for webmasters to publish on <code className="text-indigo-600 font-mono">/ads.txt</code>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={publisherId}
                  onChange={(e) => setPublisherId(e.target.value)}
                  placeholder="Your Publisher ID"
                  className="px-2.5 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                  title="Publisher Account ID"
                />
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy ads.txt'}</span>
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              {adsTxtContent}
            </pre>
          </div>

          {/* Ad Disclosure Note */}
          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-500 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              Ad Placement Rules: NexaJournal maintains strict editorial independence. Advertising spaces never dictate journalistic reviews, and no artificial traffic, bot impressions, or deceptive click prompts are permitted.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between text-xs text-slate-500">
          <span>IAB Tech Lab Ads.txt v1.1 Compatible</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-medium transition-colors"
          >
            Close Hub
          </button>
        </div>
      </div>
    </div>
  );
};
