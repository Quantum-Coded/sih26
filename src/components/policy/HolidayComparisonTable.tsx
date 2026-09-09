import React from 'react';
import { HOLIDAY_COMPARISONS } from '../../data/policyData';

export const HolidayComparisonTable: React.FC = () => {
  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm-subtle flex flex-col">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-white/70">
        <div>
          <h3 className="text-sm font-bold text-ink-primary tracking-tight">
            Festive Period Airfare Multipliers & Surge Duration
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">
            Historical benchmarking of major Indian holidays on travel demand elasticity
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-subtle/80 text-[11px] font-semibold text-ink-muted uppercase tracking-wider border-b border-border">
            <tr>
              <th className="py-2.5 px-4">Festival / Event</th>
              <th className="py-2.5 px-3">Observation Period</th>
              <th className="py-2.5 px-3">Peak APIx</th>
              <th className="py-2.5 px-3">Surge Duration</th>
              <th className="py-2.5 px-3">Fare Multiplier</th>
              <th className="py-2.5 px-4">Epicenter Sector</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {HOLIDAY_COMPARISONS.map((h) => (
              <tr key={h.festival} className="hover:bg-subtle/40 transition-colors">
                <td className="py-3 px-4 font-bold text-ink-primary">
                  {h.festival}
                </td>
                <td className="py-3 px-3 text-ink-muted font-mono">
                  {h.period}
                </td>
                <td className="py-3 px-3 font-mono font-bold text-rose-700">
                  {h.peakIndex}
                </td>
                <td className="py-3 px-3 text-ink-secondary">
                  {h.surgeDurationDays} days
                </td>
                <td className="py-3 px-3 font-bold text-brand-700 font-mono">
                  {h.avgFareMultiplier}x
                </td>
                <td className="py-3 px-4 font-mono font-semibold text-ink-primary">
                  {h.mostImpactedSector}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
