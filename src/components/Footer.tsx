import React from 'react';
import { CATEGORIES } from '../data/authors.ts';
import { ShieldCheck, Globe, FileText } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenRevBid: () => void;
  onOpenSitemap: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenRevBid,
  onOpenSitemap,
}) => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Editorial Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <span className="font-serif font-bold text-lg leading-none">N</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-serif">
                NexaJournal
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              An independent technology publication committed to analytical depth, tested personal computing protocols, online privacy defenses, and cognitive ergonomics.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Editorial Desk Verified</span>
              </span>
              <span>·</span>
              <span>ISSN 2831-9042</span>
            </div>
          </div>

          {/* Topics & Categories */}
          <div>
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Editorial Topics
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onNavigate('category', cat.name)}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Publication & Company */}
          <div>
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Publication
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  About Us & Masthead
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Contact Desk & Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bookmarks')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Saved Articles
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRevBid}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>RevBid & Ads.txt</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSitemap}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-500" />
                  <span>XML Sitemap & SEO</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Governance & Policies
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Editorial Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cookies')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © 2026 NexaJournal Media Group. All rights reserved. Built for discerning readers and ethical monetization.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]">Clean Architecture · Zero AI Slop</span>
            <span>·</span>
            <button onClick={onOpenRevBid} className="text-slate-500 hover:text-indigo-600 underline">
              ads.txt v1.1
            </button>
            <span>·</span>
            <button onClick={onOpenSitemap} className="text-slate-500 hover:text-indigo-600 underline">
              sitemap.xml
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
