import React from 'react';
import { useDemoMode } from '../../context/DemoModeContext';

export const ExplainablePredictionBars: React.FC = () => {
  const { currentRoute, travelDate, nationalKpis } = useDemoMode();

  const route = currentRoute;
  const leadDays = nationalKpis.leadDays;
  const surgePct = route ? route.surgePct : 28.4;

  const signals = [
    {
      id: 'sig-1',
      name: 'Lead-Time Decay Tier',
      category: 'Temporal',
      value: `T+${leadDays} Window (${travelDate})`,
      contributionPct: leadDays <= 3 ? 38 : leadDays <= 7 ? 31 : 18,
      weightPct: 28,
      description: `Target departure falls into T+${leadDays} advance window with steep corporate demand inelasticity.`,
    },
    {
      id: 'sig-2',
      name: 'Intraday Fare Momentum',
      category: 'Price Action',
      value: `${surgePct > 0 ? `+${surgePct}%` : `${surgePct}%`} velocity`,
      contributionPct: Math.min(35, Math.max(10, Math.round(surgePct * 0.85))),
      weightPct: 22,
      description: 'Persistent positive velocity across multiple OTA scrapers indicates algorithmic tier escalation.',
    },
    {
      id: 'sig-3',
      name: 'Search Interest Acceleration',
      category: 'Demand',
      value: '+18.2% vs 7D Avg',
      contributionPct: 18,
      weightPct: 18,
      description: 'Spike in flight queries following rebooking activity across alternative travel modes.',
    },
    {
      id: 'sig-4',
      name: 'Coastal Weather Warning',
      category: 'Environment',
      value: 'Squall Line (IMD Orange)',
      contributionPct: 11,
      weightPct: 12,
      description: 'Reduced airport acceptance rate at destination limits available arrival slots, suppressing seat inventory.',
    },
    {
      id: 'sig-5',
      name: 'Holiday Proximity',
      category: 'Calendar',
      value: nationalKpis.isWeekend ? 'Weekend Departure Peak' : 'Midweek Standard',
      contributionPct: nationalKpis.isWeekend ? 14 : 7,
      weightPct: 10,
      description: 'Overlap with regional leisure dates creates baseline demand floor underneath business pricing.',
    },
    {
      id: 'sig-6',
      name: 'ATC Delay Propagation',
      category: 'Operations',
      value: '26% outbound delay',
      contributionPct: 7,
      weightPct: 8,
      description: 'Cascading turnaround delays reduce effective aircraft availability across return legs.',
    },
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-3 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Explainable ML Prediction: Factor Attributions ({route ? route.id : 'DEL → BOM'})
            </h3>
            <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
              SHAP / Feature Attribution
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Model factor attribution driving projected pricing pressure for departure date <span className="font-semibold text-brand-700">{travelDate}</span>
          </p>
        </div>
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-200 font-mono self-start sm:self-auto">
          6 Features Audited
        </span>
      </div>

      <div className="space-y-3.5">
        {signals.map((sig) => (
          <div key={sig.id} className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-ink-primary">{sig.name}</span>
                <span className="text-[11px] text-ink-muted ml-2">({sig.category}: {sig.value})</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-ink-muted">Weight: {sig.weightPct}%</span>
                <span className="font-bold text-brand-700 font-mono tabular-nums bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100">
                  +{sig.contributionPct}%
                </span>
              </div>
            </div>

            <div className="w-full bg-subtle rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-600 to-indigo-600 h-2 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, sig.contributionPct * 2.6)}%` }}
              />
            </div>

            <p className="text-[11px] text-ink-secondary">{sig.description}</p>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-ink-muted">
        <span>Model Framework: <strong>Gradient Boosted Trees + Bayesian Structural Time Series</strong></span>
        <span>Validation R²: <strong>0.884 (ex-post test)</strong></span>
      </div>
    </div>
  );
};
