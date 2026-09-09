import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useDemoMode } from '../../context/DemoModeContext';
import { Link } from 'react-router-dom';

export const DemoModeBanner: React.FC = () => {
  const { isDemoMode, scenario } = useDemoMode();

  if (!isDemoMode) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-2 text-xs text-amber-900 flex items-center justify-between font-medium">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>DEMO DATA • Historical simulation active:</strong> Pre-loaded with the <em>"{scenario.name}"</em> on sector <strong>{scenario.origin} → {scenario.destination}</strong> (₹{scenario.currentFare.toLocaleString('en-IN')}, +{scenario.surgePct}%).
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/route?id=DEL-BOM"
          className="inline-flex items-center gap-1 font-semibold text-amber-950 hover:underline"
        >
          <span>Investigate DEL-BOM</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
