import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useDemoMode } from '../../context/DemoModeContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useDemoMode();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="bg-brand-900 text-white px-4 py-2.5 rounded-lg shadow-drawer flex items-center gap-2.5 border border-white/10 text-xs font-medium tracking-wide">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
