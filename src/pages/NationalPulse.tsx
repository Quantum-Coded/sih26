import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { KpiCard } from '../components/common/KpiCard';
import { IndiaRouteMap } from '../components/pulse/IndiaRouteMap';
import { MarketMovementChart } from '../components/pulse/MarketMovementChart';
import { TopSurgesTable } from '../components/pulse/TopSurgesTable';
import { TopDeclinesTable } from '../components/pulse/TopDeclinesTable';
import { WhyMovingCard } from '../components/pulse/WhyMovingCard';
import { MarketSignalsBar } from '../components/pulse/MarketSignalsBar';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import { useDemoMode } from '../context/DemoModeContext';

export const NationalPulse: React.FC = () => {
  const { showToast, nationalKpis, travelDate } = useDemoMode();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <SectionHeader
        title="India Airfare Pulse"
        subtitle="Real-time view of airfare movement across representative DGCA Indian routes for Consumer Price Index (CPI) augmentation."
        badge={
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Market Feed
          </span>
        }
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast(`Refreshed real-time scraper queues for departure date ${travelDate}: ${nationalKpis.liveObservations} quotes valid`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface text-xs font-semibold text-ink-secondary hover:bg-subtle transition-all active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5 text-ink-muted" />
              <span>Refresh Basket</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-ink-muted px-2.5 py-1 rounded bg-subtle border border-border">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>MoSPI / RBI Spec v1.2</span>
            </div>
          </div>
        }
      />

      {/* TOP KPI ROW: 5 Key Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <KpiCard
          label="India Airfare Price Index"
          value={nationalKpis.indexValue}
          trend={nationalKpis.indexTrend}
          trendLabel={nationalKpis.indexTrendLabel}
          status={nationalKpis.indexStatus}
          subValue="Base 2024 = 100"
          tooltip="Laspeyres weighted composite price index across 25 city pairs"
        />

        <KpiCard
          label="National Fare Pressure"
          value={nationalKpis.farePressure}
          trend={nationalKpis.indexTrend}
          trendLabel={nationalKpis.farePressureTrendLabel}
          status={nationalKpis.farePressureStatus}
          subValue="Threshold: 50"
          tooltip="Normalized pressure combining fare velocity, seat depletion, and delay rate"
        />

        <KpiCard
          label="Routes Under Surge"
          value={String(nationalKpis.routesUnderSurge)}
          trend={nationalKpis.routesUnderSurge >= 12 ? 'up' : 'stable'}
          trendLabel={`${nationalKpis.routesUnderSurge} active`}
          status={nationalKpis.routesUnderSurge >= 12 ? 'critical' : nationalKpis.routesUnderSurge >= 8 ? 'elevated' : 'healthy'}
          subValue="out of 25 monitored"
          tooltip="City-pairs with fare deviation > 1.5 standard deviations"
        />

        <KpiCard
          label="Live Fare Observations"
          value={nationalKpis.liveObservations}
          trend="stable"
          trendLabel="Active"
          status="healthy"
          subValue="Last 15 min"
          tooltip="Cleaned, deduplicated economy-class airfare quotes"
        />

        <KpiCard
          label="Data Quality Score"
          value={nationalKpis.dataQualityScore}
          trend="stable"
          trendLabel="Healthy"
          status="healthy"
          subValue="0 phantom fares"
          tooltip="Pipeline integrity score based on outlier rejection and carrier NDC verification"
        />
      </div>

      {/* SECTION 1: Surveillance Network Map & Analytical Why Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <IndiaRouteMap />
        </div>
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          <WhyMovingCard />
        </div>
      </div>

      {/* SECTION 2: External High-Frequency Signals Bar */}
      <MarketSignalsBar />

      {/* SECTION 3: Large Temporal Trend Chart */}
      <MarketMovementChart />

      {/* SECTION 4: Top Surges & Top Declines Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopSurgesTable />
        <TopDeclinesTable />
      </div>
    </div>
  );
};
