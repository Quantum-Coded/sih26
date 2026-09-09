import React from 'react';
import { useDemoMode } from '../../context/DemoModeContext';

export const FareCompositionBar: React.FC = () => {
  const { currentRoute } = useDemoMode();

  const totalFare = currentRoute.currentFare;
  const baseFare = Math.round(totalFare * 0.773);
  const gst = Math.round(totalFare * 0.147);
  const udf = Math.round(totalFare * 0.055);
  const convenience = totalFare - baseFare - gst - udf;

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-ink-primary tracking-tight">
            Fare Quote Decomposition & Statutory Tax Unbundling ({currentRoute.origin} → {currentRoute.destination})
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">
            MoSPI specification requirement: pure base fare isolation from pass-through airport charges
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-brand-800 bg-brand-50 px-2.5 py-1 rounded border border-brand-200">
          Total Median: ₹{totalFare.toLocaleString('en-IN')}
        </span>
      </div>

      {/* Stacked Segment Bar */}
      <div className="w-full h-5 rounded-md overflow-hidden flex bg-subtle">
        <div
          className="bg-brand-700 h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
          style={{ width: '77.3%' }}
          title={`Base Airfare: ₹${baseFare.toLocaleString('en-IN')} (77.3%)`}
        >
          Base 77%
        </div>
        <div
          className="bg-amber-600 h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
          style={{ width: '14.7%' }}
          title={`GST & Fuel Surcharge: ₹${gst.toLocaleString('en-IN')} (14.7%)`}
        >
          GST 15%
        </div>
        <div
          className="bg-indigo-600 h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
          style={{ width: '5.5%' }}
          title={`User Development Fee (UDF): ₹${udf.toLocaleString('en-IN')} (5.5%)`}
        >
          UDF
        </div>
        <div
          className="bg-slate-500 h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
          style={{ width: '2.5%' }}
          title={`Convenience Fee: ₹${convenience.toLocaleString('en-IN')} (2.5%)`}
        />
      </div>

      {/* Breakdown Legend Items */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs">
        <div className="p-2.5 rounded bg-subtle border border-border">
          <span className="text-[11px] text-ink-muted block flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-700" />
            Pure Base Airfare
          </span>
          <span className="font-bold text-ink-primary text-sm tabular-nums">₹{baseFare.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-ink-muted block">Subject to dynamic surge</span>
        </div>

        <div className="p-2.5 rounded bg-subtle border border-border">
          <span className="text-[11px] text-ink-muted block flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            Taxes & GST (5%)
          </span>
          <span className="font-bold text-ink-primary text-sm tabular-nums">₹{gst.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-ink-muted block">CGST + SGST statutory</span>
        </div>

        <div className="p-2.5 rounded bg-subtle border border-border">
          <span className="text-[11px] text-ink-muted block flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            UDF & PSF Charges
          </span>
          <span className="font-bold text-ink-primary text-sm tabular-nums">₹{udf.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-ink-muted block">Airport AERA fixed fee</span>
        </div>

        <div className="p-2.5 rounded bg-subtle border border-border">
          <span className="text-[11px] text-ink-muted block flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            Convenience Fee
          </span>
          <span className="font-bold text-ink-primary text-sm tabular-nums">₹{convenience.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-ink-muted block">Gateway processing fee</span>
        </div>
      </div>
    </div>
  );
};
