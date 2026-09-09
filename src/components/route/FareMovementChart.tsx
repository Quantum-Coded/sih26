import React from 'react';
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
import { DEL_BOM_30D_HISTORY } from '../../data/fareHistory';

interface FareMovementChartProps {
  routeId: string;
}

export const FareMovementChart: React.FC<FareMovementChartProps> = ({ routeId }) => {
  const data = DEL_BOM_30D_HISTORY;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-surface border border-border p-3.5 rounded-lg shadow-xl text-xs space-y-1.5 min-w-[210px]">
          <div className="flex items-center justify-between border-b border-border pb-1">
            <span className="font-bold text-ink-primary">{label}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-subtle text-ink-muted">
              T+7 Lead Time
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-ink-muted">Scraped Median Fare:</span>
            <span className="font-bold text-brand-700 text-sm tabular-nums">
              ₹{point.fare?.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-ink-muted">Seasonal Baseline:</span>
            <span className="font-semibold text-slate-500 tabular-nums">
              ₹{point.baseline?.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-ink-muted">Expected Normal Band:</span>
            <span className="font-mono text-[11px] text-ink-secondary">
              ₹{point.lowerBand} – ₹{point.upperBand}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-border/70 text-[10px] text-ink-muted">
            <span>Verified Source:</span>
            <span className="font-medium text-ink-primary">{point.source}</span>
          </div>

          {point.eventMarker && (
            <div className="bg-rose-50 text-rose-800 p-1.5 rounded border border-rose-200 text-[10px] font-semibold mt-1">
              ⚡ Marker: {point.eventMarker}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Fare Trajectory & Statistical Anomaly Band
            </h3>
            <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
              Surge Outlier Region Active
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Daily historical quotes with 95% confidence interval and external disruption event overlays
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-brand-700 rounded-sm" />
            Observed Fare
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-slate-400 stroke-dashed" />
            Seasonal Baseline (₹5,825)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-200" />
            Normal Range Band
          </span>
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 15, right: 15, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E6EA" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
            />
            <YAxis
              domain={[4500, 8500]}
              tick={{ fontSize: 11, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Event reference lines */}
            <ReferenceLine x="06 Sep" stroke="#EA580C" strokeDasharray="3 3" label={{ value: 'ATC Radar Alert', position: 'top', fill: '#EA580C', fontSize: 10 }} />
            <ReferenceLine x="07 Sep" stroke="#B82323" strokeDasharray="3 3" label={{ value: 'BOM Squall Line', position: 'top', fill: '#B82323', fontSize: 10 }} />
            <ReferenceLine y={5825} stroke="#64748B" strokeDasharray="4 4" />

            {/* Shaded normal range area */}
            <Area
              type="monotone"
              dataKey="upperBand"
              stroke="transparent"
              fill="#F1F3F5"
              fillOpacity={0.7}
            />

            {/* Baseline line */}
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="#64748B"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />

            {/* Actual Observed Fare */}
            <Line
              type="monotone"
              dataKey="fare"
              stroke="#1A3A6B"
              strokeWidth={2.8}
              dot={{ r: 3.5, fill: '#1A3A6B', strokeWidth: 1, stroke: '#FFFFFF' }}
              activeDot={{ r: 6, fill: '#B82323', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex flex-wrap items-center justify-between text-xs text-ink-muted">
        <span>Current Distance: <strong>1,148 km</strong> • Seat Capacity Share: <strong>14.5% of National Basket</strong></span>
        <span>Average Sector Flying Time: <strong>2h 10m</strong></span>
      </div>
    </div>
  );
};
