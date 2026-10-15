import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types/blog.ts';
import { searchArticles } from '../utils/blogLogic.ts';
import { Search, X, ArrowRight, Tag } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedCategory('All');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = searchArticles(articles, query, selectedCategory);

  const categories = [
    'All',
    'Artificial Intelligence',
    'Online Privacy',
    'Productivity',
    'How-To Guides',
    'Hardware & Tech',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label="Search Articles"
    >
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 12 articles, SEO topics, tools, privacy tips..."
            className="w-full bg-transparent text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white font-mono"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills (Functional Buttons) */}
        <div className="flex items-center gap-1.5 p-3 overflow-x-auto border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-2 flex-1">
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <p className="text-sm">No articles matched "{query}" in {selectedCategory}.</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for "passwords", "phishing", "chrome", "study", or "ai".
              </p>
            </div>
          ) : (
            results.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art.slug);
                  onClose();
                }}
                className="group cursor-pointer p-3.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {art.category}
                    </span>
                    <span>·</span>
                    <span>{art.readTimeMinutes} min read</span>
                    <span>·</span>
                    <span className="truncate max-w-[150px]">By {art.author.name}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {art.excerpt}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            ))
          )}
        </div>

        {/* Quick search keywords footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Popular:</span>
            <button onClick={() => setQuery('AI')} className="hover:underline text-indigo-600">AI Tools</button>
            <span>·</span>
            <button onClick={() => setQuery('privacy')} className="hover:underline text-indigo-600">Privacy</button>
            <span>·</span>
            <button onClick={() => setQuery('passwords')} className="hover:underline text-indigo-600">Passwords</button>
          </div>
          <span className="text-[11px] font-mono">{results.length} found</span>
        </div>
      </div>
    </div>
  );
};
