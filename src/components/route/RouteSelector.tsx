import React from 'react';
import { ROUTES } from '../../data/routes';
import { AIRPORTS } from '../../data/airports';
import { Plane, Calendar, Filter, Sparkles } from 'lucide-react';

interface RouteSelectorProps {
  selectedRouteId: string;
  onRouteChange: (routeId: string) => void;
  selectedLeadTime: string;
  onLeadTimeChange: (lt: string) => void;
  selectedPreset: string;
  onPresetChange: (preset: string) => void;
}

export const RouteSelector: React.FC<RouteSelectorProps> = ({
  selectedRouteId,
  onRouteChange,
  selectedLeadTime,
  onLeadTimeChange,
  selectedPreset,
  onPresetChange
}) => {
  const currentRoute = ROUTES.find(r => r.id === selectedRouteId) || ROUTES[0];

  const leadTimes = ['T+1', 'T+7', 'T+15', 'T+30', 'T+45'];
  const presets = ['Business', 'Leisure', 'Weekend'];

  return (
    <div className="bg-surface rounded-lg border border-border p-4 shadow-sm-subtle space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Route Dropdown Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">Sector:</span>
            <select
              value={selectedRouteId}
              onChange={(e) => onRouteChange(e.target.value)}
              className="bg-subtle border border-border rounded-md px-3 py-1.5 text-xs font-bold text-ink-primary focus:outline-none focus:border-brand-600 shadow-sm"
            >
              {ROUTES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.origin} ({AIRPORTS[r.origin]?.city}) → {r.destination} ({AIRPORTS[r.destination]?.city}) — {r.category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-ink-secondary bg-subtle px-2.5 py-1.5 rounded-md border border-border">
            <Calendar className="w-3.5 h-3.5 text-ink-muted" />
            <span>Departure: <strong>16 Sep 2026</strong></span>
          </div>
        </div>

        {/* Lead-Time Filter Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">Lead Time:</span>
          <div className="inline-flex rounded-md bg-subtle p-0.5 border border-border">
            {leadTimes.map((lt) => (
              <button
                key={lt}
                onClick={() => onLeadTimeChange(lt)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  selectedLeadTime === lt
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
              >
                {lt}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Profiles */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">Profile:</span>
          <div className="inline-flex rounded-md bg-subtle p-0.5 border border-border">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => onPresetChange(p)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  selectedPreset === p
                    ? 'bg-surface text-brand-700 shadow-sm font-semibold'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
