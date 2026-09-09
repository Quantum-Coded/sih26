import React, { useState } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { DEL_BOM_7D_FORECAST } from '../../data/forecastData';

export const ForecastChart: React.FC = () => {
  const [horizon, setHorizon] = useState<'24h' | '3D' | '7D'>('7D');

  const data = DEL_BOM_7D_FORECAST;

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Historical Observed vs. Projected Airfare Trajectory (DEL → BOM)
            </h3>
            <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
              Confidence: High (78% Surge Prob)
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Bayesian time-series projection with 90% confidence interval across the 7-day departure window
          </p>
        </div>

        {/* Horizon Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">Horizon:</span>
          <div className="inline-flex rounded-md bg-subtle p-0.5 border border-border text-xs">
            {(['24h', '3D', '7D'] as const).map((h) => (
              <button
                key={h}
                onClick={() => setHorizon(h)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  horizon === h
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 15, right: 15, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E6EA" />
            <XAxis
              dataKey="timeLabel"
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
            />
            <YAxis
              domain={[6500, 8100]}
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const p = payload[0].payload;
                  return (
                    <div className="bg-surface border border-border p-3 rounded-lg shadow-xl text-xs space-y-1 min-w-[190px]">
                      <span className="font-bold text-ink-primary">{label}</span>
                      {p.historicalFare && (
                        <div className="flex justify-between">
                          <span className="text-ink-muted">Historical Scrape:</span>
                          <strong className="text-brand-700 font-mono">₹{p.historicalFare}</strong>
                        </div>
                      )}
                      {p.predictedFare && (
                        <div className="flex justify-between">
                          <span className="text-ink-muted">ML Forecast:</span>
                          <strong className="text-indigo-700 font-mono">₹{p.predictedFare}</strong>
                        </div>
                      )}
                      {p.lowerConfidence && (
                        <div className="text-[10px] text-ink-muted pt-1 border-t border-border">
                          Confidence Band: ₹{p.lowerConfidence} – ₹{p.upperConfidence}
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Vertical boundary separating historical actual from projected future */}
            <ReferenceLine
              x="09 Sep (Now)"
              stroke="#64748B"
              strokeDasharray="4 4"
              label={{ value: 'Today (Scraped Baseline)', position: 'top', fill: '#1A3A6B', fontSize: 10, fontWeight: 'bold' }}
            />

            {/* Shaded confidence interval band */}
            <Area
              type="monotone"
              dataKey="upperConfidence"
              stroke="transparent"
              fill="#EEF2FF"
              fillOpacity={0.8}
            />

            {/* Historical Actual Line */}
            <Line
              type="monotone"
              dataKey="historicalFare"
              stroke="#1A3A6B"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#1A3A6B' }}
            />

            {/* Projected Future Line */}
            <Line
              type="monotone"
              dataKey="predictedFare"
              stroke="#6366F1"
              strokeWidth={2.5}
              strokeDasharray="4 4"
              dot={{ r: 4, fill: '#6366F1' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-ink-muted">
        <span>Current Quote: <strong>₹7,480</strong> &bull; 7-Day Target Projection: <strong>₹7,350 (&plusmn;₹220)</strong></span>
        <span>Forecast Direction: <strong className="text-indigo-700">Elevated Plateaux Followed by Normalization</strong></span>
      </div>
    </div>
  );
};
