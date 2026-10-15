import React, { useState } from 'react';
import { Article } from '../types/blog.ts';
import { generateSitemapXml, generateRobotsTxt } from '../utils/blogLogic.ts';
import { Globe, Copy, Check, Download, FileCode } from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  articles,
}) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'gsc'>('sitemap');
  const [copied, setCopied] = useState(false);
  const baseUrl = window.location.origin;

  const sitemapXml = generateSitemapXml(articles, baseUrl);
  const robotsTxt = generateRobotsTxt(baseUrl);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="SEO Tools & XML Sitemap"
    >
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-white">
                SEO Tools & Search Engine Indexing
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automated XML Sitemap, robots.txt directives, and verification helpers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`pb-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'sitemap'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            sitemap.xml ({articles.length + 7} URLs)
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`pb-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'robots'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            robots.txt
          </button>
          <button
            onClick={() => setActiveTab('gsc')}
            className={`pb-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'gsc'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Google Search Console / GA4
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'sitemap' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Standard sitemaps.org format listing all 12 articles and compliance pages.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(sitemapXml)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy XML'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload(sitemapXml, 'sitemap.xml', 'application/xml')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-[360px] border border-slate-800">
                {sitemapXml}
              </pre>
            </div>
          )}

          {activeTab === 'robots' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Allows search engine crawlers (Googlebot, Bingbot) and points to sitemap.
                </span>
                <button
                  onClick={() => handleCopy(robotsTxt)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy robots.txt'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-[300px] border border-slate-800">
                {robotsTxt}
              </pre>
            </div>
          )}

          {activeTab === 'gsc' && (
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1.5">
                  Google Search Console Verification
                </h4>
                <p className="text-slate-500 mb-3 leading-relaxed">
                  Add this verification HTML tag to your site's <code className="font-mono text-indigo-600">&lt;head&gt;</code> tag in index.html to verify domain ownership:
                </p>
                <div className="p-3 bg-slate-900 text-emerald-400 font-mono rounded-lg overflow-x-auto text-xs">
                  &lt;meta name="google-site-verification" content="NexaJournal-GSC-Verification-Key" /&gt;
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1.5">
                  Google Analytics 4 (GA4) Tag Support
                </h4>
                <p className="text-slate-500 mb-3 leading-relaxed">
                  To connect Google Analytics 4, paste your Measurement ID (e.g., <code className="font-mono">G-XXXXXXXXXX</code>) into the standard Google Tag script:
                </p>
                <div className="p-3 bg-slate-900 text-slate-200 font-mono rounded-lg overflow-x-auto text-[11px] leading-relaxed">
                  {`<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-TRACKING_ID"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'G-TRACKING_ID');\n</script>`}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
