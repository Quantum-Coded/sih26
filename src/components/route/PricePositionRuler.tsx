import React from 'react';
import { useDemoMode } from '../../context/DemoModeContext';
import { RupeeValue } from '../common/RupeeValue';
import { RouteData } from '../../data/routes';

interface PricePositionRulerProps {
  route?: RouteData;
  leadTime?: string;
  preset?: string;
}

export const PricePositionRuler: React.FC<PricePositionRulerProps> = ({
  route: propRoute,
  leadTime,
  preset,
}) => {
  const { currentRoute: contextRoute, travelDate } = useDemoMode();
  const currentRoute = propRoute || contextRoute;

  const baseline = currentRoute ? currentRoute.baselineFare : 5825;
  const currentFare = currentRoute ? currentRoute.currentFare : 7480;
  const surgePct = currentRoute ? currentRoute.surgePct : 28.4;

  const lowZone = Math.round(baseline * 0.70);
  const normalZone = baseline;
  const highZone = Math.round(baseline * 1.15);
  const extremeZone = Math.round(baseline * 1.25);
  const peakZone = Math.round(baseline * 1.85);

  // Dynamic percentile computation
  const percentile = Math.min(99.4, Math.max(8.0, Number((50 + (surgePct * 1.6)).toFixed(1))));

  // Normalized position on visual track 0 to 100
  const markerPosPct = Math.min(96, Math.max(4, Math.round(((currentFare - lowZone) / (peakZone - lowZone)) * 100)));

  const isExtreme = surgePct >= 20;
  const isHigh = surgePct >= 10 && surgePct < 20;
  const isLow = surgePct <= -5;

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Historical Price Position Spectrum ({currentRoute ? currentRoute.id : 'DEL → BOM'})
            </h3>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                isExtreme
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : isHigh
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : isLow
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {percentile}th Percentile ({isExtreme ? 'Extreme Surge' : isHigh ? 'Elevated' : isLow ? 'Deep Discount' : 'Normal Seasonal'})
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Current quote benchmarked against 365-day historical distribution for {travelDate}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-ink-muted block">Departure Quote</span>
          <span className={`text-lg font-extrabold tabular-nums ${isExtreme ? 'text-status-danger' : isHigh ? 'text-amber-600' : 'text-brand-700'}`}>
            <RupeeValue amount={currentFare} />
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
          <span className={`text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap ${isExtreme ? 'bg-rose-600' : isHigh ? 'bg-amber-600' : 'bg-brand-600'}`}>
            ₹{currentFare.toLocaleString('en-IN')} ({leadTime ? `${leadTime} • ${preset || 'Standard'}` : travelDate})
          </span>
          <div className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] ${isExtreme ? 'border-t-rose-600' : isHigh ? 'border-t-amber-600' : 'border-t-brand-600'}`} />
        </div>

        {/* The 4-segment spectrum track */}
        <div className="w-full h-3 rounded-full flex overflow-hidden bg-subtle">
          <div className="w-1/4 bg-emerald-500" title={`Low / Discount Zone: ₹${lowZone} - ₹${normalZone}`} />
          <div className="w-1/4 bg-slate-400" title={`Normal Seasonal Zone: ₹${normalZone} - ₹${highZone}`} />
          <div className="w-1/4 bg-amber-500" title={`High / Tight Zone: ₹${highZone} - ₹${extremeZone}`} />
          <div className="w-1/4 bg-rose-600" title={`Extreme Surge Zone: > ₹${extremeZone}`} />
        </div>

        {/* Labels under track */}
        <div className="flex justify-between text-[11px] font-bold text-ink-muted pt-2 tracking-wider uppercase">
          <span className="text-emerald-700">Low (₹{lowZone.toLocaleString('en-IN')})</span>
          <span className="text-slate-600">Normal (₹{normalZone.toLocaleString('en-IN')})</span>
          <span className="text-amber-700">High (₹{highZone.toLocaleString('en-IN')})</span>
          <span className="text-rose-700">Extreme (&gt;₹{extremeZone.toLocaleString('en-IN')})</span>
        </div>
      </div>

      <div className="pt-2 border-t border-border text-[11px] text-ink-muted flex items-center justify-between">
        <span>Historical minimum: <strong>₹{lowZone.toLocaleString('en-IN')}</strong></span>
        <span>Seasonal ceiling benchmark: <strong>₹{peakZone.toLocaleString('en-IN')}</strong></span>
        <span>Current percentile rank: <strong className={isExtreme ? 'text-rose-600' : 'text-brand-700'}>{percentile}%</strong></span>
      </div>
    </div>
  );
};
