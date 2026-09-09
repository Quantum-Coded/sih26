import React from 'react';
import clsx from 'clsx';

export type SeverityType = 'Normal' | 'Elevated' | 'High' | 'Extreme' | 'Low' | 'Critical';

interface SeverityBadgeProps {
  level: SeverityType | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  level,
  size = 'md',
  className
}) => {
  const norm = level.toLowerCase();

  const colorClass = (() => {
    switch (norm) {
      case 'extreme':
      case 'critical':
        return 'bg-status-danger-bg text-status-danger border-status-danger/20 font-bold';
      case 'high':
        return 'bg-orange-50 text-orange-700 border-orange-200 font-semibold';
      case 'elevated':
      case 'moderate':
        return 'bg-status-warning-bg text-status-warning border-status-warning/20 font-medium';
      case 'normal':
      case 'healthy':
      case 'low':
      default:
        return 'bg-status-positive-bg text-status-positive border-status-positive/20 font-medium';
    }
  })();

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded border capitalize tracking-wide',
        size === 'sm' ? 'px-1.5 py-0.5 text-[11px]' : 'px-2.5 py-0.5 text-xs',
        colorClass,
        className
      )}
    >
      <span
        className={clsx(
          'w-1.5 h-1.5 rounded-full',
          norm === 'extreme' || norm === 'critical' ? 'bg-status-danger animate-pulse' :
          norm === 'high' ? 'bg-orange-600' :
          norm === 'elevated' || norm === 'moderate' ? 'bg-status-warning' : 'bg-status-positive'
        )}
      />
      {level}
    </span>
  );
};
