import React from 'react';
import { ArrowRight, Plane, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDemoMode } from '../../context/DemoModeContext';
import { MUMBAI_SURGE_SCENARIO } from '../../data/demoScenario';
import { RupeeValue } from '../common/RupeeValue';

export const SurgePropagationGraph: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedRouteId } = useDemoMode();
  const scenario = MUMBAI_SURGE_SCENARIO;

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Airport-to-Route Surge Propagation Network
            </h3>
            <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
              Network Contagion
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            How hub-level runway slot constraints at Mumbai (BOM) propagate price shocks to connected spokes
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedRouteId('DEL-BOM');
            navigate('/events');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand-700 text-white text-xs font-semibold hover:bg-brand-800 shadow-sm transition-transform active:scale-95 shrink-0"
        >
          <span>Investigate This Surge</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Visual Network Flow */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-2">
        {/* Hub Airport Epicenter Card */}
        <div className="md:col-span-4 bg-rose-50 border-2 border-rose-300 rounded-xl p-4 text-center space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-sm mx-auto shadow-md animate-pulse">
            BOM
          </div>
          <div>
            <h4 className="font-bold text-sm text-rose-950">
              Mumbai (BOM) Hub Epicenter
            </h4>
            <span className="text-[11px] font-medium text-rose-700 block">
              Secondary Runway 14/32 In Use
            </span>
          </div>
          <div className="text-xs text-rose-800 bg-white/70 p-2 rounded border border-rose-200 text-left space-y-1">
            <div className="flex justify-between">
              <span>Arrival Delay Rate:</span>
              <strong className="text-rose-900 font-mono">26%</strong>
            </div>
            <div className="flex justify-between">
              <span>Hourly Movement Cap:</span>
              <strong className="text-rose-900 font-mono">28 / hr</strong> (vs 46)
            </div>
          </div>
        </div>

        {/* Connected Outbound Routes Column */}
        <div className="md:col-span-8 space-y-2">
          <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider block">
            Impacted City-Pair Corridors:
          </span>

          <div className="space-y-2">
            {scenario.connectedRoutes.map((cr) => (
              <div
                key={cr.routeId}
                onClick={() => {
                  setSelectedRouteId(cr.routeId);
                  navigate(`/route?id=${cr.routeId}`);
                }}
                className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-white hover:border-brand-300 hover:bg-brand-50/40 transition-all cursor-pointer group text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-[11px]">
                    <Plane className="w-3.5 h-3.5 text-brand-600" />
                  </div>
                  <div>
                    <span className="font-bold text-ink-primary font-mono group-hover:text-brand-700">
                      {cr.routeId}
                    </span>
                    <span className="text-[11px] text-ink-muted ml-2">
                      Baseline: <RupeeValue amount={cr.baseline} size="sm" />
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-bold text-ink-primary">
                    <RupeeValue amount={cr.fare} size="sm" />
                  </span>
                  <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 tabular-nums">
                    +{cr.surgePct}%
                  </span>
                  <span className="text-xs font-semibold text-amber-700">
                    {cr.pressure}/100
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-ink-muted">
        <span>Contagion Model: <strong>Network Slot Depletion Propagation</strong></span>
        <span>Average cross-route transmission speed: <strong>1.4 hours</strong></span>
      </div>
    </div>
  );
};
