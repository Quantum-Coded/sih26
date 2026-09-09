import React from 'react';
import { Search, CloudRain, AlertOctagon, Calendar, Newspaper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MarketSignalsBar: React.FC = () => {
  const navigate = useNavigate();

  const signals = [
    {
      id: 'sig-search',
      title: 'Search Demand Velocity',
      value: '+18.2%',
      status: 'Surging',
      statusColor: 'text-status-danger bg-status-danger-bg border-status-danger/20',
      icon: Search,
      detail: 'High query volume on Western routes',
      target: '/events'
    },
    {
      id: 'sig-weather',
      title: 'Coastal Weather Alert',
      value: 'Orange Warning',
      status: 'Elevated Risk',
      statusColor: 'text-amber-700 bg-amber-50 border-amber-200',
      icon: CloudRain,
      detail: 'Convective cells over Mumbai (BOM)',
      target: '/events'
    },
    {
      id: 'sig-ops',
      title: 'Airport Operations Hold',
      value: '26% Delays',
      status: 'Critical Hold',
      statusColor: 'text-status-danger bg-status-danger-bg border-status-danger/20',
      icon: AlertOctagon,
      detail: 'Secondary runway 14/32 active at BOM',
      target: '/events'
    },
    {
      id: 'sig-holiday',
      title: 'Holiday Proximity',
      value: 'T-4 Days',
      status: 'Leisure Floor',
      statusColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      icon: Calendar,
      detail: '3-day weekend leisure travel spike',
      target: '/policy'
    },
    {
      id: 'sig-news',
      title: 'Aviation Media Intensity',
      value: '45+ Flights',
      status: 'Active Feed',
      statusColor: 'text-slate-700 bg-slate-100 border-slate-200',
      icon: Newspaper,
      detail: 'Reports of gate holds & flight diversions',
      target: '/events'
    }
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-ink-muted uppercase tracking-wider">
        <span>High-Frequency External Market Signals</span>
        <button
          onClick={() => navigate('/events')}
          className="text-brand-700 hover:text-brand-800 normal-case font-medium text-xs"
        >
          View Evidence Stack &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {signals.map((sig) => {
          const Icon = sig.icon;
          return (
            <div
              key={sig.id}
              onClick={() => navigate(sig.target)}
              className="bg-surface border border-border rounded-lg p-3.5 shadow-sm-subtle hover:border-brand-300 hover:shadow-card cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-ink-muted truncate">
                  {sig.title}
                </span>
                <Icon className="w-3.5 h-3.5 text-ink-muted group-hover:text-brand-600 transition-colors" />
              </div>

              <div>
                <div className="text-base font-bold text-ink-primary tracking-tight tabular-nums">
                  {sig.value}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${sig.statusColor}`}>
                    {sig.status}
                  </span>
                </div>
                <p className="text-[10px] text-ink-secondary mt-1.5 line-clamp-1">
                  {sig.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
