import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Mic,
  Bot,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { useDemoMode } from '../../context/DemoModeContext';
import clsx from 'clsx';

export const TopBar: React.FC = () => {
  const location = useLocation();
  const {
    isDemoMode,
    setIsDemoMode,
    travelDate,
    setTravelDate,
    setIsCopilotOpen,
    setIsVoiceOpen,
    selectedLanguage,
    showToast
  } = useDemoMode();

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const formatDisplayDate = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      if (y && m && d) {
        const dateObj = new Date(y, m - 1, d);
        return dateObj.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      }
    } catch {
      // ignore
    }
    return dateStr;
  };

  const getDynamicTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }) + ' IST';
  };

  const handleOpenDatePicker = () => {
    if (dateInputRef.current) {
      if ('showPicker' in HTMLInputElement.prototype) {
        try {
          dateInputRef.current.showPicker();
          return;
        } catch {
          // fallback to dropdown
        }
      }
    }
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const setPresetDate = (daysAhead: number, label: string) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    const dateStr = d.toISOString().split('T')[0];
    setTravelDate(dateStr);
    setIsDatePickerOpen(false);
    showToast(`Travel Date set to ${label} (${formatDisplayDate(dateStr)})`);
  };

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
            <span className="font-mono">Updated {getDynamicTime()}</span>
            <span>•</span>
            <span>DGCA Basket v1.2</span>
          </div>
        </div>
      </div>

      {/* Global Controls & Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Interactive Dynamic Travel Date Selector */}
        <div className="relative hidden lg:block">
          <button
            onClick={handleOpenDatePicker}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-subtle border border-border hover:border-brand-500 text-xs font-medium text-ink-secondary hover:text-ink-primary hover:bg-slate-100/80 transition-all shadow-sm active:scale-95"
            title="Click to select or change travel departure date"
          >
            <Calendar className="w-3.5 h-3.5 text-brand-600" />
            <span>Travel Date: <strong className="text-brand-800 font-bold">{formatDisplayDate(travelDate)}</strong></span>
            <ChevronDown className="w-3 h-3 text-ink-muted ml-0.5" />
          </button>

          {/* Hidden Date Input triggered via showPicker */}
          <input
            ref={dateInputRef}
            type="date"
            value={travelDate}
            onChange={(e) => {
              if (e.target.value) {
                setTravelDate(e.target.value);
                setIsDatePickerOpen(false);
                showToast(`Travel Date updated to ${formatDisplayDate(e.target.value)}`);
              }
            }}
            className="sr-only"
          />

          {/* Date Picker Popover Menu */}
          {isDatePickerOpen && (
            <div className="absolute top-full right-0 mt-1.5 w-64 bg-surface rounded-lg shadow-xl border border-border p-3 z-50 animate-scale-up space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-xs font-bold text-ink-primary flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-600" />
                  Select Departure Date
                </span>
                <button
                  onClick={() => setIsDatePickerOpen(false)}
                  className="text-[11px] text-ink-muted hover:text-ink-primary"
                >
                  ✕
                </button>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-ink-muted block mb-1">
                  Pick Any Date:
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => {
                    if (e.target.value) {
                      setTravelDate(e.target.value);
                      setIsDatePickerOpen(false);
                      showToast(`Travel Date set to ${formatDisplayDate(e.target.value)}`);
                    }
                  }}
                  className="w-full bg-subtle border border-border rounded-md px-2.5 py-1.5 text-xs font-semibold text-ink-primary focus:outline-none focus:border-brand-600 shadow-inner"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block mb-1.5">
                  Quick Advance Windows:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setPresetDate(0, 'Today')}
                    className="px-2 py-1 rounded text-[11px] font-medium bg-subtle hover:bg-brand-50 hover:text-brand-700 border border-border text-left"
                  >
                    Today (T+0)
                  </button>
                  <button
                    onClick={() => setPresetDate(1, 'Tomorrow')}
                    className="px-2 py-1 rounded text-[11px] font-medium bg-subtle hover:bg-brand-50 hover:text-brand-700 border border-border text-left"
                  >
                    Tomorrow (T+1)
                  </button>
                  <button
                    onClick={() => setPresetDate(7, 'Next Week')}
                    className="px-2 py-1 rounded text-[11px] font-medium bg-subtle hover:bg-brand-50 hover:text-brand-700 border border-border text-left"
                  >
                    7 Days (T+7)
                  </button>
                  <button
                    onClick={() => setPresetDate(15, 'Fortnight')}
                    className="px-2 py-1 rounded text-[11px] font-medium bg-subtle hover:bg-brand-50 hover:text-brand-700 border border-border text-left"
                  >
                    15 Days (T+15)
                  </button>
                  <button
                    onClick={() => setPresetDate(30, 'Next Month')}
                    className="px-2 py-1 rounded text-[11px] font-medium bg-subtle hover:bg-brand-50 hover:text-brand-700 border border-border text-left col-span-2"
                  >
                    30 Days Advance (T+30)
                  </button>
                </div>
              </div>
            </div>
          )}
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
