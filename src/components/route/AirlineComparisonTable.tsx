import React from 'react';
import { DEL_BOM_AIRLINE_QUOTES } from '../../data/fareHistory';
import { RupeeValue } from '../common/RupeeValue';

export const AirlineComparisonTable: React.FC = () => {
  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm-subtle flex flex-col">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-white/70">
        <div>
          <h3 className="text-sm font-bold text-ink-primary tracking-tight">
            Carrier-Wise Quote Distribution (DEL → BOM)
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">
            Normalized quotes across 5 active carriers captured for departure date
          </p>
        </div>
        <span className="text-[11px] font-mono text-ink-muted">
          51 Total Flights Monitored
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-subtle/80 text-[11px] font-semibold text-ink-muted uppercase tracking-wider border-b border-border">
            <tr>
              <th className="py-2.5 px-4">Carrier</th>
              <th className="py-2.5 px-3">Daily Flights</th>
              <th className="py-2.5 px-3">Lowest Fare</th>
              <th className="py-2.5 px-3">Median Fare</th>
              <th className="py-2.5 px-3">Fare Change</th>
              <th className="py-2.5 px-3">Seat Availability</th>
              <th className="py-2.5 px-4">Fare Breakdown</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {DEL_BOM_AIRLINE_QUOTES.map((a) => (
              <tr key={a.airlineCode} className="hover:bg-subtle/40 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-slate-100 border border-slate-200 text-slate-800 font-mono font-bold text-[10px] flex items-center justify-center">
                      {a.airlineCode}
                    </span>
                    <span className="font-semibold text-ink-primary">{a.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 tabular-nums text-ink-secondary">
                  {a.flightCount} daily
                </td>
                <td className="py-3 px-3">
                  <RupeeValue amount={a.lowestFare} size="sm" />
                </td>
                <td className="py-3 px-3 font-bold text-ink-primary">
                  <RupeeValue amount={a.medianFare} size="sm" />
                </td>
                <td className="py-3 px-3 font-bold text-status-danger tabular-nums">
                  +{a.fareChangePct}%
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                      a.availability === 'Constrained'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {a.availability}
                  </span>
                </td>
                <td className="py-3 px-4 text-[11px] text-ink-muted">
                  Base: ₹{a.baseFare} + Tax: ₹{a.taxes} + Fees: ₹{a.udfFee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
