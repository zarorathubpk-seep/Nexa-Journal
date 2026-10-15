import React, { useEffect, useState } from 'react';
import { Article } from '../types/blog.ts';
import { AdPlacement } from './AdPlacement.tsx';
import { getAssetUrl } from '../utils/imageHelper.ts';
import {
  Clock,
  Calendar,
  Share2,
  Bookmark,
  Check,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Type,
  Link as LinkIcon,
} from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  allArticles: Article[];
  onNavigateHome: () => void;
  onSelectArticle: (slug: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenRevBid: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onNavigateHome,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  onOpenRevBid,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Track scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setExpandedFaq(0);
  }, [article.slug]);

  // Update document title for SEO
  useEffect(() => {
    document.title = `${article.title} — NexaJournal`;
  }, [article.title]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Find previous and next articles
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Find related articles in same category
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <article className="min-h-screen pb-20">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6"
          aria-label="Breadcrumbs"
        >
          <button
            onClick={onNavigateHome}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {article.category}
          </span>
          <span>/</span>
          <span className="truncate max-w-[200px] sm:max-w-xs text-slate-400">
            {article.title}
          </span>
        </nav>

        {/* Primary SEO Keyword Indicator */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {article.category}
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Keyword Focus: <span className="italic font-medium">{article.primaryKeyword}</span>
          </span>
        </div>

        {/* Article Headline (H1) */}
        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-[1.18] tracking-tight mb-6 [text-wrap:balance]">
          {article.title}
        </h1>

        {/* Author Byline & Article Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-6 border-y border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                {article.author.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {article.author.role}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Published {article.publishDate}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTimeMinutes} min read</span>
            </span>
          </div>
        </div>

        {/* Featured Image Directly Below Title */}
        <figure className="mb-10 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
          <img
            src={getAssetUrl(article.featuredImage)}
            alt={article.featuredImageAlt}
            referrerPolicy="no-referrer"
            className="w-full max-h-[520px] object-cover object-center"
          />
          <figcaption className="p-3 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 italic text-center">
            {article.featuredImageAlt}
          </figcaption>
        </figure>

        {/* Interactive Utility Bar: Font Size, Share, Bookmark */}
        <div className="flex items-center justify-between p-3 mb-10 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <Type className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500 font-medium">Text Size:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 rounded transition-colors ${
                fontSize === 'normal'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Default
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 rounded transition-colors ${
                fontSize === 'large'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Large
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-indigo-600' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">Link Copied</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Table of Contents */}
        {article.tableOfContents && article.tableOfContents.length > 0 && (
          <aside className="mb-10 p-6 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800">
            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-800 dark:text-slate-200 mb-4">
              Table of Contents
            </h2>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {article.tableOfContents.map((toc) => (
                <li
                  key={toc.id}
                  className={toc.level === 3 ? 'pl-4 text-xs' : 'font-medium'}
                >
                  <a
                    href={`#${toc.id}`}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors"
                  >
                    {toc.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Article Body Content */}
        <div
          className={`prose-editorial max-w-none ${
            fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'
          }`}
        >
          {article.content.map((block, idx) => {
            switch (block.type) {
              case 'paragraph':
                return <p key={idx}>{block.value}</p>;

              case 'h2': {
                const matchedToc = article.tableOfContents.find(
                  (t) => t.title.toLowerCase() === block.value?.toLowerCase()
                );
                return (
                  <h2 key={idx} id={matchedToc?.id} className="scroll-mt-24">
                    {block.value}
                  </h2>
                );
              }

              case 'h3': {
                const matchedToc = article.tableOfContents.find(
                  (t) => t.title.toLowerCase() === block.value?.toLowerCase()
                );
                return (
                  <h3 key={idx} id={matchedToc?.id} className="scroll-mt-24">
                    {block.value}
                  </h3>
                );
              }

              case 'callout':
                return (
                  <div
                    key={idx}
                    className="my-6 p-5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/80 text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line"
                  >
                    {block.value}
                  </div>
                );

              case 'quote':
                return (
                  <blockquote key={idx} className="my-8">
                    "{block.value}"
                  </blockquote>
                );

              case 'list':
                return (
                  <ul key={idx} className="my-6 space-y-2.5 list-disc pl-5">
                    {block.items?.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                );

              case 'internalLink':
                return (
                  <div
                    key={idx}
                    className="my-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
                  >
                    <LinkIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 mr-1.5">
                        Related Reading:
                      </span>
                      <button
                        onClick={() => block.linkSlug && onSelectArticle(block.linkSlug)}
                        className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-left"
                      >
                        {block.linkText}
                      </button>
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>

        {/* RevBid Monetization Placement (In-Article) */}
        <AdPlacement format="in-article" onOpenInfo={onOpenRevBid} />

        {/* FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="my-14 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {article.faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-medium text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base">{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Author Bio Card */}
        <section className="my-12 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500/20 shadow-sm shrink-0"
          />
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
              About the Author
            </div>
            <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mb-1">
              {article.author.name}
            </h3>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              {article.author.role}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {article.author.bio}
            </p>
          </div>
        </section>

        {/* Previous and Next Article Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 pt-8 border-t border-slate-200 dark:border-slate-800">
          {prevArticle ? (
            <button
              onClick={() => onSelectArticle(prevArticle.slug)}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-700 bg-white dark:bg-slate-900 text-left group transition-colors"
            >
              <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Article</span>
              </div>
              <div className="font-serif font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 line-clamp-1">
                {prevArticle.title}
              </div>
            </button>
          ) : <div />}

          {nextArticle && (
            <button
              onClick={() => onSelectArticle(nextArticle.slug)}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-700 bg-white dark:bg-slate-900 text-right group transition-colors"
            >
              <div className="text-xs text-slate-400 flex items-center justify-end gap-1 mb-1">
                <span>Next Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="font-serif font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 line-clamp-1">
                {nextArticle.title}
              </div>
            </button>
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
            <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white mb-6">
              Related Articles in {article.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.slug)}
                  className="group cursor-pointer flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <img
                    src={getAssetUrl(rel.featuredImage)}
                    alt={rel.featuredImageAlt}
                    referrerPolicy="no-referrer"
                    className="aspect-[16/10] object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 line-clamp-2 leading-snug mb-2">
                      {rel.title}
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {rel.readTimeMinutes} min read
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
