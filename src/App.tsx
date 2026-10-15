import React, { useState, useEffect } from 'react';
import { ARTICLES } from './data/articles.ts';
import { CATEGORIES } from './data/authors.ts';
import { Article, CategoryType } from './types/blog.ts';
import { searchArticles, generateArticleJsonLd } from './utils/blogLogic.ts';
import { getAssetUrl } from './utils/imageHelper.ts';

// Components
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { HeroFeatured } from './components/HeroFeatured.tsx';
import { TrendingBar } from './components/TrendingBar.tsx';
import { ArticleCard } from './components/ArticleCard.tsx';
import { ArticleView } from './components/ArticleView.tsx';
import { AdPlacement } from './components/AdPlacement.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { RevBidModal } from './components/RevBidModal.tsx';
import { SitemapModal } from './components/SitemapModal.tsx';
import { NewsletterSection } from './components/NewsletterSection.tsx';
import { CookieBanner } from './components/CookieBanner.tsx';

// Pages
import { AboutPage } from './components/pages/AboutPage.tsx';
import { ContactPage } from './components/pages/ContactPage.tsx';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage.tsx';
import { TermsPage } from './components/pages/TermsPage.tsx';
import { DisclaimerPage } from './components/pages/DisclaimerPage.tsx';
import { CookiePolicyPage } from './components/pages/CookiePolicyPage.tsx';

