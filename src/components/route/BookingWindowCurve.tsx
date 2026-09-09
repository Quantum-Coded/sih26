import React from 'react';
import { DEL_BOM_LEAD_TIME_CURVE } from '../../data/fareHistory';
import { RupeeValue } from '../common/RupeeValue';

export const BookingWindowCurve: React.FC = () => {
  const maxFare = 9200;

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Lead-Time Elasticity Curve (T+45 to T+1)
            </h3>
            <span className="text-[10px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200">
              High Elasticity
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Advance purchase curve capturing dynamic inventory yield escalation
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {DEL_BOM_LEAD_TIME_CURVE.map((item) => {
          const widthPct = (item.fare / maxFare) * 100;
          const baselineWidthPct = (item.baseline / maxFare) * 100;
          const isT1 = item.window === 'T+1';
          const isT7 = item.window === 'T+7';

          return (
            <div key={item.window} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-ink-primary w-12">{item.window}</span>
                  <span className="text-[11px] text-ink-muted hidden sm:inline">({item.elasticityLabel})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-ink-muted text-[11px]">
                    Baseline: <RupeeValue amount={item.baseline} size="sm" />
                  </span>
                  <span className={`font-bold tabular-nums ${isT1 || isT7 ? 'text-rose-600 font-mono text-sm' : 'text-ink-primary'}`}>
                    <RupeeValue amount={item.fare} size="sm" />
                  </span>
                </div>
              </div>

              {/* Proportional Bar */}
              <div className="relative w-full h-3.5 bg-subtle rounded overflow-hidden">
                {/* Baseline reference marker line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                  style={{ left: `${baselineWidthPct}%` }}
                />
                {/* Current fare bar */}
                <div
                  className={`h-full rounded transition-all duration-500 ${
                    isT1 ? 'bg-rose-600' : isT7 ? 'bg-brand-600' : 'bg-slate-400'
                  }`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-ink-muted">
        <span>T+1 last-minute premium: <strong>+87.7% over T+45</strong></span>
        <span>Steepest escalation: <strong>T+7 to T+1 (+₹1,720 jump)</strong></span>
      </div>
    </div>
  );
};
