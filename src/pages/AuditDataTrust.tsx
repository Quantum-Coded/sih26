import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { KpiCard } from '../components/common/KpiCard';
import { DataPipelineFlow } from '../components/audit/DataPipelineFlow';
import { QuoteAuditTable } from '../components/audit/QuoteAuditTable';
import { TraceThisNumberSection } from '../components/audit/TraceThisNumberModal';
import { ShieldCheck } from 'lucide-react';

export const AuditDataTrust: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SectionHeader
        title="Audit, Provenance & Data Trust"
        subtitle="Uncompromising institutional transparency: Every single price index point is mathematically and cryptographically traceable to raw carrier quotes."
        badge={
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Audit Protocol v1.2 Compliant
          </span>
        }
      />

      {/* TOP KPI ROW: Quality & Validation Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <KpiCard
          label="Data Quality Score"
          value="96.8%"
          trend="stable"
          trendLabel="Healthy"
          status="healthy"
          subValue="Threshold: 90%"
          tooltip="Calculated from outlier frequency, missing field rates and carrier consistency"
        />

        <KpiCard
          label="Quote Validation Rate"
          value="98.4%"
          trend="up"
          trendLabel="98.4% Valid"
          status="healthy"
          subValue="1,248 / 1,284 quotes"
          tooltip="Percentage of quotes that pass deduplication and sanity checks"
        />

        <KpiCard
          label="Source Agreement"
          value="1.8%"
          trend="stable"
          trendLabel="Median Variance"
          status="healthy"
          subValue="Airline vs OTA"
          tooltip="Median percentage price discrepancy between direct airline quotes and OTA aggregator feeds"
        />

        <KpiCard
          label="Methodology Standard"
          value="APIx-v1.2"
          trend="stable"
          trendLabel="MoSPI Spec"
          status="neutral"
          subValue="Base 2024=100"
          tooltip="Laspeyres passenger weighted basket index specification"
        />

        <KpiCard
          label="Phantom Fares Rejected"
          value="22"
          trend="down"
          trendLabel="Blocked"
          status="healthy"
          subValue="Cached sold-outs"
          tooltip="Filtered out phantom fares that fail live checkout verification"
        />
      </div>

      {/* Interactive Data Pipeline Flow Stepper */}
      <DataPipelineFlow />

      {/* Signature Feature: Trace This Number Interactive Provenance Graph */}
      <TraceThisNumberSection />

      {/* Quote Audit Ledger & Detail Drawer */}
      <QuoteAuditTable />
    </div>
  );
};
