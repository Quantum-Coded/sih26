import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { EVENT_FARE_OVERLAY_DATA } from '../../data/events';

export const EventFareOverlayChart: React.FC = () => {
  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Event Signal vs. Airfare Response Overlay (DEL-BOM Corridor)
            </h3>
            <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
              Temporal Lag: ~3.8h
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Synchronized overlay of operational disruption intensity against scraped route pricing
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
            Event signal &rarr; fare acceleration: ~3–6 hours
          </span>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={EVENT_FARE_OVERLAY_DATA} margin={{ top: 15, right: 15, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E6EA" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
            />
            {/* Left Y Axis for Fare (INR) */}
            <YAxis
              yAxisId="left"
              domain={[5500, 7800]}
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
              tickFormatter={(v) => `₹${v}`}
            />
            {/* Right Y Axis for Event Intensity Score (0 to 100) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const p = payload[0].payload;
                  return (
                    <div className="bg-surface border border-border p-3 rounded-lg shadow-xl text-xs space-y-1.5 min-w-[200px]">
                      <span className="font-bold text-ink-primary">{label}</span>
                      <div className="flex justify-between">
                        <span className="text-ink-muted">Event Intensity:</span>
                        <strong className="text-indigo-600 font-mono">{p.eventIntensity}%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink-muted">Scraped Airfare:</span>
                        <strong className="text-brand-700 font-mono">₹{p.fareMovement}</strong>
                      </div>
                      <div className="text-[10px] text-ink-secondary bg-subtle p-1 rounded mt-1 border border-border">
                        {p.annotation}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />

            {/* Event Intensity Bars on right axis */}
            <Bar
              yAxisId="right"
              dataKey="eventIntensity"
              name="Event Disruption Intensity (%)"
              fill="#E0E7FF"
              stroke="#818CF8"
              radius={[3, 3, 0, 0]}
              barSize={28}
            />

            {/* Route Fare Line on left axis */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="fareMovement"
              name="Observed Median Airfare (₹)"
              stroke="#1A3A6B"
              strokeWidth={2.8}
              dot={{ r: 4, fill: '#1A3A6B' }}
              activeDot={{ r: 6, fill: '#B82323' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="p-2.5 rounded bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-center justify-between">
        <span>
          <strong>MoSPI Analytical Protocol:</strong> Temporal and statistical association detected (R² = 0.71). Causality is not formal legal liability.
        </span>
        <span className="font-mono text-[10px] text-amber-800">
          Hypothesis: Supply capacity elasticity lag
        </span>
      </div>
    </div>
  );
};
