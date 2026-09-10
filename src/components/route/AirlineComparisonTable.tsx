import React from 'react';
import { RupeeValue } from '../common/RupeeValue';
import { useDemoMode } from '../../context/DemoModeContext';
import { RouteData } from '../../data/routes';

interface AirlineComparisonTableProps {
  route?: RouteData;
  leadTime?: string;
  preset?: string;
}

export const AirlineComparisonTable: React.FC<AirlineComparisonTableProps> = ({
  route: propRoute,
  leadTime = 'T+7',
  preset = 'Business',
}) => {
  const { currentRoute, travelDate } = useDemoMode();
  const route = propRoute || currentRoute;
  const currentFare = route ? route.currentFare : 7480;
  const surgePct = route ? route.surgePct : 28.4;
  const isSurging = surgePct >= 12;

  // Carrier spread multipliers based on empirical market positioning & traveler profile
  const carriers = [
    {
      code: '6E',
      name: 'IndiGo Airlines',
      flights: Math.round((route ? route.dailyQuotesCount : 840) * 0.44 / 15),
      mult: preset === 'Business' ? 0.98 : 0.94,
      availability: leadTime === 'T+1' ? 'Critical Seats' : isSurging ? 'Constrained' : 'Available',
      surgeAdd: -3.2,
    },
    {
      code: 'AI',
      name: 'Air India',
      flights: Math.round((route ? route.dailyQuotesCount : 840) * 0.26 / 15),
      mult: preset === 'Business' ? 1.06 : 1.02,
      availability: leadTime === 'T+1' ? 'Critical Seats' : isSurging ? 'Tight' : 'Available',
      surgeAdd: +4.1,
    },
    {
      code: 'UK',
      name: 'Vistara',
      flights: Math.round((route ? route.dailyQuotesCount : 840) * 0.16 / 15),
      mult: preset === 'Business' ? 1.11 : 1.05,
      availability: leadTime === 'T+1' ? 'Last Seats' : isSurging ? 'Critical Seats' : 'Moderate',
      surgeAdd: +7.5,
    },
    {
      code: 'QP',
      name: 'Akasa Air',
      flights: Math.round((route ? route.dailyQuotesCount : 840) * 0.08 / 15),
      mult: preset === 'Leisure' ? 0.89 : 0.92,
      availability: leadTime === 'T+1' ? 'Constrained' : 'Available',
      surgeAdd: -5.8,
    },
    {
      code: 'SG',
      name: 'SpiceJet',
      flights: Math.round((route ? route.dailyQuotesCount : 840) * 0.06 / 15),
      mult: preset === 'Leisure' ? 0.90 : 0.94,
      availability: leadTime === 'T+1' ? 'Tight' : 'Moderate',
      surgeAdd: -4.0,
    },
  ];

  const carrierQuotes = carriers.map((c) => {
    const medianFare = Math.round(currentFare * c.mult);
    const lowestFare = Math.round(medianFare * 0.91);
    const fareChange = Number((surgePct + c.surgeAdd).toFixed(1));

    // Statutory unbundling for each carrier
    const udfFee = 425;
    const convenienceFee = 350;
    const baseFare = Math.round((medianFare - udfFee - convenienceFee) / 1.05);
    const taxes = medianFare - baseFare - udfFee - convenienceFee;

    return {
      ...c,
      lowestFare,
      medianFare,
      fareChangePct: fareChange,
      baseFare,
      taxes,
      udfFee,
    };
  });

  const totalFlights = carrierQuotes.reduce((sum, c) => sum + c.flights, 0);

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm-subtle flex flex-col">
      <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between bg-white/70 gap-2">
        <div>
          <h3 className="text-sm font-bold text-ink-primary tracking-tight">
            Carrier-Wise Quote Distribution ({route ? route.id : 'DEL → BOM'})
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">
            Normalized quotes across 5 active carriers for <span className="font-semibold text-brand-700">{travelDate}</span> ({leadTime} window • {preset} profile)
          </p>
        </div>
        <span className="text-[11px] font-mono text-ink-muted">
          {totalFlights} Monitored Daily Flights
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
            {carrierQuotes.map((a) => (
              <tr key={a.code} className="hover:bg-subtle/40 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-slate-100 border border-slate-200 text-slate-800 font-mono font-bold text-[10px] flex items-center justify-center">
                      {a.code}
                    </span>
                    <span className="font-semibold text-ink-primary">{a.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 tabular-nums text-ink-secondary">
                  {a.flights} daily
                </td>
                <td className="py-3 px-3">
                  <RupeeValue amount={a.lowestFare} size="sm" />
                </td>
                <td className="py-3 px-3 font-bold text-ink-primary">
                  <RupeeValue amount={a.medianFare} size="sm" />
                </td>
                <td className={`py-3 px-3 font-bold tabular-nums ${a.fareChangePct > 0 ? 'text-status-danger' : 'text-emerald-600'}`}>
                  {a.fareChangePct > 0 ? `+${a.fareChangePct}%` : `${a.fareChangePct}%`}
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                      a.availability === 'Constrained' || a.availability === 'Critical Seats'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : a.availability === 'Tight'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {a.availability}
                  </span>
                </td>
                <td className="py-3 px-4 text-[11px] text-ink-muted font-mono">
                  Base: ₹{a.baseFare.toLocaleString('en-IN')} + Tax: ₹{a.taxes.toLocaleString('en-IN')} + Fees: ₹{a.udfFee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
