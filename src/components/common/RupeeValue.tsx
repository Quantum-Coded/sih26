import React from 'react';
import clsx from 'clsx';

interface RupeeValueProps {
  amount: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const RupeeValue: React.FC<RupeeValueProps> = ({
  amount,
  className,
  size = 'md'
}) => {
  // Format with Indian numbering system: ₹7,480 / ₹1,20,000
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(amount);

  const sizeClass = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-lg font-bold',
    xl: 'text-2xl font-extrabold'
  }[size];

  return (
    <span className={clsx('tabular-nums font-sans tracking-tight', sizeClass, className)}>
      <span className="text-[0.9em] font-normal text-ink-muted mr-0.5">₹</span>
      {formatted}
    </span>
  );
};
