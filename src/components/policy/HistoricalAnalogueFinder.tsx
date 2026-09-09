import React from 'react';
import { HISTORICAL_ANALOGUES } from '../../data/policyData';
import { History, Sparkles } from 'lucide-react';

export const HistoricalAnalogueFinder: React.FC = () => {
  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-brand-700" />
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Historical Precedent & Condition Analogues
            </h3>
            <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
              Pattern Matcher
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Today's market conditions (ATC maintenance + coastal rain + high demand) resemble past market episodes:
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {HISTORICAL_ANALOGUES.map((item) => (
          <div
            key={item.rank}
            className="p-3.5 rounded-lg border border-border bg-white shadow-sm-subtle space-y-2 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center font-mono border border-brand-200">
                  #{item.rank}
                </span>
                <h4 className="font-bold text-xs text-ink-primary">
                  {item.period}
                </h4>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                {item.similarityScore}% Similarity
              </span>
            </div>

            <p className="text-xs text-ink-secondary">
              <strong className="text-ink-primary">Correlating Factors:</strong> {item.keyFactors}
            </p>

            <div className="pt-2 border-t border-border/80 text-[11px] text-ink-muted flex flex-wrap items-center justify-between gap-2">
              <span>Observed Outcome: <strong className="text-ink-primary">{item.observedOutcome}</strong></span>
              <span className="font-mono text-rose-600 font-semibold">{item.actualIndexDelta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
