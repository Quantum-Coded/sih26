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

const HOURLY_ONSET_DATA = [
  { time: '02:00', fare: 5820, zScore: 0.1, status: 'Normal' },
  { time: '04:00', fare: 5850, zScore: 0.2, status: 'Normal' },
  { time: '06:00', fare: 5920, zScore: 0.4, status: 'Normal' },
  { time: '08:00', fare: 6240, zScore: 1.1, status: 'Elevated' },
  { time: '08:30 (Onset)', fare: 6680, zScore: 2.05, status: 'ANOMALY EMERGENCE' },
  { time: '10:00', fare: 7050, zScore: 2.18, status: 'Surge' },
  { time: '12:00', fare: 7240, zScore: 2.25, status: 'Surge' },
  { time: '14:00 (Now)', fare: 7480, zScore: 2.31, status: 'Current Peak' },
];

export const SurgeOnsetChart: React.FC = () => {
  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Intraday Anomaly Onset Timeline (DEL → BOM)
            </h3>
            <span className="text-[10px] font-mono font-bold bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200">
              Onset at 08:30 IST
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Exact timestamp where statistical Z-score crossed the 2.0 sigma anomaly boundary
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-ink-muted block">Duration Under Surge</span>
          <span className="text-sm font-bold text-rose-600 font-mono">
            5h 38m Active
          </span>
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={HOURLY_ONSET_DATA} margin={{ top: 15, right: 15, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E6EA" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
            />
            <YAxis
              domain={[5500, 7800]}
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
                        <strong className="font-mono text-brand-700">₹{p.fare}</strong>
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
            <ReferenceLine
              x="08:30 (Onset)"
              stroke="#B82323"
              strokeDasharray="4 4"
              label={{ value: 'Z > 2.0σ Threshold Crossed', position: 'top', fill: '#B82323', fontSize: 10 }}
            />
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
        <span>Pre-onset velocity: <strong>+₹50/hour</strong></span>
        <span>Post-onset velocity: <strong className="text-rose-600">+₹240/hour</strong></span>
      </div>
    </div>
  );
};
