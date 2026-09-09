import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Mic,
  Bot,
  Calendar,
  RefreshCw,
  Bell,
  Shield,
  Layers,
  Globe
} from 'lucide-react';
import { useDemoMode } from '../../context/DemoModeContext';
import clsx from 'clsx';

export const TopBar: React.FC = () => {
  const location = useLocation();
  const {
    isDemoMode,
    setIsDemoMode,
    setIsCopilotOpen,
    setIsVoiceOpen,
    selectedLanguage,
    showToast
  } = useDemoMode();

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
      case '/pulse':
        return { title: 'India Airfare Pulse', category: 'National Command Center' };
      case '/route':
        return { title: 'Route Intelligence', category: 'Sector Deep Dive' };
      case '/surges':
        return { title: 'Surge Anomaly Monitor', category: 'Early Anomaly Detection' };
      case '/events':
        return { title: 'Event Intelligence', category: 'External Signals & Causal Evidence' };
      case '/forecast':
        return { title: 'Fare Forecast & What-If', category: 'Predictive Machine Learning' };
      case '/policy':
        return { title: 'Policy & Market Analytics', category: 'MoSPI / RBI Policy Inputs' };
      case '/audit':
        return { title: 'Audit & Data Trust', category: 'Verifiable Provenance Pipeline' };
      case '/backtest':
        return { title: 'Validation & Backtest', category: 'DGCA Historical Benchmark' };
      case '/ask':
        return { title: 'Ask APIx Investigation', category: 'Agentic AI Assistant' };
      case '/api-explorer':
        return { title: 'Government API Explorer', category: 'Machine-Readable Open Data' };
      default:
        return { title: 'APIx Observatory', category: 'India Airfare Intelligence' };
    }
  };

  const { title, category } = getPageTitle(location.pathname);

  return (
    <header className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between shrink-0 z-20">
      {/* Page Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-ink-primary tracking-tight">
              {title}
            </h2>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-subtle text-ink-muted border border-border">
              {category}
            </span>
          </div>
          <div className="text-[11px] text-ink-muted flex items-center gap-1.5 mt-0.5">
            <span>Market Observation</span>
            <span>•</span>
            <span className="font-mono">Updated 14:08 IST</span>
            <span>•</span>
            <span>DGCA Basket v1.2</span>
          </div>
        </div>
      </div>

      {/* Global Controls & Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Date Selector Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-subtle border border-border text-xs font-medium text-ink-secondary">
          <Calendar className="w-3.5 h-3.5 text-ink-muted" />
          <span>Travel Date: <strong>16 Sep 2026</strong></span>
        </div>

        {/* Live vs Demo Simulation Mode Toggle */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-subtle text-xs">
          <span className="text-[11px] font-medium text-ink-muted">Mode:</span>
          <button
            onClick={() => {
              const next = !isDemoMode;
              setIsDemoMode(next);
              showToast(next ? 'Demo Mode Active: Mumbai Surge Scenario loaded' : 'Live Data Stream Active');
            }}
            className={clsx(
              'px-2 py-0.5 rounded text-xs font-bold transition-all',
              isDemoMode
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                : 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-sm'
            )}
          >
            {isDemoMode ? 'DEMO SIMULATION' : 'LIVE SCRAPER'}
          </button>
        </div>

        {/* Sarvam Voice Experience Trigger */}
        <button
          onClick={() => setIsVoiceOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-brand-700 to-brand-600 text-white hover:from-brand-800 hover:to-brand-700 text-xs font-semibold shadow-sm transition-all active:scale-95"
          title="Sarvam Voice Indian Language Search"
        >
          <Mic className="w-3.5 h-3.5 animate-pulse" />
          <span className="hidden sm:inline">Voice Search</span>
          <span className="text-[10px] px-1 py-0.2 rounded bg-white/20 font-mono">
            {selectedLanguage.slice(0, 2).toUpperCase()}
          </span>
        </button>

        {/* Ask APIx Copilot Drawer Trigger */}
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100 text-xs font-semibold transition-all active:scale-95"
        >
          <Bot className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline">Ask APIx</span>
        </button>

        {/* User / Government Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold text-xs border border-brand-700" title="Senior Statistical Analyst (NSO / MoSPI)">
            GOV
          </div>
        </div>
      </div>
    </header>
  );
};
