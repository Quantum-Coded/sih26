import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import {
  NATIONAL_APIX_7D,
  NATIONAL_APIX_30D,
  NATIONAL_APIX_90D
} from '../../data/fareHistory';
import clsx from 'clsx';

export const MarketMovementChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('30D');

  const chartData = {
    '7D': NATIONAL_APIX_7D,
    '30D': NATIONAL_APIX_30D,
    '90D': NATIONAL_APIX_90D
  }[timeRange];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-surface border border-border p-3 rounded-lg shadow-xl text-xs space-y-1.5 min-w-[190px]">
          <div className="flex items-center justify-between border-b border-border pb-1">
            <span className="font-semibold text-ink-primary">{label}</span>
            {point.isAnomaly && (
              <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">
                ANOMALY
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink-muted">India APIx Level:</span>
            <span className="font-bold text-brand-700 text-sm tabular-nums font-mono">
              {point.apix}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink-muted">Historical Baseline:</span>
            <span className="font-semibold text-slate-500 tabular-nums font-mono">
              {point.baseline}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink-muted">Deviation:</span>
            <span className="font-bold text-rose-600 tabular-nums">
              +{((point.apix - point.baseline) / point.baseline * 100).toFixed(1)}%
            </span>
          </div>
          {point.notes && (
            <div className="text-[10px] text-ink-secondary bg-subtle p-1.5 rounded mt-1 border border-border/60">
              {point.notes}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle">
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              India Airfare Price Index (APIx) — Temporal Trend
            </h3>
            <span className="text-[10px] font-mono font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-200">
              Base 2024 = 100
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Composite Laspeyres index tracking representative 25 DGCA passenger sectors
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Legend */}
          <div className="hidden md:flex items-center gap-4 text-xs text-ink-muted mr-3">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-brand-600" />
              APIx Real-Time
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-slate-400 stroke-dashed" />
              Seasonal Baseline
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/20 border border-rose-500/40" />
              Surge Anomaly Band
            </span>
          </div>

          {/* Time range switcher */}
          <div className="inline-flex rounded-md bg-subtle p-0.5 border border-border text-xs">
            {(['7D', '30D', '90D'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={clsx(
                  'px-2.5 py-1 rounded text-xs font-semibold transition-all',
                  timeRange === r
                    ? 'bg-surface text-brand-700 shadow-sm'
                    : 'text-ink-muted hover:text-ink-primary'
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="apixGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1A3A6B" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#1A3A6B" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E6EA" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
            />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fontSize: 11, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={105.0} stroke="#94A3B8" strokeDasharray="4 4" label={{ value: 'Baseline', position: 'right', fill: '#94A3B8', fontSize: 10 }} />
            <Area
              type="monotone"
              dataKey="baseline"
              stroke="#94A3B8"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="transparent"
            />
            <Area
              type="monotone"
              dataKey="apix"
              stroke="#1A3A6B"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#apixGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex flex-wrap items-center justify-between text-xs text-ink-muted">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Latest Quote Ingestion: <strong>1,284 quotes</strong> within 15 min</span>
        </div>
        <span>Next Scheduled Index Recalculation: <strong>15:00 IST</strong></span>
      </div>
    </div>
  );
};
