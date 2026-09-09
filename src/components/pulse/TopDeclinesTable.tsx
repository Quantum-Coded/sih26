import React from 'react';
import { ROUTES } from '../../data/routes';
import { RupeeValue } from '../common/RupeeValue';
import { useNavigate } from 'react-router-dom';
import { useDemoMode } from '../../context/DemoModeContext';
import { TrendingDown, ArrowRight } from 'lucide-react';

export const TopDeclinesTable: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedRouteId, routes } = useDemoMode();

  // Top falling / stable routes sorted by lowest surgePct
  const declines = [...routes].sort((a, b) => a.surgePct - b.surgePct).slice(0, 5);

  const handleRouteSelect = (routeId: string) => {
    setSelectedRouteId(routeId);
    navigate(`/route?id=${routeId}`);
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm-subtle flex flex-col">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-white/70">
        <div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-status-positive" />
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Top Price Declines & Healthy Sectors
            </h3>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Sectors with falling fares due to capacity expansion or railway competition
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-subtle/80 text-[11px] font-semibold text-ink-muted uppercase tracking-wider border-b border-border">
            <tr>
              <th className="py-2.5 px-4">#</th>
              <th className="py-2.5 px-3">Route</th>
              <th className="py-2.5 px-3">Current Fare</th>
              <th className="py-2.5 px-3">Baseline</th>
              <th className="py-2.5 px-3">Change %</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Primary Driver</th>
              <th className="py-2.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {declines.map((r, idx) => (
              <tr
                key={r.id}
                onClick={() => handleRouteSelect(r.id)}
                className="hover:bg-emerald-50/40 cursor-pointer transition-colors group"
              >
                <td className="py-2.5 px-4 font-mono font-bold text-ink-muted">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 font-bold text-ink-primary font-mono group-hover:text-status-positive">
                  {r.origin} → {r.destination}
                </td>
                <td className="py-2.5 px-3">
                  <RupeeValue amount={r.currentFare} size="sm" />
                </td>
                <td className="py-2.5 px-3 text-ink-muted">
                  <RupeeValue amount={r.baselineFare} size="sm" />
                </td>
                <td className="py-2.5 px-3 font-bold text-status-positive tabular-nums">
                  {r.surgePct}%
                </td>
                <td className="py-2.5 px-3">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Discounted
                  </span>
                </td>
                <td className="py-2.5 px-3 text-[11px] text-ink-secondary truncate max-w-[160px]">
                  {r.primaryDriver}
                </td>
                <td className="py-2.5 px-4 text-right">
                  <span className="text-emerald-600 group-hover:translate-x-0.5 transition-transform inline-block">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
