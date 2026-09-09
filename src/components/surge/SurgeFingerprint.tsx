import React from 'react';
import { MUMBAI_SURGE_SCENARIO } from '../../data/demoScenario';
import { RouteData } from '../../data/routes';

interface SurgeFingerprintProps {
  route: RouteData;
}

export const SurgeFingerprint: React.FC<SurgeFingerprintProps> = ({ route }) => {
  const fp = MUMBAI_SURGE_SCENARIO.fingerprint;

  const factors = [
    { name: 'Price Momentum & Velocity', value: fp.priceMomentum, color: 'bg-rose-600', description: 'Intraday quote slope escalation across scrapers' },
    { name: 'Search Query Acceleration', value: fp.demand, color: 'bg-indigo-600', description: '+18.2% search query volume surge on OTAs' },
    { name: 'Adverse Weather Conditions', value: fp.weather, color: 'bg-amber-600', description: 'Crosswind gusts & thunderstorm radar cells' },
    { name: 'ATC Operational Disruptions', value: fp.operations, color: 'bg-orange-600', description: 'Runway calibration slot reduction & gate holds' },
    { name: 'Holiday & Weekend Calendar', value: fp.holiday, color: 'bg-emerald-600', description: 'Upcoming 3-day extended weekend leisure buffer' },
    { name: 'News & Media Spike', value: fp.news, color: 'bg-slate-500', description: 'Media reporting on cascading airport diversions' },
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Surge Fingerprint: {route.id}
            </h3>
            <span className="text-[10px] font-mono font-bold bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200">
              Signature Anomaly Attribution
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Proportional breakdown of multi-modal drivers generating abnormal yield pressure
          </p>
        </div>
        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded border border-rose-200 tabular-nums">
          +{route.surgePct}% Total Spike
        </span>
      </div>

      <div className="space-y-3">
        {factors.map((f) => (
          <div key={f.name} className="space-y-1 text-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-ink-primary">{f.name}</span>
              <span className="font-bold text-ink-primary font-mono tabular-nums">{f.value}%</span>
            </div>

            <div className="w-full bg-subtle rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${f.color}`}
                style={{ width: `${f.value * 2.8}%` }}
              />
            </div>

            <p className="text-[11px] text-ink-muted">{f.description}</p>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-ink-muted">
        <span>Confidence Index: <strong>87.4%</strong></span>
        <span>Driver Classification: <strong className="text-rose-600">Operational Shock + Demand Multiplier</strong></span>
      </div>
    </div>
  );
};
