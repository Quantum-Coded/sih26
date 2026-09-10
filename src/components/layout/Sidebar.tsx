import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Activity,
  Compass,
  AlertTriangle,
  CalendarDays,
  LineChart,
  Landmark,
  ShieldCheck,
  History,
  Bot,
  Terminal,
  Layers,
  BarChart3,
} from 'lucide-react';
import clsx from 'clsx';
import { useDemoMode } from '../../context/DemoModeContext';

const NAV_ITEMS = [
  { name: 'National Pulse', path: '/', icon: Activity, badge: 'Live' },
  { name: 'Route Intelligence', path: '/route', icon: Compass },
  { name: 'Surge Monitor', path: '/surges', icon: AlertTriangle, alertCount: 14 },
  { name: 'Event Intelligence', path: '/events', icon: CalendarDays },
  { name: 'Fare Forecast', path: '/forecast', icon: LineChart },
  { name: 'Policy Analytics', path: '/policy', icon: Landmark },
  { name: 'Power BI Analytics', path: '/powerbi', icon: BarChart3, isBi: true },
  { name: 'Audit & Data Trust', path: '/audit', icon: ShieldCheck },
  { name: 'Validation / Backtest', path: '/backtest', icon: History },
  { name: 'Ask APIx', path: '/ask', icon: Bot, isAi: true },
  { name: 'Government API', path: '/api-explorer', icon: Terminal },
];

export const Sidebar: React.FC = () => {
  const { isDemoMode } = useDemoMode();

  return (
    <aside className="w-64 bg-[#0E1A2B] text-slate-300 flex flex-col border-r border-slate-800 shrink-0 select-none z-30">
      {/* Brand Header */}
      <div className="px-5 py-5 border-b border-slate-800/80 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-brand-500 flex items-center justify-center text-white font-bold text-sm tracking-tighter">
              A
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white font-sans">
              API<span className="text-brand-500 font-black">x</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              v1.2
            </span>
          </div>
          <p className="text-[10px] font-semibold tracking-widest text-slate-400 mt-1 uppercase">
            India Airfare Intelligence
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Observatory Workspaces
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors duration-150 group',
                  isActive
                    ? 'bg-brand-600/30 text-white font-semibold border-l-2 border-brand-500 pl-[10px]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                )
              }
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={clsx(
                    'w-4 h-4 transition-colors',
                    item.isAi
                      ? 'text-indigo-400'
                      : (item as any).isBi
                      ? 'text-amber-400'
                      : 'text-slate-400 group-hover:text-slate-200'
                  )}
                />
                <span>{item.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
                {item.alertCount && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {item.alertCount}
                  </span>
                )}
                {item.isAi && (
                  <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    AI
                  </span>
                )}
                {(item as any).isBi && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    BI
                  </span>
                )}
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* System Status & Data Quality Footer */}
      <div className="p-3 mx-3 mb-3 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className={clsx('w-2 h-2 rounded-full', isDemoMode ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse')} />
            {isDemoMode ? 'SIMULATION DATA' : 'MARKET DATA'}
          </span>
          <span className="font-mono text-[10px] text-slate-300">
            14:08 IST
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800/80 pt-1.5 text-[10px]">
          <span className="text-slate-400">Data Quality:</span>
          <span className="font-semibold text-emerald-400">96.8% Healthy</span>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>DGCA Passenger Rep:</span>
          <span className="text-slate-300">25 City-Pairs</span>
        </div>
      </div>
    </aside>
  );
};
