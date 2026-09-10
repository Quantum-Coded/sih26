import React from 'react';
import { RupeeValue } from '../common/RupeeValue';
import { useDemoMode } from '../../context/DemoModeContext';
import { RouteData } from '../../data/routes';

interface BookingWindowCurveProps {
  route?: RouteData;
  selectedLeadTime?: string;
  onSelectWindow?: (window: string) => void;
}

export const BookingWindowCurve: React.FC<BookingWindowCurveProps> = ({
  route: propRoute,
  selectedLeadTime,
  onSelectWindow,
}) => {
  const { currentRoute, travelDate, nationalKpis } = useDemoMode();
  const route = propRoute || currentRoute;
  const leadDays = nationalKpis.leadDays;

  // Determine active booking window from selected leadTime prop or fallback to travel date
  const activeWindowKey =
    selectedLeadTime ||
    (leadDays <= 1 ? 'T+1' :
    leadDays <= 3 ? 'T+3' :
    leadDays <= 7 ? 'T+7' :
    leadDays <= 15 ? 'T+15' :
    leadDays <= 30 ? 'T+30' : 'T+45');

  const base = route ? route.baselineFare : 5825;
  const currentSurge = route ? route.surgePct : 28.4;

  const curveData = [
    {
      window: 'T+1',
      label: 'Departure within 24h',
      fare: Math.round(base * (1 + Math.max(0.35, currentSurge / 100))),
      baseline: Math.round(base * 1.35),
      elasticityLabel: 'Extreme Inelasticity',
    },
    {
      window: 'T+3',
      label: '3 Days to Departure',
      fare: Math.round(base * (1 + Math.max(0.20, (currentSurge * 0.75) / 100))),
      baseline: Math.round(base * 1.20),
      elasticityLabel: 'High Yield Escalation',
    },
    {
      window: 'T+7',
      label: '1 Week Prior (Industry Benchmark)',
      fare: Math.round(base * (1 + currentSurge / 100)),
      baseline: base,
      elasticityLabel: 'Standard Reference',
    },
    {
      window: 'T+15',
      label: '2 Weeks Prior',
      fare: Math.round(base * (1 + (currentSurge * 0.25) / 100) * 0.98),
      baseline: Math.round(base * 0.96),
      elasticityLabel: 'Moderate Elasticity',
    },
    {
      window: 'T+30',
      label: '1 Month Prior',
      fare: Math.round(base * 0.90),
      baseline: Math.round(base * 0.90),
      elasticityLabel: 'Early Bird Tier',
    },
    {
      window: 'T+45',
      label: 'Advance Purchase (>45d)',
      fare: Math.round(base * 0.82),
      baseline: Math.round(base * 0.82),
      elasticityLabel: 'Lowest Bucket Floor',
    },
  ];

  const maxFare = Math.max(...curveData.map(c => Math.max(c.fare, c.baseline))) * 1.08;

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Lead-Time Elasticity Curve ({route ? route.id : 'DEL → BOM'})
            </h3>
            <span className="text-[10px] font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-200">
              Active Date: {travelDate} (T+{leadDays})
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Advance purchase curve capturing dynamic inventory yield escalation across booking windows
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {curveData.map((item) => {
          const widthPct = (item.fare / maxFare) * 100;
          const baselineWidthPct = (item.baseline / maxFare) * 100;
          const isSelectedWindow = item.window === activeWindowKey;

          return (
            <div
              key={item.window}
              onClick={() => onSelectWindow?.(item.window)}
              className={`p-2 rounded-md transition-all cursor-pointer ${
                isSelectedWindow
                  ? 'bg-brand-50/70 border border-brand-200 ring-1 ring-brand-300 shadow-xs'
                  : 'hover:bg-subtle/70'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2">
                  <span className={`font-mono font-bold w-12 ${isSelectedWindow ? 'text-brand-700 font-extrabold' : 'text-ink-primary'}`}>
                    {item.window}
                  </span>
                  <span className="text-[11px] text-ink-muted hidden sm:inline">({item.elasticityLabel})</span>
                  {isSelectedWindow && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-brand-600 text-white rounded">
                      Active Lead Window
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-ink-muted text-[11px]">
                    Baseline: <RupeeValue amount={item.baseline} size="sm" />
                  </span>
                  <span className={`font-bold tabular-nums ${isSelectedWindow ? 'text-brand-700 font-mono text-sm' : 'text-ink-primary'}`}>
                    <RupeeValue amount={item.fare} size="sm" />
                  </span>
                </div>
              </div>

              {/* Proportional Bar */}
              <div className="relative w-full h-3 bg-subtle rounded overflow-hidden">
                {/* Baseline reference marker line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                  style={{ left: `${baselineWidthPct}%` }}
                />
                {/* Current fare bar */}
                <div
                  className={`h-full rounded transition-all duration-500 ${
                    isSelectedWindow
                      ? 'bg-brand-600'
                      : item.window === 'T+1'
                      ? 'bg-rose-500'
                      : 'bg-slate-400'
                  }`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-ink-muted">
        <span>T+1 last-minute premium: <strong>+{(((curveData[0].fare - curveData[5].fare) / curveData[5].fare) * 100).toFixed(1)}% over T+45</strong></span>
        <span>Current lead window: <strong className="text-brand-700 font-bold">{activeWindowKey} ({travelDate})</strong></span>
      </div>
    </div>
  );
};
