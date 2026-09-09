import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ROUTES } from '../data/routes';
import { useDemoMode } from '../context/DemoModeContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { RouteSelector } from '../components/route/RouteSelector';
import { RouteSummaryKpis } from '../components/route/RouteSummaryKpis';
import { FareMovementChart } from '../components/route/FareMovementChart';
import { BookingWindowCurve } from '../components/route/BookingWindowCurve';
import { PricePositionRuler } from '../components/route/PricePositionRuler';
import { AirlineComparisonTable } from '../components/route/AirlineComparisonTable';
import { FareCompositionBar } from '../components/route/FareCompositionBar';
import { Bot } from 'lucide-react';

export const RouteIntelligence: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedRouteId, setSelectedRouteId, setIsCopilotOpen, currentRoute } = useDemoMode();

  const [leadTime, setLeadTime] = useState<string>('T+7');
  const [preset, setPreset] = useState<string>('Business');

  // Sync route ID from URL query if present
  useEffect(() => {
    const queryId = searchParams.get('id');
    if (queryId && ROUTES.some(r => r.id === queryId)) {
      setSelectedRouteId(queryId);
    }
  }, [searchParams, setSelectedRouteId]);

  const handleRouteChange = (id: string) => {
    setSelectedRouteId(id);
    setSearchParams({ id });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SectionHeader
        title={`Route Intelligence: ${currentRoute.origin} → ${currentRoute.destination}`}
        subtitle={`Deep-dive econometric monitoring for sector ${currentRoute.id} (${currentRoute.category} corridor) with seasonal baseline benchmarks.`}
        badge={
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            {currentRoute.surgePct > 0 ? `+${currentRoute.surgePct}% Surge Active` : 'Within Normal Range'}
          </span>
        }
        actions={
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100 text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-600" />
            <span>Investigate Route Drivers</span>
          </button>
        }
      />

      {/* Interactive Controls Bar */}
      <RouteSelector
        selectedRouteId={currentRoute.id}
        onRouteChange={handleRouteChange}
        selectedLeadTime={leadTime}
        onLeadTimeChange={setLeadTime}
        selectedPreset={preset}
        onPresetChange={setPreset}
      />

      {/* Top 5 Route Summary KPIs */}
      <RouteSummaryKpis route={currentRoute} />

      {/* Primary Fare Movement & Anomaly Band Chart */}
      <FareMovementChart routeId={currentRoute.id} />

      {/* Grid: Booking Window Lead-Time Curve & Price Position Ruler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingWindowCurve />
        <PricePositionRuler />
      </div>

      {/* Carrier Quotes Comparison Table */}
      <AirlineComparisonTable />

      {/* Fare Quote Composition & Tax Separation */}
      <FareCompositionBar />
    </div>
  );
};
