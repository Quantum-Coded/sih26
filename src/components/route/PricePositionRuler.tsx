import React from 'react';
import { PRICE_POSITION_DEL_BOM } from '../../data/fareHistory';
import { RupeeValue } from '../common/RupeeValue';

export const PricePositionRuler: React.FC = () => {
  const p = PRICE_POSITION_DEL_BOM;

  // Normalized position on scale 0 to 100
  const markerPosPct = 84; // In extreme band

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Historical Price Position Spectrum
            </h3>
            <span className="text-[10px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200">
              92nd Percentile (Extreme)
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Current fare benchmarked against 365-day historical quote distribution
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-ink-muted block">Current Quote</span>
          <span className="text-lg font-extrabold text-status-danger tabular-nums">
            ₹7,480
          </span>
        </div>
      </div>

      {/* Visual Spectrum Ruler */}
      <div className="relative pt-6 pb-2">
        {/* Floating Marker */}
        <div
          className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center transition-all duration-500"
          style={{ left: `${markerPosPct}%` }}
        >
          <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
            ₹7,480 (Today)
          </span>
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-rose-600" />
        </div>

        {/* The 4-segment spectrum track */}
        <div className="w-full h-3 rounded-full flex overflow-hidden bg-subtle">
          <div className="w-1/4 bg-emerald-500" title="Low / Discount Zone: ₹3,850 - ₹5,200" />
          <div className="w-1/4 bg-slate-400" title="Normal Seasonal Zone: ₹5,200 - ₹6,450" />
          <div className="w-1/4 bg-amber-500" title="High / Tight Zone: ₹6,450 - ₹7,100" />
          <div className="w-1/4 bg-rose-600" title="Extreme Surge Zone: ₹7,100 - ₹11,400" />
        </div>

        {/* Labels under track */}
        <div className="flex justify-between text-[11px] font-bold text-ink-muted pt-2 tracking-wider uppercase">
          <span className="text-emerald-700">Low (₹3,850)</span>
          <span className="text-slate-600">Normal (Median ₹5,825)</span>
          <span className="text-amber-700">High (P75 ₹6,450)</span>
          <span className="text-rose-700">Extreme (&gt;₹7,100)</span>
        </div>
      </div>

      <div className="pt-2 border-t border-border text-[11px] text-ink-muted flex items-center justify-between">
        <span>Historical minimum observed: <strong>₹3,850</strong></span>
        <span>Historical peak observed: <strong>₹11,400</strong></span>
        <span>Current percentile rank: <strong className="text-rose-600">92.4%</strong></span>
      </div>
    </div>
  );
};
