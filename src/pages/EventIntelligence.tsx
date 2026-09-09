import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { MARKET_EVENTS, MarketEvent } from '../data/events';
import { EventTimeline } from '../components/events/EventTimeline';
import { EventFareOverlayChart } from '../components/events/EventFareOverlayChart';
import { EvidenceStackCards } from '../components/events/EvidenceStackCards';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { useDemoMode } from '../context/DemoModeContext';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Filter, Plane, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export const EventIntelligence: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>(MARKET_EVENTS[0].id);
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const { setSelectedRouteId } = useDemoMode();
  const navigate = useNavigate();

  const selectedEvent = MARKET_EVENTS.find((e: MarketEvent) => e.id === selectedEventId) || MARKET_EVENTS[0];

  const filteredEvents = MARKET_EVENTS.filter((e: MarketEvent) => {
    if (typeFilter !== 'All' && e.type !== typeFilter) return false;
    return true;
  });

  const eventTypes = ['All', 'Airport disruption', 'Travel demand', 'Festival', 'Holiday'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SectionHeader
        title="Event Intelligence & Contextual Drivers"
        subtitle="Deconstruct airfare volatility by establishing statistical association with weather alerts, airport NOTAMs, holiday calendars, and search volume surges."
        badge={
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-indigo-600" />
            Cross-Domain Correlation Engine
          </span>
        }
      />

      {/* Filter Row */}
      <div className="bg-surface rounded-lg border border-border p-3.5 shadow-sm-subtle flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Event Category:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {eventTypes.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={clsx(
                  'px-3 py-1 rounded text-xs font-semibold transition-all',
                  typeFilter === t
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'bg-subtle text-ink-secondary hover:bg-slate-200'
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-ink-muted">
          Active Event Corpus: <strong>{MARKET_EVENTS.length} events logged</strong>
        </div>
      </div>

      {/* Main Two-Column Layout: Timeline (left) / Selected Event Detail & Affected Routes (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <EventTimeline
            selectedEventId={selectedEvent.id}
            onSelectEvent={setSelectedEventId}
            filteredEvents={filteredEvents}
          />
        </div>

        <div className="lg:col-span-7 space-y-4">
          {/* Selected Event Detail Dossier */}
          <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-200">
                  {selectedEvent.type} • {selectedEvent.id}
                </span>
                <h3 className="text-base font-bold text-ink-primary mt-1">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs text-ink-muted mt-0.5">
                  Source: {selectedEvent.sourceType} • Logged: {selectedEvent.timestamp}
                </p>
              </div>
              <SeverityBadge level={selectedEvent.severity} />
            </div>

            <p className="text-xs text-ink-secondary leading-relaxed bg-subtle p-3 rounded-md border border-border">
              {selectedEvent.summary}
            </p>

            {/* Affected Corridors & Association Metric */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-ink-primary block">
                Directly Affected Corridors & Estimated Yield Deviation:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedEvent.affectedRoutes.map((ar: any) => (
                  <div
                    key={ar.routeId}
                    onClick={() => {
                      setSelectedRouteId(ar.routeId);
                      navigate(`/route?id=${ar.routeId}`);
                    }}
                    className="flex items-center justify-between p-2.5 rounded border border-border bg-white hover:border-brand-300 hover:bg-brand-50/50 transition-all cursor-pointer group text-xs"
                  >
                    <div className="flex items-center gap-2 font-mono font-bold text-ink-primary group-hover:text-brand-700">
                      <Plane className="w-3.5 h-3.5 text-brand-500" />
                      <span>{ar.routeId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-rose-600 tabular-nums">
                        +{ar.fareImpactPct}%
                      </span>
                      <span className="text-[10px] text-ink-muted">
                        (~{ar.lagHours}h lag)
                      </span>
                      <ArrowRight className="w-3 h-3 text-ink-muted group-hover:text-brand-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-border flex flex-wrap items-center justify-between text-xs text-ink-muted gap-2">
              <span>Association Score: <strong className="text-brand-700 font-mono">0.71 (Strong)</strong></span>
              <span>Observed Transmission Window: <strong className="text-ink-primary font-mono">{selectedEvent.lagDescription}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Synchronized Event / Fare Overlay Chart */}
      <EventFareOverlayChart />

      {/* Cryptographic Evidence Stack */}
      <EvidenceStackCards evidenceList={selectedEvent.evidence} />
    </div>
  );
};
