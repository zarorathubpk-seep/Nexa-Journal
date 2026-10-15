import React from 'react';
import { Article } from '../types/blog.ts';
import { TrendingUp } from 'lucide-react';

interface TrendingBarProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const TrendingBar: React.FC<TrendingBarProps> = ({
  articles,
  onSelectArticle,
}) => {
  if (articles.length === 0) return null;

  return (
    <section className="mb-14">
      <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-200 dark:border-slate-800">
        <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xs uppercase tracking-widest font-bold text-slate-800 dark:text-slate-200">
          Trending Insights
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.slice(0, 4).map((art, index) => (
          <div
            key={art.id}
            onClick={() => onSelectArticle(art.slug)}
            className="group cursor-pointer flex flex-col justify-between p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-2xl font-bold text-slate-300 dark:text-slate-700 group-hover:text-indigo-500 transition-colors">
                  0{index + 1}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {art.category}
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                {art.title}
              </h3>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>{art.author.name}</span>
              <span>{art.readTimeMinutes} min</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
