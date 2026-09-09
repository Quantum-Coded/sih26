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
import { useDemoMode } from '../../context/DemoModeContext';

interface FareMovementChartProps {
  routeId: string;
}

export const FareMovementChart: React.FC<FareMovementChartProps> = ({ routeId }) => {
  const { currentRoute, travelDate, nationalKpis } = useDemoMode();

  const baseline = currentRoute ? currentRoute.baselineFare : 5825;
  const currentFare = currentRoute ? currentRoute.currentFare : 7480;
  const scaleRatio = baseline / 5825;

  // Scale 30-day historical points to match the current route and anchor the latest point to currentFare
  const data = DEL_BOM_30D_HISTORY.map((pt, idx) => {
    const isLast = idx === DEL_BOM_30D_HISTORY.length - 1;
    const ptBaseline = Math.round(pt.baseline * scaleRatio);
    const ptLower = Math.round(pt.lowerBand * scaleRatio);
    const ptUpper = Math.round(pt.upperBand * scaleRatio);
    const ptFare = isLast ? currentFare : Math.round(pt.fare * scaleRatio);

    return {
      ...pt,
      baseline: ptBaseline,
      lowerBand: ptLower,
      upperBand: ptUpper,
      fare: ptFare,
    };
  });

  const minVal = Math.floor(Math.min(...data.map(d => d.lowerBand)) * 0.9 / 100) * 100;
  const maxVal = Math.ceil(Math.max(...data.map(d => Math.max(d.fare, d.upperBand))) * 1.08 / 100) * 100;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-surface border border-border p-3.5 rounded-lg shadow-xl text-xs space-y-1.5 min-w-[210px]">
          <div className="flex items-center justify-between border-b border-border pb-1">
            <span className="font-bold text-ink-primary">{label}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-subtle text-ink-muted">
              T+{nationalKpis.leadDays} Lead Time
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
              ₹{point.lowerBand?.toLocaleString('en-IN')} – ₹{point.upperBand?.toLocaleString('en-IN')}
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
              Fare Trajectory & Statistical Anomaly Band ({currentRoute ? currentRoute.id : routeId})
            </h3>
            <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
              {currentRoute && currentRoute.surgePct >= 10 ? 'Surge Outlier Region Active' : 'Normal Seasonal Track'}
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Daily historical quotes with 95% confidence interval and external disruption overlays for {travelDate}
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
            Seasonal Baseline (₹{baseline.toLocaleString('en-IN')})
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
              domain={[minVal, maxVal]}
              tick={{ fontSize: 11, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Event reference lines */}
            <ReferenceLine x="06 Sep" stroke="#EA580C" strokeDasharray="3 3" label={{ value: 'ATC Radar Alert', position: 'top', fill: '#EA580C', fontSize: 10 }} />
            <ReferenceLine x="07 Sep" stroke="#B82323" strokeDasharray="3 3" label={{ value: 'BOM Squall Line', position: 'top', fill: '#B82323', fontSize: 10 }} />
            <ReferenceLine y={baseline} stroke="#64748B" strokeDasharray="4 4" />

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
        <span>Current Sector: <strong>{currentRoute ? `${currentRoute.origin} → ${currentRoute.destination}` : routeId}</strong> • Baseline: <strong>₹{baseline.toLocaleString('en-IN')}</strong></span>
        <span>Lead Time: <strong className="text-brand-700">T+{nationalKpis.leadDays} Days ({travelDate})</strong></span>
      </div>
    </div>
  );
};
