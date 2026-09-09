import React, { useState } from 'react';
import { X, Bot, ArrowRight, Sparkles, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import { useDemoMode } from '../../context/DemoModeContext';
import { useNavigate } from 'react-router-dom';
import { PRESET_INVESTIGATIONS } from '../../data/aiResponses';

export const AiCopilotDrawer: React.FC = () => {
  const { isCopilotOpen, setIsCopilotOpen, selectedRouteId } = useDemoMode();
  const [query, setQuery] = useState('');
  const [activeInvestigationKey, setActiveInvestigationKey] = useState<string>('delhi-mumbai');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  if (!isCopilotOpen) return null;

  const currentInvestigation = PRESET_INVESTIGATIONS[activeInvestigationKey] || PRESET_INVESTIGATIONS['delhi-mumbai'];

  const handleSelectPreset = (key: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setActiveInvestigationKey(key);
      setIsAnalyzing(false);
    }, 450);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const q = query.toLowerCase();
      if (q.includes('surge') || q.includes('highest')) {
        setActiveInvestigationKey('highest-surge');
      } else if (q.includes('holiday') || q.includes('diwali')) {
        setActiveInvestigationKey('holiday-pressure');
      } else if (q.includes('delhi') || q.includes('mumbai') || q.includes('bom')) {
        setActiveInvestigationKey('delhi-mumbai');
      } else {
        setActiveInvestigationKey('delhi-mumbai');
      }
      setIsAnalyzing(false);
      setQuery('');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={() => setIsCopilotOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-surface shadow-2xl flex flex-col h-full z-10 border-l border-border animate-slide-left">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-brand-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-brand-700 flex items-center justify-center text-white">
              <Bot className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-tight">APIx Intelligence Copilot</h3>
                <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-1.5 py-0.5 rounded font-mono">
                  Grok / DGCA Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Contextual evidence reasoning & cross-dashboard navigation
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCopilotOpen(false)}
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Quick Context Chips */}
          <div>
            <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider block mb-2">
              Suggested Analytical Investigations
            </span>
            <div className="space-y-1.5">
              <button
                onClick={() => handleSelectPreset('delhi-mumbai')}
                className="w-full text-left p-2.5 rounded-md border border-border bg-subtle/50 hover:bg-brand-50 hover:border-brand-200 transition-colors text-xs font-medium text-ink-primary flex items-center justify-between group"
              >
                <span>Why did Delhi–Mumbai airfare rise today?</span>
                <ChevronRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-brand-700" />
              </button>
              <button
                onClick={() => handleSelectPreset('highest-surge')}
                className="w-full text-left p-2.5 rounded-md border border-border bg-subtle/50 hover:bg-brand-50 hover:border-brand-200 transition-colors text-xs font-medium text-ink-primary flex items-center justify-between group"
              >
                <span>Which routes are under the highest surge pressure?</span>
                <ChevronRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-brand-700" />
              </button>
              <button
                onClick={() => handleSelectPreset('holiday-pressure')}
                className="w-full text-left p-2.5 rounded-md border border-border bg-subtle/50 hover:bg-brand-50 hover:border-brand-200 transition-colors text-xs font-medium text-ink-primary flex items-center justify-between group"
              >
                <span>Compare holiday airfare pressure (2026 vs 2025)</span>
                <ChevronRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-brand-700" />
              </button>
            </div>
          </div>

          {/* Investigation Output */}
          {isAnalyzing ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-8 h-8 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
              <p className="text-xs font-medium text-ink-secondary">
                Cross-referencing 1,284 quotes, IMD weather feeds and NOTAMs...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Query & Headline */}
              <div className="p-3.5 rounded-lg bg-indigo-50/70 border border-indigo-100">
                <div className="flex items-center gap-2 text-indigo-900 font-semibold text-xs mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{currentInvestigation.query}</span>
                </div>
                <p className="text-xs font-bold text-ink-primary mt-1">
                  {currentInvestigation.headline}
                </p>
              </div>

              {/* Signals Checked */}
              <div className="rounded-md border border-border p-3 bg-white space-y-2">
                <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider block">
                  Cross-Domain Signals Audited
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {currentInvestigation.signalsChecked.map((sig, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ink-primary">{sig.name}:</strong>{' '}
                        <span className="text-ink-secondary">{sig.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Executive Summary & Drivers */}
              <div className="space-y-2 text-xs">
                <span className="font-semibold text-ink-primary block">
                  Analytical Findings:
                </span>
                <p className="text-ink-secondary leading-relaxed bg-subtle/50 p-3 rounded-md border border-border/80">
                  {currentInvestigation.summary}
                </p>

                <div className="space-y-1.5 pt-1">
                  {currentInvestigation.keyDrivers.map((driver, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-white border border-border text-xs">
                      <div>
                        <span className="font-semibold text-ink-primary">{driver.title}</span>
                        <p className="text-[11px] text-ink-muted">{driver.detail}</p>
                      </div>
                      <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-100 tabular-nums">
                        {driver.contribution}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="pt-2 border-t border-border">
                <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider block mb-2">
                  Jump to Detailed Workspace
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentInvestigation.actions.map((act, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsCopilotOpen(false);
                        navigate(act.targetRoute);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand-700 text-white text-xs font-medium hover:bg-brand-800 transition-colors shadow-sm"
                    >
                      <span>{act.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-[10px] text-ink-muted italic border-l-2 border-amber-500 pl-2">
                {currentInvestigation.disclaimer}
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-border bg-subtle">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything (e.g. 'Explain DEL-BOM surge')..."
              className="flex-1 bg-surface border border-border rounded-md px-3 py-2 text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-brand-600 shadow-sm"
            />
            <button
              type="submit"
              className="p-2 bg-brand-700 text-white rounded-md hover:bg-brand-800 transition-colors shrink-0"
              title="Submit query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
