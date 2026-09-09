import React from 'react';
import { ROUTES } from '../../data/routes';
import { RupeeValue } from '../common/RupeeValue';
import { SeverityBadge } from '../common/SeverityBadge';
import { useNavigate } from 'react-router-dom';
import { useDemoMode } from '../../context/DemoModeContext';
import { TrendingUp, ArrowRight } from 'lucide-react';

export const TopSurgesTable: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedRouteId } = useDemoMode();

  // Top 5 surging routes sorted by surgePct
  const surges = [...ROUTES].sort((a, b) => b.surgePct - a.surgePct).slice(0, 5);

  const handleRouteSelect = (routeId: string) => {
    setSelectedRouteId(routeId);
    navigate(`/route?id=${routeId}`);
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm-subtle flex flex-col">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-white/70">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-status-danger" />
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Top Surging Routes
            </h3>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Sectors with highest statistical price acceleration above baseline
          </p>
        </div>
        <button
          onClick={() => navigate('/surges')}
          className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1"
        >
          <span>View All 14</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-subtle/80 text-[11px] font-semibold text-ink-muted uppercase tracking-wider border-b border-border">
            <tr>
              <th className="py-2.5 px-4">#</th>
              <th className="py-2.5 px-3">Route</th>
              <th className="py-2.5 px-3">Current Fare</th>
              <th className="py-2.5 px-3">Baseline</th>
              <th className="py-2.5 px-3">Surge %</th>
              <th className="py-2.5 px-3">Pressure</th>
              <th className="py-2.5 px-3">Primary Driver</th>
              <th className="py-2.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {surges.map((r, idx) => (
              <tr
                key={r.id}
                onClick={() => handleRouteSelect(r.id)}
                className="hover:bg-brand-50/50 cursor-pointer transition-colors group"
              >
                <td className="py-2.5 px-4 font-mono font-bold text-ink-muted">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 font-bold text-ink-primary font-mono group-hover:text-brand-700">
                  {r.origin} → {r.destination}
                </td>
                <td className="py-2.5 px-3">
                  <RupeeValue amount={r.currentFare} size="sm" />
                </td>
                <td className="py-2.5 px-3 text-ink-muted">
                  <RupeeValue amount={r.baselineFare} size="sm" />
                </td>
                <td className="py-2.5 px-3 font-bold text-status-danger tabular-nums">
                  +{r.surgePct}%
                </td>
                <td className="py-2.5 px-3">
                  <SeverityBadge
                    level={r.pressureScore >= 80 ? 'Extreme' : r.pressureScore >= 65 ? 'High' : 'Elevated'}
                    size="sm"
                  />
                </td>
                <td className="py-2.5 px-3 text-[11px] text-ink-secondary truncate max-w-[160px]">
                  {r.primaryDriver}
                </td>
                <td className="py-2.5 px-4 text-right">
                  <span className="text-brand-600 group-hover:translate-x-0.5 transition-transform inline-block">
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
