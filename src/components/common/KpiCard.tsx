import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import clsx from 'clsx';

interface KpiCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'stable';
  trendLabel?: string;
  status?: 'healthy' | 'elevated' | 'critical' | 'neutral';
  tooltip?: string;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  subValue,
  trend,
  trendLabel,
  status = 'neutral',
  tooltip,
  className
}) => {
  return (
    <div
      title={tooltip}
      className={clsx(
        'bg-surface rounded-lg border border-border p-4 shadow-sm-subtle hover:shadow-card transition-all duration-150',
        className
      )}
    >
      <div className="flex items-center justify-between text-xs font-medium text-ink-muted uppercase tracking-wider mb-1.5">
        <span>{label}</span>
        {trend && (
          <span
            className={clsx(
              'inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded',
              trend === 'up' && (status === 'critical' || status === 'elevated' ? 'bg-status-danger-bg text-status-danger' : 'bg-status-positive-bg text-status-positive'),
              trend === 'down' && 'bg-status-positive-bg text-status-positive',
              trend === 'stable' && 'bg-subtle text-ink-muted'
            )}
          >
            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3" />}
            {trend === 'stable' && <Minus className="w-3 h-3" />}
            {trendLabel}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl lg:text-3xl font-bold tracking-tight text-ink-primary tabular-nums font-sans">
          {value}
        </span>
        {subValue && (
          <span className="text-xs font-medium text-ink-muted">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
};
