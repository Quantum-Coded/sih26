import React from 'react';
import { useDemoMode } from '../../context/DemoModeContext';
import { RouteData } from '../../data/routes';

interface FareCompositionBarProps {
  route?: RouteData;
  leadTime?: string;
}

export const FareCompositionBar: React.FC<FareCompositionBarProps> = ({
  route: propRoute,
  leadTime,
}) => {
  const { currentRoute: contextRoute } = useDemoMode();
  const currentRoute = propRoute || contextRoute;

  const totalFare = currentRoute.currentFare;
  const udf = 425; // Statutory airport charge fixed
  const convenience = 350; // Payment gateway fee fixed
  // Pure base airfare subject to 5% GST
  const baseFare = Math.max(1000, Math.round((totalFare - udf - convenience) / 1.05));
  const gst = totalFare - baseFare - udf - convenience;

  const basePct = Number(((baseFare / totalFare) * 100).toFixed(1));
  const gstPct = Number(((gst / totalFare) * 100).toFixed(1));
  const udfPct = Number(((udf / totalFare) * 100).toFixed(1));
  const conveniencePct = Number((100 - basePct - gstPct - udfPct).toFixed(1));

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-ink-primary tracking-tight">
            Fare Quote Decomposition & Statutory Tax Unbundling ({currentRoute.origin} → {currentRoute.destination})
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">
            MoSPI specification requirement: pure base fare isolation from pass-through charges {leadTime ? `(${leadTime} window)` : ''}
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
          style={{ width: `${basePct}%` }}
          title={`Base Airfare: ₹${baseFare.toLocaleString('en-IN')} (${basePct}%)`}
        >
          Base {basePct}%
        </div>
        <div
          className="bg-amber-600 h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
          style={{ width: `${gstPct}%` }}
          title={`GST & Fuel Surcharge: ₹${gst.toLocaleString('en-IN')} (${gstPct}%)`}
        >
          GST {gstPct}%
        </div>
        <div
          className="bg-indigo-600 h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
          style={{ width: `${udfPct}%` }}
          title={`User Development Fee (UDF): ₹${udf.toLocaleString('en-IN')} (${udfPct}%)`}
        >
          UDF
        </div>
        <div
          className="bg-slate-500 h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
          style={{ width: `${conveniencePct}%` }}
          title={`Convenience Fee: ₹${convenience.toLocaleString('en-IN')} (${conveniencePct}%)`}
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
