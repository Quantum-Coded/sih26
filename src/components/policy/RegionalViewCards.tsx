import React from 'react';
import { REGIONAL_METRICS, MARKET_SEGMENTS } from '../../data/policyData';

export const RegionalViewCards: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 6 Macro Geographic Regions */}
      <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Macro-Regional Price Index Breakdown
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Regional airfare sub-indices for monetary policy transmission analysis
            </p>
          </div>
          <span className="text-xs font-semibold text-ink-muted">
            6 Zones Monitored
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {REGIONAL_METRICS.map((reg) => (
            <div
              key={reg.region}
              className="p-3.5 rounded-lg border border-border bg-white shadow-sm-subtle space-y-2 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <span className="font-bold text-xs text-ink-primary">{reg.region}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${
                  reg.changePct > 3 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {reg.changePct > 0 ? `+${reg.changePct}%` : `${reg.changePct}%`}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-[10px] text-ink-muted block">Regional APIx</span>
                  <span className="text-xl font-extrabold text-ink-primary font-mono tabular-nums">
                    {reg.apix}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-ink-muted block">Fare Pressure</span>
                  <span className="text-sm font-bold text-amber-700 font-mono">
                    {reg.farePressure}/100
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-border text-[11px] text-ink-muted flex items-center justify-between">
                <span>Top Surge: <strong className="text-ink-primary">{reg.topSurgingRoute}</strong></span>
                <span>Vol: <strong className="text-slate-600">{reg.volatility30d}%</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Segments */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm-subtle flex flex-col">
        <div className="px-5 py-3.5 border-b border-border bg-white/70">
          <h3 className="text-sm font-bold text-ink-primary tracking-tight">
            Market Segment Elasticity & Passenger-Km Share
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">
            Econometric segmentation across business metros, leisure corridors, and regional feeder routes
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-subtle/80 text-[11px] font-semibold text-ink-muted uppercase tracking-wider border-b border-border">
              <tr>
                <th className="py-2.5 px-4">Segment</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Segment APIx</th>
                <th className="py-2.5 px-3">Average Fare</th>
                <th className="py-2.5 px-3">Surge %</th>
                <th className="py-2.5 px-3">Elasticity</th>
                <th className="py-2.5 px-4 text-right">RPK Share (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MARKET_SEGMENTS.map((seg) => (
                <tr key={seg.segment} className="hover:bg-subtle/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-ink-primary font-mono">
                    {seg.segment}
                  </td>
                  <td className="py-3 px-3 text-ink-secondary text-[11px]">
                    {seg.description}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-brand-700">
                    {seg.apix}
                  </td>
                  <td className="py-3 px-3 tabular-nums font-semibold text-ink-primary">
                    ₹{seg.avgFare.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3 font-bold text-status-danger tabular-nums">
                    +{seg.surgePct}%
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      {seg.elasticity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-ink-primary">
                    {seg.shareOfPassengerKm}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