import { Sparkles, Bookmark, Compass, Filter, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeSlug, setActiveSlug] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('nexajournal_theme') === 'dark';
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('nexajournal_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRevBidOpen, setIsRevBidOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  // Sync dark class on document root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nexajournal_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nexajournal_theme', 'light');
    }
  }, [isDark]);

  // Handle browser URL hash on mount & hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('article/')) {
        const slug = hash.replace('article/', '');
        setActiveSlug(slug);
        setCurrentView('article');
      } else if (hash.startsWith('category/')) {
        const cat = decodeURIComponent(hash.replace('category/', ''));
        setSelectedCategory(cat);
        setCurrentView('category');
      } else if (['about', 'contact', 'privacy', 'terms', 'disclaimer', 'cookies', 'bookmarks'].includes(hash)) {
        setCurrentView(hash);
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: string, param?: string) => {
    if (view === 'article' && param) {
      setActiveSlug(param);
      setCurrentView('article');
      window.location.hash = `article/${param}`;
    } else if (view === 'category' && param) {
      setSelectedCategory(param);
      setCurrentView('category');
      window.location.hash = `category/${encodeURIComponent(param)}`;
    } else if (view === 'home') {
      setCurrentView('home');
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView(view);
      window.location.hash = view;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      localStorage.setItem('nexajournal_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleBookmarkEvent = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    handleToggleBookmark(id);
  };

  // Find active article
  const currentArticle = ARTICLES.find((a) => a.slug === activeSlug) || ARTICLES[0];
  const featuredArticle = ARTICLES.find((a) => a.isFeatured) || ARTICLES[0];
  const trendingArticles = ARTICLES.filter((a) => a.isTrending);
  const editorPicks = ARTICLES.filter((a) => a.isEditorPick);
  const guides = ARTICLES.filter((a) => a.isGuide || a.category === 'How-To Guides');

  // Filtered articles for home & category
  const filteredArticles = searchArticles(
    ARTICLES,
    searchQuery,
    currentView === 'category' ? selectedCategory : selectedCategory
  );

  const bookmarkedArticles = ARTICLES.filter((a) => bookmarkedIds.includes(a.id));

  // Dynamic JSON-LD structured data for article view
  useEffect(() => {
    if (currentView === 'article' && currentArticle) {
      const scriptId = 'article-json-ld';
      let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(generateArticleJsonLd(currentArticle, window.location.origin));
    }
  }, [currentView, currentArticle]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header Contract */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenSearch={() => setIsSearchOpen(true)}
        savedCount={bookmarkedIds.length}
        onOpenRevBid={() => setIsRevBidOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {/* VIEW 1: HOME */}
        {currentView === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Lead Editorial Story */}
            <HeroFeatured
              article={featuredArticle}
              onSelectArticle={(slug) => navigateTo('article', slug)}
            />

            {/* Trending Section */}
            <TrendingBar
              articles={trendingArticles}
              onSelectArticle={(slug) => navigateTo('article', slug)}
            />

            {/* Leaderboard Ad Placement (RevBid Ready) */}
            <AdPlacement format="leaderboard" onOpenInfo={() => setIsRevBidOpen(true)} />

            {/* Topics & Category Filter Toolbar */}
            <section className="mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-xs uppercase tracking-widest font-bold text-slate-800 dark:text-slate-200">
                    Explore Articles & Categories
                  </h2>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === 'All'
                        ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    All ({ARTICLES.length})
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                        selectedCategory === cat.name
                          ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
                {filteredArticles.map((art) => (
                  <ArticleCard
                    key={art.id}
                    article={art}
                    onSelectArticle={(slug) => navigateTo('article', slug)}
                    isBookmarked={bookmarkedIds.includes(art.id)}
                    onToggleBookmark={handleToggleBookmarkEvent}
                  />
                ))}
              </div>
            </section>

            {/* Editor's Picks Section */}
            {editorPicks.length > 0 && selectedCategory === 'All' && (
              <section className="my-16 pt-12 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 pb-3 mb-6">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-xs uppercase tracking-widest font-bold text-slate-800 dark:text-slate-200">
                    Editor's Curated Picks
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {editorPicks.slice(0, 3).map((art) => (
                    <ArticleCard
                      key={`pick-${art.id}`}
                      article={art}
                      onSelectArticle={(slug) => navigateTo('article', slug)}
                      isBookmarked={bookmarkedIds.includes(art.id)}
                      onToggleBookmark={handleToggleBookmarkEvent}
                      compact
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Featured Guides Section */}
            {guides.length > 0 && selectedCategory === 'All' && (
              <section className="my-14 pt-10 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between pb-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <h2 className="text-xs uppercase tracking-widest font-bold text-slate-800 dark:text-slate-200">
                      Step-by-Step Technical Guides
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateTo('category', 'How-To Guides')}
                    className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                  >
                    View All Guides →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guides.slice(0, 2).map((art) => (
                    <div
                      key={`guide-${art.id}`}
                      onClick={() => navigateTo('article', art.slug)}
                      className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 overflow-hidden flex flex-col sm:flex-row transition-all duration-200"
                    >
                      <div className="sm:w-2/5 relative overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[16/10] sm:aspect-auto">
                        <img
                          src={getAssetUrl(art.featuredImage)}
                          alt={art.featuredImageAlt}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
                            Interactive Guide · {art.readTimeMinutes} Min Read
                          </div>
                          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 leading-snug">
                            {art.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                            {art.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                          <span>By {art.author.name}</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                            Launch Guide →
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Newsletter Dispatch */}
            <NewsletterSection />
          </div>
        )}

        {/* VIEW 2: ARTICLE READING VIEW */}
        {currentView === 'article' && (
          <ArticleView
            article={currentArticle}
            allArticles={ARTICLES}
            onNavigateHome={() => navigateTo('home')}
            onSelectArticle={(slug) => navigateTo('article', slug)}
            isBookmarked={bookmarkedIds.includes(currentArticle.id)}
            onToggleBookmark={handleToggleBookmark}
            onOpenRevBid={() => setIsRevBidOpen(true)}
          />
        )}

        {/* VIEW 3: CATEGORY LISTING */}
        {currentView === 'category' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 mb-6 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Articles</span>
            </button>

            {(() => {
              const categoryInfo = CATEGORIES.find((c) => c.name === selectedCategory);
              return (
                <div className="mb-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
                  <div className={`${categoryInfo?.image ? 'md:col-span-8' : 'md:col-span-12'} p-6 sm:p-8 flex flex-col justify-center`}>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                      Category Archive
                    </span>
                    <h1 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1 mb-3">
                      {selectedCategory}
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-4">
                      {categoryInfo?.description ||
                        `In-depth publications and guides categorized under ${selectedCategory}.`}
                    </p>
                    <div className="text-xs font-mono text-slate-400">
                      {filteredArticles.length} Curated Articles in this Section
                    </div>
                  </div>
                  {categoryInfo?.image && (
                    <div className="md:col-span-4 relative overflow-hidden min-h-[160px] sm:min-h-[200px] bg-slate-100 dark:bg-slate-800">
                      <img
                        src={getAssetUrl(categoryInfo.image)}
                        alt={`${selectedCategory} archive editorial visual`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-slate-900 via-transparent to-transparent hidden md:block" />
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map((art) => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  onSelectArticle={(slug) => navigateTo('article', slug)}
                  isBookmarked={bookmarkedIds.includes(art.id)}
                  onToggleBookmark={handleToggleBookmarkEvent}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: SAVED BOOKMARKS */}
        {currentView === 'bookmarks' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="mb-10 pb-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h1 className="font-serif font-bold text-3xl text-slate-900 dark:text-white">
                  Saved Articles
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Articles bookmarked for offline reading and research reference ({bookmarkedArticles.length}).
                </p>
              </div>
              {bookmarkedArticles.length > 0 && (
                <button
                  onClick={() => {
                    setBookmarkedIds([]);
                    localStorage.removeItem('nexajournal_bookmarks');
                  }}
                  className="text-xs text-rose-500 hover:underline"
                >
                  Clear All Saved
                </button>
              )}
            </div>

            {bookmarkedArticles.length === 0 ? (
              <div className="py-20 text-center max-w-md mx-auto">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h2 className="font-serif font-bold text-lg text-slate-700 dark:text-slate-300 mb-1">
                  No Saved Articles Yet
                </h2>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Click the bookmark icon on any article card or reading view to store it for quick access.
                </p>
                <button
                  onClick={() => navigateTo('home')}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-indigo-600 text-white"
                >
                  Browse Latest Articles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {bookmarkedArticles.map((art) => (
                  <ArticleCard
                    key={art.id}
                    article={art}
                    onSelectArticle={(slug) => navigateTo('article', slug)}
                    isBookmarked={true}
                    onToggleBookmark={handleToggleBookmarkEvent}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: ABOUT US */}
        {currentView === 'about' && (
          <AboutPage
            onNavigateContact={() => navigateTo('contact')}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {/* VIEW 6: CONTACT US */}
        {currentView === 'contact' && <ContactPage />}

        {/* VIEW 7: PRIVACY POLICY */}
        {currentView === 'privacy' && <PrivacyPolicyPage />}

        {/* VIEW 8: TERMS OF SERVICE */}
        {currentView === 'terms' && <TermsPage />}

        {/* VIEW 9: DISCLAIMER */}
        {currentView === 'disclaimer' && <DisclaimerPage />}

        {/* VIEW 10: COOKIE POLICY */}
        {currentView === 'cookies' && <CookiePolicyPage />}
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenRevBid={() => setIsRevBidOpen(true)}
        onOpenSitemap={() => setIsSitemapOpen(true)}
      />

      {/* Cookie Banner */}
      <CookieBanner onNavigatePolicy={() => navigateTo('cookies')} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={(slug) => navigateTo('article', slug)}
      />

      {/* RevBid & Ads.txt Monetization Hub */}
      <RevBidModal
        isOpen={isRevBidOpen}
        onClose={() => setIsRevBidOpen(false)}
      />

      {/* XML Sitemap & SEO Tools Modal */}
      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
        articles={ARTICLES}
      />
    </div>
  );
}
