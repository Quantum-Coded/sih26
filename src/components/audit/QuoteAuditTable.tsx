import React, { useState } from 'react';
import { AUDIT_QUOTES, AuditQuote } from '../../data/auditData';
import { RupeeValue } from '../common/RupeeValue';
import { X, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { useDemoMode } from '../../context/DemoModeContext';
import clsx from 'clsx';

export const QuoteAuditTable: React.FC = () => {
  const [selectedQuote, setSelectedQuote] = useState<AuditQuote | null>(null);
  const { showToast, dateMultiplier, travelDate, nationalKpis } = useDemoMode();

  const dynamicQuotes = AUDIT_QUOTES.map((q) => {
    const total = Math.round(q.totalFare * (dateMultiplier || 1.0));
    const taxFee = Math.round(q.tax + q.fee);
    const base = total - taxFee;

    return {
      ...q,
      totalFare: total,
      baseFare: Math.max(1000, base),
      departureDate: travelDate,
    };
  });

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm-subtle flex flex-col">
      <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between bg-white/70 gap-2">
        <div>
          <h3 className="text-sm font-bold text-ink-primary tracking-tight">
            Cryptographic Quote Ledger & Raw Scraper Audit Logs
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">
            Individual fare quotes for <span className="font-semibold text-brand-700">{travelDate}</span> (T+{nationalKpis.leadDays}) with SHA-256 validation signatures
          </p>
        </div>
        <span className="text-[11px] text-ink-muted">
          Showing 6 representative verified quotes
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-subtle/80 text-[11px] font-semibold text-ink-muted uppercase tracking-wider border-b border-border">
            <tr>
              <th className="py-2.5 px-4">Quote ID</th>
              <th className="py-2.5 px-3">Route</th>
              <th className="py-2.5 px-3">Carrier</th>
              <th className="py-2.5 px-3">Observed Timestamp</th>
              <th className="py-2.5 px-3">Base Fare</th>
              <th className="py-2.5 px-3">Tax + Fee</th>
              <th className="py-2.5 px-3">Total Fare</th>
              <th className="py-2.5 px-3">Lead Time</th>
              <th className="py-2.5 px-3">Pipeline Status</th>
              <th className="py-2.5 px-4 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {dynamicQuotes.map((q) => (
              <tr
                key={q.quoteId}
                onClick={() => setSelectedQuote(q)}
                className="hover:bg-brand-50/40 transition-colors cursor-pointer"
              >
                <td className="py-3 px-4 font-mono font-bold text-brand-700">
                  {q.quoteId}
                </td>
                <td className="py-3 px-3 font-mono font-semibold text-ink-primary">
                  {q.route}
                </td>
                <td className="py-3 px-3">
                  <span className="font-semibold text-ink-primary">{q.airlineName}</span>
                </td>
                <td className="py-3 px-3 font-mono text-[11px] text-ink-muted">
                  {q.observedAt}
                </td>
                <td className="py-3 px-3">
                  <RupeeValue amount={q.baseFare} size="sm" />
                </td>
                <td className="py-3 px-3 text-ink-muted">
                  <RupeeValue amount={q.tax + q.fee} size="sm" />
                </td>
                <td className="py-3 px-3 font-bold text-ink-primary">
                  <RupeeValue amount={q.totalFare} size="sm" />
                </td>
                <td className="py-3 px-3 font-mono text-xs">
                  T+{nationalKpis.leadDays}
                </td>
                <td className="py-3 px-3">
                  <span
                    className={clsx(
                      'text-[10px] font-bold px-2 py-0.5 rounded border',
                      q.status === 'VERIFIED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    )}
                  >
                    {q.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuote(q);
                    }}
                    className="text-brand-700 hover:text-brand-900 font-semibold text-xs"
                  >
                    View JSON
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slide-in Detail Drawer */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setSelectedQuote(null)}
          />

          <div className="relative w-full max-w-lg bg-surface shadow-2xl flex flex-col h-full z-10 border-l border-border p-6 overflow-y-auto space-y-5 animate-slide-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-200">
                  {selectedQuote.quoteId}
                </span>
                <h3 className="text-base font-bold text-ink-primary mt-1">
                  Quote Audit Dossier
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-1 rounded-md text-ink-muted hover:text-ink-primary hover:bg-subtle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-subtle">
                <div>
                  <span className="text-ink-muted block text-[11px]">Flight / Carrier:</span>
                  <span className="font-bold text-ink-primary">{selectedQuote.airlineName}</span>
                </div>
                <div>
                  <span className="text-ink-muted block text-[11px]">Sector Pair:</span>
                  <span className="font-mono font-bold text-ink-primary">{selectedQuote.route} ({selectedQuote.leadTime})</span>
                </div>
                <div>
                  <span className="text-ink-muted block text-[11px]">Total Observed:</span>
                  <span className="font-bold text-ink-primary text-sm">₹{selectedQuote.totalFare}</span>
                </div>
                <div>
                  <span className="text-ink-muted block text-[11px]">Validation Decision:</span>
                  <span className="font-bold text-emerald-700">{selectedQuote.status}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider block mb-1">
                  SHA-256 Provenance Hash Signature
                </span>
                <div className="p-2 rounded bg-slate-900 text-slate-300 font-mono text-[11px] break-all border border-slate-800">
                  {selectedQuote.hash}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider">
                    Raw Ingested Scraper JSON
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedQuote.rawJson);
                      showToast('Copied raw JSON quote to clipboard');
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-brand-700 hover:text-brand-900 font-semibold"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy JSON</span>
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800">
                  {selectedQuote.rawJson}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
