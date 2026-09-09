import React from 'react';
import { FORECAST_SIGNALS } from '../../data/forecastData';

export const ExplainablePredictionBars: React.FC = () => {
  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Explainable ML Prediction: Factor Attributions
            </h3>
            <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
              SHAP / Feature Attribution
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Why is the model projecting continued upward airfare pressure over the T+7 horizon?
          </p>
        </div>
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-200 font-mono">
          7 Features Audited
        </span>
      </div>

      <div className="space-y-3.5">
        {FORECAST_SIGNALS.map((sig) => (
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
                style={{ width: `${sig.contributionPct * 2.8}%` }}
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
