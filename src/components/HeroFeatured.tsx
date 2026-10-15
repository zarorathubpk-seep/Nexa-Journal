import React from 'react';
import { Article } from '../types/blog.ts';
import { Clock, ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../utils/imageHelper.ts';

interface HeroFeaturedProps {
  article: Article;
  onSelectArticle: (slug: string) => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({
  article,
  onSelectArticle,
}) => {
  return (
    <section className="relative w-full mb-12 sm:mb-16">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Visual Column */}
          <div
            onClick={() => onSelectArticle(article.slug)}
            className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] lg:min-h-full cursor-pointer overflow-hidden group"
          >
            <img
              src={getAssetUrl(article.featuredImage)}
              alt={article.featuredImageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Editorial Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Lead Editorial Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
                <span>Featured Cover Story</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-600 dark:text-slate-400 font-medium normal-case tracking-normal">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h2
                onClick={() => onSelectArticle(article.slug)}
                className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer leading-[1.2] tracking-tight mb-4 [text-wrap:balance]"
              >
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                {article.excerpt}
              </p>
            </div>

            {/* Author and Action */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <span>{article.publishDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTimeMinutes} min read</span>
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectArticle(article.slug)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-indigo-600 text-white text-xs font-semibold hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors shadow-xs"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
