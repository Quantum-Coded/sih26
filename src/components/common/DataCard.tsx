import React from 'react';
import clsx from 'clsx';

interface DataCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  subtitle,
  headerAction,
  children,
  className,
  noPadding = false
}) => {
  return (
    <div
      className={clsx(
        'bg-surface rounded-lg border border-border shadow-sm-subtle overflow-hidden flex flex-col',
        className
      )}
    >
      {(title || subtitle || headerAction) && (
        <div className="px-5 py-4 border-b border-border/80 flex items-center justify-between gap-4 bg-white/50">
          <div>
            {title && (
              <h2 className="text-sm font-semibold text-ink-primary tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-ink-muted mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div className="flex items-center gap-2">{headerAction}</div>}
        </div>
      )}
      <div className={clsx(noPadding ? 'p-0' : 'p-5', 'flex-1')}>
        {children}
      </div>
    </div>
  );
};
