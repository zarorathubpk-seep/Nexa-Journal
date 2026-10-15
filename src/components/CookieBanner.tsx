import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck } from 'lucide-react';

interface CookieBannerProps {
  onNavigatePolicy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigatePolicy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('nexajournal_cookie_consent');
    if (!consent) {
      // Delay slightly to avoid layout flash
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (choice: 'all' | 'essential') => {
    localStorage.setItem('nexajournal_cookie_consent', choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white mb-1">
            Privacy & Cookie Preferences
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            NexaJournal uses essential cookies to remember your reading preferences and dark mode, as well as privacy-focused metrics to understand readership. Read our{' '}
            <button
              onClick={onNavigatePolicy}
              className="text-indigo-600 dark:text-indigo-400 underline font-medium hover:text-indigo-500"
            >
              Cookie Policy
            </button>.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAccept('all')}
              className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={() => handleAccept('essential')}
              className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
