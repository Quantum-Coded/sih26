import React from 'react';

export const FareCompositionBar: React.FC = () => {
  // DEL-BOM Median Quote Fare Composition
  // Total ₹7,480
  // Base Fare: ₹5,780 (77.3%)
  // Fuel Surcharge & GST: ₹1,100 (14.7%)
  // User Development Fee (UDF): ₹412 (5.5%)
  // Passenger Service & Convenience: ₹188 (2.5%)

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-ink-primary tracking-tight">
            Fare Quote Decomposition & Tax Separation
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">
            MoSPI specification requirement: base fare isolation from pass-through airport charges
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-ink-primary">
          Total: ₹7,480
        </span>
      </div>

      {/* Stacked Segment Bar */}
      <div className="w-full h-5 rounded-md overflow-hidden flex bg-subtle">
        <div
          className="bg-brand-700 h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
          style={{ width: '77.3%' }}
          title="Base Airfare: ₹5,780 (77.3%)"
        >
          Base 77%
        </div>
        <div
          className="bg-amber-600 h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
          style={{ width: '14.7%' }}
          title="GST & Fuel Surcharge: ₹1,100 (14.7%)"
        >
          GST 15%
        </div>
        <div
          className="bg-indigo-600 h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
          style={{ width: '5.5%' }}
          title="User Development Fee (UDF): ₹412 (5.5%)"
        >
          UDF
        </div>
        <div
          className="bg-slate-500 h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
          style={{ width: '2.5%' }}
          title="Convenience Fee: ₹188 (2.5%)"
        />
      </div>

      {/* Breakdown Legend Items */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs">
        <div className="p-2.5 rounded bg-subtle border border-border">
          <span className="text-[11px] text-ink-muted block flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-700" />
            Base Airfare
          </span>
          <span className="font-bold text-ink-primary text-sm tabular-nums">₹5,780</span>
          <span className="text-[10px] text-ink-muted block">Subject to dynamic surge</span>
        </div>

        <div className="p-2.5 rounded bg-subtle border border-border">
          <span className="text-[11px] text-ink-muted block flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            Taxes & GST (5%)
          </span>
          <span className="font-bold text-ink-primary text-sm tabular-nums">₹1,100</span>
          <span className="text-[10px] text-ink-muted block">CGST + SGST statutory</span>
        </div>

        <div className="p-2.5 rounded bg-subtle border border-border">
          <span className="text-[11px] text-ink-muted block flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            UDF & PSF Charges
          </span>
          <span className="font-bold text-ink-primary text-sm tabular-nums">₹412</span>
          <span className="text-[10px] text-ink-muted block">Airport AERA fixed fee</span>
        </div>

        <div className="p-2.5 rounded bg-subtle border border-border">
          <span className="text-[11px] text-ink-muted block flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            Convenience Fee
          </span>
          <span className="font-bold text-ink-primary text-sm tabular-nums">₹188</span>
          <span className="text-[10px] text-ink-muted block">Gateway processing fee</span>
        </div>
      </div>
    </div>
  );
};
