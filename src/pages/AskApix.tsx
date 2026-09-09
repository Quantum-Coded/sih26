import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { PRESET_INVESTIGATIONS, InvestigationResult } from '../data/aiResponses';
import { useNavigate } from 'react-router-dom';
import { useDemoMode } from '../context/DemoModeContext';
import { queryGrokReasoning, getGrokApiKey } from '../services/grokService';
import {
  Bot,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Loader2,
  Cpu,
} from 'lucide-react';
import clsx from 'clsx';

export const AskApix: React.FC = () => {
  const { setSelectedRouteId, currentRoute, travelDate, nationalKpis, routes } = useDemoMode();
  const [activeKey, setActiveKey] = useState<string>('delhi-mumbai');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [signalsStage, setSignalsStage] = useState<number>(8);
  const [investigationData, setInvestigationData] = useState<InvestigationResult>(
    PRESET_INVESTIGATIONS['delhi-mumbai']
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const hasApiKey = Boolean(getGrokApiKey());

  const executeInvestigation = async (queryText: string, key?: string) => {
    setIsLoading(true);
    setSignalsStage(0);

    // Progressive checkmark animation
    const interval = setInterval(() => {
      setSignalsStage((prev) => {
        if (prev >= 7) {
          clearInterval(interval);
          return 8;
        }
        return prev + 1;
      });
    }, 110);

    try {
      const result = await queryGrokReasoning(queryText, {
        travelDate,
        leadDays: nationalKpis.leadDays,
        currentRoute,
        nationalKpis,
        topSurgingRoutes: routes.filter((r) => r.surgePct >= 10),
      });

      setInvestigationData(result);
      if (key) setActiveKey(key);
      else setActiveKey('custom');
    } catch (err) {
      console.error('Error executing investigation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (key: string) => {
    setActiveKey(key);
    const preset = PRESET_INVESTIGATIONS[key];
    const query = preset ? preset.query : 'Why did airfare rise today?';
    executeInvestigation(query, key);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    executeInvestigation(customQuery.trim());
    setCustomQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SectionHeader
        title="Ask APIx: Analytical Intelligence Workspace"
        subtitle="Conversational econometric reasoning synthesized across live web scrapers, IMD meteorological Doppler radar, and AAI civil aviation advisories."
        badge={
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            {hasApiKey ? 'Grok-2 AI Reasoning Active' : 'APIx Econometric Engine'}
          </span>
        }
      />

      {/* Main Two-Column Analytical Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Prompt Inquiry Library & Input */}
        <div className="lg:col-span-4 space-y-4">
          {/* Query Input Box */}
          <div className="bg-surface rounded-lg border border-border p-4 shadow-sm-subtle space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink-primary tracking-tight block">
                Inquire in Natural Language:
              </span>
              <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-150">
                Multilingual
              </span>
            </div>
            <form onSubmit={handleCustomSubmit} className="space-y-2">
              <textarea
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="E.g., Why did Delhi-Mumbai airfare jump today? Or ask in Hindi, Marathi, Bengali..."
                rows={3}
                className="w-full bg-subtle border border-border rounded-md p-3 text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-brand-600 resize-none shadow-inner"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-brand-700 hover:bg-brand-800 text-white rounded-md text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-200" />
                    <span>Synthesizing Signals...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                    <span>Execute Reasoning Query</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Preset Prompts List */}
          <div className="bg-surface rounded-lg border border-border p-4 shadow-sm-subtle space-y-3">
            <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider block">
              Curated Analytical Prompts:
            </span>

            <div className="space-y-2">
              <button
                onClick={() => handleSelectPreset('delhi-mumbai')}
                className={clsx(
                  'w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 cursor-pointer',
                  activeKey === 'delhi-mumbai'
                    ? 'bg-brand-50/80 border-brand-400 font-semibold text-brand-900 shadow-sm'
                    : 'bg-white border-border hover:bg-subtle/50 text-ink-secondary'
                )}
              >
                <div>
                  <p className="font-bold text-ink-primary">Why did Delhi–Mumbai airfare rise today?</p>
                  <p className="text-[11px] text-ink-muted mt-0.5">Focus: BOM runway maintenance & squall line</p>
                </div>
                <ChevronRight className="w-4 h-4 text-ink-muted shrink-0 mt-0.5" />
              </button>

              <button
                onClick={() => handleSelectPreset('highest-surge')}
                className={clsx(
                  'w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 cursor-pointer',
                  activeKey === 'highest-surge'
                    ? 'bg-brand-50/80 border-brand-400 font-semibold text-brand-900 shadow-sm'
                    : 'bg-white border-border hover:bg-subtle/50 text-ink-secondary'
                )}
              >
                <div>
                  <p className="font-bold text-ink-primary">Which routes are under highest surge pressure?</p>
                  <p className="text-[11px] text-ink-muted mt-0.5">Basket scan of 25 monitored city pairs</p>
                </div>
                <ChevronRight className="w-4 h-4 text-ink-muted shrink-0 mt-0.5" />
              </button>

              <button
                onClick={() => handleSelectPreset('holiday-pressure')}
                className={clsx(
                  'w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 cursor-pointer',
                  activeKey === 'holiday-pressure'
                    ? 'bg-brand-50/80 border-brand-400 font-semibold text-brand-900 shadow-sm'
                    : 'bg-white border-border hover:bg-subtle/50 text-ink-secondary'
                )}
              >
                <div>
                  <p className="font-bold text-ink-primary">Compare holiday airfare pressure (2026 vs 2025)</p>
                  <p className="text-[11px] text-ink-muted mt-0.5">Festive travel yield multiplier shifts</p>
                </div>
                <ChevronRight className="w-4 h-4 text-ink-muted shrink-0 mt-0.5" />
              </button>

              <button
                onClick={() => handleSelectPreset('hindi-mumbai')}
                className={clsx(
                  'w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 cursor-pointer',
                  activeKey === 'hindi-mumbai'
                    ? 'bg-brand-50/80 border-brand-400 font-semibold text-brand-900 shadow-sm'
                    : 'bg-white border-border hover:bg-subtle/50 text-ink-secondary'
                )}
              >
                <div>
                  <p className="font-bold text-ink-primary">दिल्ली से मुंबई का एयरफेयर आज क्यों बढ़ रहा है?</p>
                  <p className="text-[11px] text-ink-muted mt-0.5">Hindi Multilingual Synthesis</p>
                </div>
                <ChevronRight className="w-4 h-4 text-ink-muted shrink-0 mt-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Structured Investigation Dossier */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-surface rounded-lg border border-border p-6 shadow-sm-subtle space-y-5 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-surface/75 backdrop-blur-[1px] flex items-center justify-center rounded-lg z-20">
                <div className="flex flex-col items-center gap-2 text-xs font-semibold text-brand-800">
                  <Loader2 className="w-6 h-6 animate-spin text-brand-700" />
                  <span>Synthesizing multi-modal econometric signals...</span>
                </div>
              </div>
            )}

            {/* Query Header */}
            <div className="border-b border-border pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded w-fit border border-indigo-100 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INVESTIGATION QUERY ID: {investigationData.id.toUpperCase()}</span>
              </div>
              <h2 className="text-lg font-extrabold text-ink-primary tracking-tight">
                {investigationData.query}
              </h2>
            </div>

            {/* Signals Checked Verification Grid */}
            <div className="rounded-lg border border-border bg-subtle/60 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink-primary tracking-wider uppercase flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-700" />
                  Cross-Domain Evidence Sources Audited:
                </span>
                <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {signalsStage} / {investigationData.signalsChecked.length} Verified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {investigationData.signalsChecked.map((sig: any, idx: number) => {
                  const isChecked = idx < signalsStage;
                  return (
                    <div
                      key={idx}
                      className={clsx(
                        'p-2 rounded border flex items-start gap-2 transition-all',
                        isChecked
                          ? 'bg-white border-border'
                          : 'bg-subtle/40 border-dashed border-slate-300 opacity-60'
                      )}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <strong className="text-ink-primary block text-[11px]">{sig.name}</strong>
                        <span className="text-[10px] text-ink-muted">{sig.detail}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Structured Analytical Findings */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-indigo-50/60 border border-indigo-100 space-y-1.5">
                <span className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                  Executive Synthesized Finding:
                </span>
                <p className="text-sm font-bold text-ink-primary leading-snug">
                  {investigationData.headline}
                </p>
                <p className="text-xs text-ink-secondary leading-relaxed pt-1">
                  {investigationData.summary}
                </p>
              </div>

              {/* Primary Drivers Breakdown Cards */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-ink-primary block">
                  Primary Attributed Price Drivers:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {investigationData.keyDrivers.map((d: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-lg border border-border bg-white shadow-sm-subtle space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink-primary">{d.title}</span>
                        <span className="font-mono font-bold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100">
                          {d.contribution}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink-muted leading-relaxed">
                        {d.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory Causal Disclaimer */}
              <div className="p-3 rounded bg-amber-50/80 border border-amber-200 text-[11px] text-amber-950 italic">
                <strong>Econometric Disclaimer:</strong> {investigationData.disclaimer}
              </div>

              {/* Action Buttons to Jump Across the Dashboard */}
              <div className="pt-2 border-t border-border flex flex-wrap items-center gap-3">
                {investigationData.actions.map((act: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (investigationData.routeId) {
                        setSelectedRouteId(investigationData.routeId);
                      }
                      navigate(act.targetRoute);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-brand-700 text-white text-xs font-semibold hover:bg-brand-800 shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>{act.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
