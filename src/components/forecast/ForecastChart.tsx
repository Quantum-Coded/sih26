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
import { useDemoMode } from '../../context/DemoModeContext';

export const ForecastChart: React.FC = () => {
  const { currentRoute, travelDate, nationalKpis } = useDemoMode();
  const [horizon, setHorizon] = useState<'24h' | '3D' | '7D'>('7D');

  const route = currentRoute;
  const currentFare = route ? route.currentFare : 7480;
  const baselineFare = route ? route.baselineFare : 5825;
  const surgePct = route ? route.surgePct : 28.4;
  const leadDays = nationalKpis.leadDays;

  // Generate dynamic time points anchored to the selected travelDate
  const targetDateObj = new Date(travelDate);
  const formatDateLabel = (d: Date) =>
    `${d.getDate().toString().padStart(2, '0')} ${d.toLocaleString('en-US', { month: 'short' })}`;

  // Historical points before selected date
  const dMinus3 = new Date(targetDateObj); dMinus3.setDate(dMinus3.getDate() - 3);
  const dMinus2 = new Date(targetDateObj); dMinus2.setDate(dMinus2.getDate() - 2);
  const dMinus1 = new Date(targetDateObj); dMinus1.setDate(dMinus1.getDate() - 1);
  const d0 = targetDateObj;

  // Future projection points
  const dPlus1 = new Date(targetDateObj); dPlus1.setDate(dPlus1.getDate() + 1);
  const dPlus2 = new Date(targetDateObj); dPlus2.setDate(dPlus2.getDate() + 2);
  const dPlus3 = new Date(targetDateObj); dPlus3.setDate(dPlus3.getDate() + 3);
  const dPlus4 = new Date(targetDateObj); dPlus4.setDate(dPlus4.getDate() + 4);
  const dPlus5 = new Date(targetDateObj); dPlus5.setDate(dPlus5.getDate() + 5);
  const dPlus6 = new Date(targetDateObj); dPlus6.setDate(dPlus6.getDate() + 6);
  const dPlus7 = new Date(targetDateObj); dPlus7.setDate(dPlus7.getDate() + 7);

  const scale = currentFare / 7480;

  const fullData = [
    { timeLabel: formatDateLabel(dMinus3), historicalFare: Math.round(6680 * scale), isActual: true },
    { timeLabel: formatDateLabel(dMinus2), historicalFare: Math.round(7050 * scale), isActual: true },
    { timeLabel: formatDateLabel(dMinus1), historicalFare: Math.round(7240 * scale), isActual: true },
    {
      timeLabel: `${formatDateLabel(d0)} (T+${leadDays})`,
      historicalFare: currentFare,
      predictedFare: currentFare,
      lowerConfidence: currentFare,
      upperConfidence: currentFare,
      isActual: true,
    },
    {
      timeLabel: `${formatDateLabel(dPlus1)} (+1d)`,
      predictedFare: Math.round(currentFare * 1.01),
      lowerConfidence: Math.round(currentFare * 0.98),
      upperConfidence: Math.round(currentFare * 1.04),
      isActual: false,
    },
    {
      timeLabel: `${formatDateLabel(dPlus2)} (+2d)`,
      predictedFare: Math.round(currentFare * 1.015),
      lowerConfidence: Math.round(currentFare * 0.975),
      upperConfidence: Math.round(currentFare * 1.05),
      isActual: false,
    },
    {
      timeLabel: `${formatDateLabel(dPlus3)} (+3d)`,
      predictedFare: Math.round(currentFare * 0.995),
      lowerConfidence: Math.round(currentFare * 0.95),
      upperConfidence: Math.round(currentFare * 1.04),
      isActual: false,
    },
    {
      timeLabel: `${formatDateLabel(dPlus4)} (+4d)`,
      predictedFare: Math.round(currentFare * 0.98),
      lowerConfidence: Math.round(currentFare * 0.93),
      upperConfidence: Math.round(currentFare * 1.03),
      isActual: false,
    },
    {
      timeLabel: `${formatDateLabel(dPlus5)} (+5d)`,
      predictedFare: Math.round(currentFare * 0.965),
      lowerConfidence: Math.round(currentFare * 0.91),
      upperConfidence: Math.round(currentFare * 1.02),
      isActual: false,
    },
    {
      timeLabel: `${formatDateLabel(dPlus6)} (+6d)`,
      predictedFare: Math.round(currentFare * 0.955),
      lowerConfidence: Math.round(currentFare * 0.90),
      upperConfidence: Math.round(currentFare * 1.01),
      isActual: false,
    },
    {
      timeLabel: `${formatDateLabel(dPlus7)} (+7d)`,
      predictedFare: Math.round(currentFare * 0.975),
      lowerConfidence: Math.round(currentFare * 0.92),
      upperConfidence: Math.round(currentFare * 1.03),
      isActual: false,
    },
  ];

  // Filter based on horizon
  const data = horizon === '24h'
    ? fullData.slice(2, 5)
    : horizon === '3D'
    ? fullData.slice(1, 7)
    : fullData;

  const minFare = Math.floor(Math.min(...data.map(d => d.lowerConfidence || d.historicalFare || 99999)) * 0.94 / 100) * 100;
  const maxFare = Math.ceil(Math.max(...data.map(d => d.upperConfidence || d.historicalFare || 0)) * 1.06 / 100) * 100;

  const surgeProb = Math.min(96, Math.max(12, Math.round(50 + surgePct * 1.5)));
  const todayLabel = `${formatDateLabel(d0)} (T+${leadDays})`;

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Historical Observed vs. Projected Airfare Trajectory ({route ? route.id : 'DEL → BOM'})
            </h3>
            <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
              Confidence: High ({surgeProb}% Surge Prob)
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Bayesian time-series projection with 90% confidence interval for departure date {travelDate}
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
                className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
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
              domain={[minFare, maxFare]}
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
              tickFormatter={(v) => `₹${v.toLocaleString('en-IN')}`}
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
                          <span className="text-ink-muted">Observed Scrape:</span>
                          <strong className="text-brand-700 font-mono">₹{p.historicalFare.toLocaleString('en-IN')}</strong>
                        </div>
                      )}
                      {p.predictedFare && (
                        <div className="flex justify-between">
                          <span className="text-ink-muted">ML Forecast:</span>
                          <strong className="text-indigo-700 font-mono">₹{p.predictedFare.toLocaleString('en-IN')}</strong>
                        </div>
                      )}
                      {p.lowerConfidence && (
                        <div className="text-[10px] text-ink-muted pt-1 border-t border-border">
                          Confidence Band: ₹{p.lowerConfidence.toLocaleString('en-IN')} – ₹{p.upperConfidence.toLocaleString('en-IN')}
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
              x={todayLabel}
              stroke="#64748B"
              strokeDasharray="4 4"
              label={{ value: `${travelDate} (Selected)`, position: 'top', fill: '#1A3A6B', fontSize: 10, fontWeight: 'bold' }}
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
        <span>Current Quote: <strong>₹{currentFare.toLocaleString('en-IN')}</strong> &bull; Target Horizon Projection: <strong>₹{Math.round(currentFare * 0.98).toLocaleString('en-IN')} (±₹{Math.round(currentFare * 0.035)})</strong></span>
        <span>Forecast Direction: <strong className="text-indigo-700">{surgePct >= 15 ? 'Elevated Plateau Followed by Normalization' : 'Stable Seasonal Range'}</strong></span>
      </div>
    </div>
  );
};
