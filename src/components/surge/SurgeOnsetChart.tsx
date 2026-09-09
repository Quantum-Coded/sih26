import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useDemoMode } from '../../context/DemoModeContext';

export const SurgeOnsetChart: React.FC = () => {
  const { currentRoute, travelDate } = useDemoMode();

  const baseline = currentRoute ? currentRoute.baselineFare : 5825;
  const currentFare = currentRoute ? currentRoute.currentFare : 7480;
  const zScore = currentRoute ? currentRoute.zScore : 2.31;
  const isSurge = currentRoute ? currentRoute.surgePct >= 10 : true;

  // Intraday progression scaling from baseline to currentFare
  const hourlyData = [
    { time: '02:00', fare: Math.round(baseline * 0.99), zScore: 0.1, status: 'Normal Baseline' },
    { time: '04:00', fare: Math.round(baseline * 1.00), zScore: 0.2, status: 'Normal Baseline' },
    { time: '06:00', fare: Math.round(baseline * 1.02), zScore: 0.4, status: 'Normal Traffic' },
    { time: '08:00', fare: Math.round(baseline * (1 + (currentFare / baseline - 1) * 0.4)), zScore: Number((zScore * 0.45).toFixed(2)), status: 'Morning Velocity' },
    { time: '08:30 (Onset)', fare: Math.round(baseline * (1 + (currentFare / baseline - 1) * 0.65)), zScore: Number((zScore * 0.75).toFixed(2)), status: isSurge ? 'ANOMALY EMERGENCE' : 'Demand Uptick' },
    { time: '10:00', fare: Math.round(baseline * (1 + (currentFare / baseline - 1) * 0.82)), zScore: Number((zScore * 0.88).toFixed(2)), status: isSurge ? 'Surge Ingestion' : 'Standard Yield' },
    { time: '12:00', fare: Math.round(baseline * (1 + (currentFare / baseline - 1) * 0.93)), zScore: Number((zScore * 0.95).toFixed(2)), status: isSurge ? 'Surge Ingestion' : 'Standard Yield' },
    { time: '14:00 (Now)', fare: currentFare, zScore: zScore, status: 'Current Scraped Quote' },
  ];

  const minFare = Math.floor(Math.min(...hourlyData.map(h => h.fare)) * 0.95 / 100) * 100;
  const maxFare = Math.ceil(Math.max(...hourlyData.map(h => h.fare)) * 1.05 / 100) * 100;

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Intraday Anomaly Onset Timeline ({currentRoute ? currentRoute.id : 'DEL → BOM'})
            </h3>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                isSurge ? 'bg-rose-50 text-rose-800 border-rose-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}
            >
              {isSurge ? 'Onset at 08:30 IST' : 'Normal Variance'}
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Statistical Z-score progression across intraday quote captures for {travelDate}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-ink-muted block">Duration Under Observation</span>
          <span className={`text-sm font-bold font-mono ${isSurge ? 'text-rose-600' : 'text-brand-700'}`}>
            {isSurge ? '5h 38m Active' : 'Normal Operations'}
          </span>
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourlyData} margin={{ top: 15, right: 15, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E6EA" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
            />
            <YAxis
              domain={[minFare, maxFare]}
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
                    <div className="bg-surface border border-border p-2.5 rounded shadow-lg text-xs space-y-1">
                      <span className="font-bold text-ink-primary">{label}</span>
                      <div className="flex justify-between gap-4">
                        <span className="text-ink-muted">Fare:</span>
                        <strong className="font-mono text-brand-700">₹{p.fare?.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-ink-muted">Z-Score:</span>
                        <strong className="font-mono text-rose-600">{p.zScore}σ</strong>
                      </div>
                      <div className="text-[10px] text-ink-secondary italic pt-1 border-t border-border">
                        {p.status}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {isSurge && (
              <ReferenceLine
                x="08:30 (Onset)"
                stroke="#B82323"
                strokeDasharray="4 4"
                label={{ value: 'Z > 2.0σ Threshold Crossed', position: 'top', fill: '#B82323', fontSize: 10 }}
              />
            )}
            <Line
              type="monotone"
              dataKey="fare"
              stroke="#1A3A6B"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#1A3A6B' }}
              activeDot={{ r: 6, fill: '#B82323' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-ink-muted">
        <span>Current Sector Baseline: <strong>₹{baseline.toLocaleString('en-IN')}</strong></span>
        <span>Latest Observation Quote: <strong className={isSurge ? 'text-rose-600' : 'text-brand-700'}>₹{currentFare.toLocaleString('en-IN')}</strong></span>
      </div>
    </div>
  );
};
