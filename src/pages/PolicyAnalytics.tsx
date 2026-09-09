import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { NationalDecompositionWaterfall } from '../components/policy/NationalDecompositionWaterfall';
import { RegionalViewCards } from '../components/policy/RegionalViewCards';
import { HolidayComparisonTable } from '../components/policy/HolidayComparisonTable';
import { HistoricalAnalogueFinder } from '../components/policy/HistoricalAnalogueFinder';
import { Landmark } from 'lucide-react';

export const PolicyAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SectionHeader
        title="Policy & Econometric Analytics"
        subtitle="Decomposition of the Consumer Price Index (CPI) transport basket, measuring airfare price pass-through, regional inflation variance, and festive elasticity."
        badge={
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-brand-600" />
            MoSPI / RBI Policy Inputs
          </span>
        }
      />

      {/* A. National Index Delta Waterfall Decomposition */}
      <NationalDecompositionWaterfall />

      {/* B. Macro-Regional Sub-indices & Market Segments */}
      <RegionalViewCards />

      {/* C. Festive Period Multipliers & Historical Precedent Analogues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HolidayComparisonTable />
        <HistoricalAnalogueFinder />
      </div>
    </div>
  );
};
