import React from 'react';
import { Info } from 'lucide-react';

interface AdPlacementProps {
  format: 'leaderboard' | 'rectangle' | 'in-article';
  className?: string;
  onOpenInfo?: () => void;
}

export const AdPlacement: React.FC<AdPlacementProps> = ({
  format,
  className = '',
  onOpenInfo,
}) => {
  return (
    <div
      className={`my-8 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 rounded-lg text-center transition-colors ${className}`}
      role="region"
      aria-label="Advertising Placement Slot"
    >
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-slate-600 dark:text-slate-400 font-mono mb-2">
        <span>Advertisement Placement</span>
        {onOpenInfo && (
          <button
            onClick={onOpenInfo}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 p-0.5"
            title="Learn about RevBid monetization & ad compliance"
            aria-label="RevBid compliance info"
          >
            <Info className="w-3 h-3" />
          </button>
        )}
      </div>

      {format === 'leaderboard' && (
        <div className="w-full max-w-[728px] h-[90px] flex flex-col items-center justify-center bg-slate-100/60 dark:bg-slate-800/40 rounded border border-slate-200/50 dark:border-slate-800/60 text-slate-500 dark:text-slate-400 text-xs">
          <span className="font-medium text-slate-600 dark:text-slate-300">
            Leaderboard 728×90 Slot (RevBid Header Bidding)
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
            Standard IAB leaderboard slot reserved for programmatic demand partners.
          </span>
        </div>
      )}

      {format === 'rectangle' && (
        <div className="w-[300px] h-[250px] flex flex-col items-center justify-center bg-slate-100/60 dark:bg-slate-800/40 rounded border border-slate-200/50 dark:border-slate-800/60 text-slate-500 dark:text-slate-400 text-xs p-4">
          <span className="font-medium text-slate-600 dark:text-slate-300">
            Medium Rectangle 300×250
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Reserved space for high-viewability sidebar placement compliant with RevBid policies.
          </span>
        </div>
      )}

      {format === 'in-article' && (
        <div className="w-full max-w-[680px] py-4 px-6 flex flex-col items-center justify-center bg-slate-100/60 dark:bg-slate-800/40 rounded border border-slate-200/50 dark:border-slate-800/60 text-slate-500 dark:text-slate-400 text-xs">
          <span className="font-medium text-slate-600 dark:text-slate-300">
            In-Article Fluid Native Ad Placement
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 text-center">
            Separated strictly from editorial prose. Zero intrusive overlays or automated forced clicks.
          </span>
        </div>
      )}
    </div>
  );
};
