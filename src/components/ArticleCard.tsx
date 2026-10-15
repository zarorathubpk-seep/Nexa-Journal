import React, { useState } from 'react';
import { Article } from '../types/blog.ts';
import { Bookmark, Clock, ImageOff } from 'lucide-react';
import { getAssetUrl } from '../utils/imageHelper.ts';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (slug: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (e: React.MouseEvent, id: string) => void;
  compact?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelectArticle,
  isBookmarked = false,
  onToggleBookmark,
  compact = false,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      onClick={() => onSelectArticle(article.slug)}
      className="group cursor-pointer flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200"
    >
      {/* Featured Image Container */}
      <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${compact ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
        {!imageFailed ? (
          <img
            src={getAssetUrl(article.featuredImage)}
            alt={article.featuredImageAlt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-800 text-slate-400">
            <ImageOff className="w-8 h-8 mb-1 opacity-50" />
            <span className="text-[11px] text-center font-medium line-clamp-1">{article.title}</span>
          </div>
        )}

        {/* Bookmark quick button */}
        {onToggleBookmark && (
          <button
            onClick={(e) => onToggleBookmark(e, article.id)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-sm hover:text-indigo-600 dark:hover:text-indigo-400 backdrop-blur-xs transition-colors"
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-semibold text-[11px]">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readTimeMinutes} min</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug tracking-tight mb-2.5 [text-wrap:balance]">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Author Byline */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {article.author.name}
            </span>
          </div>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">
            Read Article →
          </span>
        </div>
      </div>
    </article>
  );
};
