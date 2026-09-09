import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from 'recharts';
import { WATERFALL_DECOMPOSITION } from '../../data/policyData';

export const NationalDecompositionWaterfall: React.FC = () => {
  const data = WATERFALL_DECOMPOSITION;

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              National Index Delta Decomposition (Waterfall Attribution)
            </h3>
            <span className="text-[10px] font-mono font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-200">
              Δ +3.8 Index Points
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Laspeyres sector-weighted contribution to today's composite index shift from 113.6 to 117.4
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-ink-muted block">Western Metro Share</span>
          <span className="text-sm font-bold text-rose-600 font-mono">
            60.5% of Total Delta
          </span>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E6EA" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
              angle={-20}
              textAnchor="end"
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E6EA' }}
              tickFormatter={(v) => `${v > 0 ? `+${v}` : v}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const p = payload[0].payload;
                  return (
                    <div className="bg-surface border border-border p-3 rounded-lg shadow-xl text-xs space-y-1 min-w-[200px]">
                      <div className="font-bold text-ink-primary flex justify-between">
                        <span>{p.name}</span>
                        <span className="font-mono text-brand-700">{p.contribution > 0 ? `+${p.contribution}` : p.contribution} pts</span>
                      </div>
                      <p className="text-[11px] text-ink-muted">{p.notes}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine y={0} stroke="#94A3B8" />
            <Bar dataKey="contribution" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-ink-muted">
        <span>MoSPI / RBI Inflation Attribution Formula: <strong>I_t = ∑ w_i * (P_it / P_i0)</strong></span>
        <span>Largest Positive Driver: <strong>DEL-BOM (+1.4 index points)</strong></span>
      </div>
    </div>
  );
};
