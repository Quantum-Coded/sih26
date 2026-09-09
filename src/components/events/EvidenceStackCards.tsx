import React from 'react';
import { EvidenceRecord } from '../../data/events';
import { Newspaper, CloudRain, Cpu, Search, Calendar, ExternalLink, CheckCircle } from 'lucide-react';
import { useDemoMode } from '../../context/DemoModeContext';

interface EvidenceStackCardsProps {
  evidenceList: EvidenceRecord[];
}

export const EvidenceStackCards: React.FC<EvidenceStackCardsProps> = ({ evidenceList }) => {
  const { showToast } = useDemoMode();

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Operations':
        return <Cpu className="w-4 h-4 text-orange-600" />;
      case 'Weather':
        return <CloudRain className="w-4 h-4 text-amber-600" />;
      case 'Search demand':
        return <Search className="w-4 h-4 text-indigo-600" />;
      case 'Holiday calendar':
        return <Calendar className="w-4 h-4 text-emerald-600" />;
      case 'News':
      default:
        return <Newspaper className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h3 className="text-sm font-bold text-ink-primary tracking-tight">
            Cryptographic Evidence Stack & Source Audit Trails
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">
            Verified external signal artefacts collected synchronously with airfare spikes
          </p>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          4 Multi-Modal Sources Verified
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {evidenceList.map((rec, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-border bg-white p-3.5 shadow-sm-subtle flex flex-col justify-between space-y-3 hover:border-slate-300 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-ink-primary">
                  {getCategoryIcon(rec.category)}
                  {rec.category}
                </span>
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                  Score: {rec.reliabilityScore}%
                </span>
              </div>

              <div className="text-[11px] text-ink-muted font-mono">
                {rec.source} • {rec.timestamp}
              </div>

              <p className="text-xs text-ink-secondary leading-relaxed">
                {rec.summary}
              </p>
            </div>

            <div className="pt-2 border-t border-border/80 flex items-center justify-between">
              <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
                {rec.metric}
              </span>
              <button
                onClick={() => showToast(`Evidence verified: ${rec.source}`)}
                className="text-[11px] font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1"
              >
                <span>Audit</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
