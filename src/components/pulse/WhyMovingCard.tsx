import React from 'react';
import { Bot, Sparkles, ArrowRight, Layers } from 'lucide-react';
import { useDemoMode } from '../../context/DemoModeContext';
import { useNavigate } from 'react-router-dom';

export const WhyMovingCard: React.FC = () => {
  const { setIsCopilotOpen } = useDemoMode();
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-brand-900 to-slate-900 text-white rounded-lg border border-slate-800 p-5 shadow-card space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-brand-700 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-white">
              Why is the Market Moving Today?
            </h3>
            <span className="text-[11px] text-slate-400">
              National Market Attribution Synthesis • MoSPI Baseline
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsCopilotOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-transform active:scale-95 shrink-0"
        >
          <Bot className="w-3.5 h-3.5 text-white" />
          <span>Investigate with AI</span>
        </button>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        Today's national index rise (<strong className="text-white">+3.8% to 117.4</strong>) is primarily concentrated in <strong>Western India</strong> and high-frequency business sectors. The primary catalyst is the simultaneous runway maintenance and squall line at <strong>Mumbai (BOM)</strong>, creating flight slot rationing that propagated price pressure into connected tech hubs.
      </p>

      {/* Proportional Contribution Bars */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Factor Decomposition of Today's Index Delta
        </span>

        <div className="space-y-1.5 text-xs">
          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
              <span>Sector Concentration (DEL-BOM, BOM-BLR)</span>
              <span className="font-bold text-rose-400 font-mono">37%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-rose-500 h-2 rounded-full" style={{ width: '37%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
              <span>Operational Capacity Constraint (NOTAM / Radar)</span>
              <span className="font-bold text-amber-400 font-mono">28%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '28%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
              <span>Alternative Rebooking Demand Spike</span>
              <span className="font-bold text-indigo-400 font-mono">21%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '21%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
              <span>Upcoming Long Weekend Leisure Inflow</span>
              <span className="font-bold text-emerald-400 font-mono">14%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '14%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
        <span>Statistical correlation confidence: <strong>89.4%</strong></span>
        <button
          onClick={() => navigate('/policy')}
          className="text-brand-300 hover:text-white font-medium flex items-center gap-1"
        >
          <span>View Waterfall Decomposition</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
