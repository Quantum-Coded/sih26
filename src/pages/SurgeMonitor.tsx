import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { ROUTES } from '../data/routes';
import { RupeeValue } from '../components/common/RupeeValue';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { SurgeFingerprint } from '../components/surge/SurgeFingerprint';
import { SurgePropagationGraph } from '../components/surge/SurgePropagationGraph';
import { SurgeOnsetChart } from '../components/surge/SurgeOnsetChart';
import { useDemoMode } from '../context/DemoModeContext';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Search, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export const SurgeMonitor: React.FC = () => {
  const { selectedRouteId, setSelectedRouteId } = useDemoMode();
  const navigate = useNavigate();

  const [severityFilter, setSeverityFilter] = useState<'All' | 'Elevated' | 'High' | 'Extreme'>('All');
  const [minSurge, setMinSurge] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const activeRoute = ROUTES.find(r => r.id === selectedRouteId) || ROUTES[0];

  // Filter routes under surge
  const surgingRoutes = ROUTES.filter(r => {
    if (r.surgePct < minSurge) return false;
    if (searchTerm && !r.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (severityFilter === 'Extreme') return r.surgePct >= 25;
    if (severityFilter === 'High') return r.surgePct >= 15 && r.surgePct < 25;
    if (severityFilter === 'Elevated') return r.surgePct >= 5 && r.surgePct < 15;
    return true;
  }).sort((a, b) => b.surgePct - a.surgePct);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SectionHeader
        title="Surge Anomaly Monitor"
        subtitle="Algorithmic early-warning system identifying statistical price spikes before they become market-wide inflation shocks."
        badge={
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            14 Active Surge Sectors Detected
          </span>
        }
      />

      {/* Controls & Filter Bar */}
      <div className="bg-surface rounded-lg border border-border p-4 shadow-sm-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Severity Tabs */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">Severity:</span>
          <div className="inline-flex rounded-md bg-subtle p-0.5 border border-border text-xs">
            {(['All', 'Elevated', 'High', 'Extreme'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={clsx(
                  'px-3 py-1 rounded text-xs font-semibold transition-all',
                  severityFilter === sev
                    ? 'bg-surface text-brand-700 shadow-sm'
                    : 'text-ink-muted hover:text-ink-primary'
                )}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Min Surge Threshold */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-subtle border border-border rounded-md px-2.5 py-1.5 text-xs">
            <Search className="w-3.5 h-3.5 text-ink-muted" />
            <input
              type="text"
              placeholder="Search route (e.g. BOM)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none w-36"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-ink-secondary bg-subtle border border-border px-2.5 py-1.5 rounded-md">
            <span>Min Surge:</span>
            <select
              value={minSurge}
              onChange={(e) => setMinSurge(Number(e.target.value))}
              className="bg-transparent font-bold text-ink-primary focus:outline-none cursor-pointer"
            >
              <option value={5}>&gt; +5%</option>
              <option value={10}>&gt; +10%</option>
              <option value={15}>&gt; +15%</option>
              <option value={20}>&gt; +20%</option>
              <option value={25}>&gt; +25%</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Surge Surveillance Table */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm-subtle flex flex-col">
        <div className="px-5 py-3.5 border-b border-border flex items-center justify-between bg-white/80">
          <span className="text-xs font-bold text-ink-primary tracking-tight">
            Active Anomaly Surveillance Queue ({surgingRoutes.length} matching routes)
          </span>
          <span className="text-[11px] text-ink-muted">
            Click any row to inspect fingerprint & network propagation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-subtle/80 text-[11px] font-semibold text-ink-muted uppercase tracking-wider border-b border-border">
              <tr>
                <th className="py-2.5 px-4">Route</th>
                <th className="py-2.5 px-3">Current Fare</th>
                <th className="py-2.5 px-3">Baseline</th>
                <th className="py-2.5 px-3">Surge %</th>
                <th className="py-2.5 px-3">Z-Score</th>
                <th className="py-2.5 px-3">Onset Time</th>
                <th className="py-2.5 px-3">Pressure</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3">Possible Driver</th>
                <th className="py-2.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {surgingRoutes.map((r) => {
                const isSelected = r.id === selectedRouteId;
                return (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedRouteId(r.id)}
                    className={clsx(
                      'cursor-pointer transition-colors',
                      isSelected ? 'bg-brand-50/80 font-medium' : 'hover:bg-subtle/50'
                    )}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-ink-primary flex items-center gap-2">
                      <span className={clsx('w-2 h-2 rounded-full', isSelected ? 'bg-brand-700' : 'bg-rose-500')} />
                      {r.id}
                    </td>
                    <td className="py-3 px-3 font-bold text-ink-primary">
                      <RupeeValue amount={r.currentFare} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-ink-muted">
                      <RupeeValue amount={r.baselineFare} size="sm" />
                    </td>
                    <td className="py-3 px-3 font-bold text-status-danger tabular-nums">
                      +{r.surgePct}%
                    </td>
                    <td className="py-3 px-3 font-mono text-xs font-semibold text-rose-700">
                      +{r.zScore}σ
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-ink-secondary">
                      {r.id === 'DEL-BOM' ? '08:30 IST' : '10:15 IST'}
                    </td>
                    <td className="py-3 px-3">
                      <SeverityBadge
                        level={r.pressureScore >= 80 ? 'Extreme' : r.pressureScore >= 65 ? 'High' : 'Elevated'}
                        size="sm"
                      />
                    </td>
                    <td className="py-3 px-3 text-ink-secondary font-medium">
                      {r.confidence}
                    </td>
                    <td className="py-3 px-3 text-ink-secondary text-[11px] truncate max-w-[180px]">
                      {r.primaryDriver}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRouteId(r.id);
                          navigate(`/route?id=${r.id}`);
                        }}
                        className="text-brand-700 hover:text-brand-900 font-semibold inline-flex items-center gap-1 text-[11px]"
                      >
                        <span>Deep Dive</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Route Deep-Dive Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <SurgeFingerprint route={activeRoute} />
        </div>
        <div className="lg:col-span-6 space-y-6">
          <SurgeOnsetChart />
        </div>
      </div>

      {/* Hub Contagion Network Propagation */}
      <SurgePropagationGraph />
    </div>
  );
};
