import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ROUTES } from '../data/routes';
import { useDemoMode } from '../context/DemoModeContext';
import { computeRouteLeadTimeProfile } from '../utils/dynamicEconometrics';
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

  // Compute reactive route pricing and KPIs based on selected Lead Time and Traveler Profile
  const activeRoute = useMemo(() => {
    return computeRouteLeadTimeProfile(currentRoute, leadTime, preset);
  }, [currentRoute, leadTime, preset]);

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
        title={`Route Intelligence: ${activeRoute.origin} → ${activeRoute.destination}`}
        subtitle={`Deep-dive econometric monitoring for sector ${activeRoute.id} (${activeRoute.category} corridor) across ${leadTime} advance window with ${preset} profile demand.`}
        badge={
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
            activeRoute.surgePct >= 10
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : activeRoute.surgePct <= -5
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-slate-50 text-slate-700 border-slate-200'
          }`}>
            {activeRoute.surgePct > 0 ? `+${activeRoute.surgePct}% Surge Active` : `${activeRoute.surgePct}% Below Baseline`} • {leadTime} ({preset})
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
        selectedRouteId={activeRoute.id}
        onRouteChange={handleRouteChange}
        selectedLeadTime={leadTime}
        onLeadTimeChange={setLeadTime}
        selectedPreset={preset}
        onPresetChange={setPreset}
      />

      {/* Top 5 Route Summary KPIs */}
      <RouteSummaryKpis route={activeRoute} />

      {/* Primary Fare Movement & Anomaly Band Chart */}
      <FareMovementChart
        routeId={activeRoute.id}
        route={activeRoute}
        activeFare={activeRoute.currentFare}
        leadTime={leadTime}
      />

      {/* Grid: Booking Window Lead-Time Curve & Price Position Ruler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingWindowCurve
          route={activeRoute}
          selectedLeadTime={leadTime}
          onSelectWindow={setLeadTime}
        />
        <PricePositionRuler
          route={activeRoute}
          leadTime={leadTime}
          preset={preset}
        />
      </div>

      {/* Carrier Quotes Comparison Table */}
      <AirlineComparisonTable
        route={activeRoute}
        leadTime={leadTime}
        preset={preset}
      />

      {/* Fare Quote Composition & Tax Separation */}
      <FareCompositionBar
        route={activeRoute}
        leadTime={leadTime}
      />
    </div>
  );
};
