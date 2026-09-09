import React from 'react';
import { MARKET_EVENTS, MarketEvent } from '../../data/events';
import { SeverityBadge } from '../common/SeverityBadge';
import { Clock, MapPin, Radio, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface EventTimelineProps {
  selectedEventId: string;
  onSelectEvent: (id: string) => void;
  filteredEvents: MarketEvent[];
}

export const EventTimeline: React.FC<EventTimelineProps> = ({
  selectedEventId,
  onSelectEvent,
  filteredEvents
}) => {
  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm-subtle flex flex-col h-full">
      <div className="px-5 py-3.5 border-b border-border bg-white flex items-center justify-between">
        <h3 className="text-sm font-bold text-ink-primary tracking-tight">
          Chronological Event Feed
        </h3>
        <span className="text-[11px] text-ink-muted">
          {filteredEvents.length} Active Records
        </span>
      </div>

      <div className="p-4 overflow-y-auto space-y-3 flex-1 max-h-[620px]">
        {filteredEvents.map((evt) => {
          const isSelected = evt.id === selectedEventId;

          return (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt.id)}
              className={clsx(
                'p-3.5 rounded-lg border transition-all cursor-pointer space-y-2',
                isSelected
                  ? 'bg-brand-50/80 border-brand-300 shadow-sm ring-1 ring-brand-300'
                  : 'bg-white border-border hover:border-slate-300 hover:bg-subtle/40'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100">
                    {evt.type}
                  </span>
                  <h4 className="font-bold text-xs text-ink-primary mt-1 leading-snug">
                    {evt.title}
                  </h4>
                </div>
                <SeverityBadge level={evt.severity} size="sm" />
              </div>

              <p className="text-[11px] text-ink-secondary line-clamp-2 leading-relaxed">
                {evt.summary}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-[10px] text-ink-muted pt-1 border-t border-border/60">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-ink-muted" />
                  {evt.location}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-ink-muted" />
                  {evt.timestamp}
                </span>
                <span className="flex items-center gap-1 font-semibold text-rose-600">
                  <AlertCircle className="w-3 h-3 text-rose-500" />
                  {evt.affectedRoutes[0]?.routeId} +{evt.affectedRoutes[0]?.fareImpactPct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
