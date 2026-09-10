import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { useDemoMode } from '../context/DemoModeContext';
import { PowerBiLogo } from '../components/powerbi/PowerBiDashboardModal';
import {
  Download,
  RefreshCw,
  Share2,
  Filter,
  Layers,
  FileSpreadsheet,
  BarChart3,
  SlidersHorizontal,
  ArrowUpRight,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import clsx from 'clsx';

export const PowerBiAnalytics: React.FC = () => {
  const { routes, nationalKpis, travelDate, showToast } = useDemoMode();
  const [activeTab, setActiveTab] = useState<'overview' | 'carrier' | 'geo' | 'data'>('overview');
  const [selectedCarrier, setSelectedCarrier] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Power BI DirectQuery dataset refreshed from APIx real-time feed');
    }, 600);
  };

  const filteredRoutes = routes.filter((r) => {
    if (selectedCategory !== 'All' && r.category !== selectedCategory) return false;
    return true;
  });

  const carrierData = [
    { carrier: 'IndiGo (6E)', avgFare: 6720, baseline: 5600, surgePct: 20.0, share: '62%' },
    { carrier: 'Air India (AI)', avgFare: 7450, baseline: 6100, surgePct: 22.1, share: '24%' },
    { carrier: 'SpiceJet (SG)', avgFare: 6380, baseline: 5450, surgePct: 17.1, share: '7%' },
    { carrier: 'Akasa Air (QP)', avgFare: 6190, baseline: 5380, surgePct: 15.1, share: '5%' },
    { carrier: 'Vistara (Merged)', avgFare: 7890, baseline: 6400, surgePct: 23.3, share: '2%' },
  ].filter((c) => selectedCarrier === 'All' || c.carrier.includes(selectedCarrier));

  const sectorData = [
    { sector: 'DEL-BOM', dynamicFare: 7480, baselineFare: 5825, surgePct: 28.4, pressure: 84 },
    { sector: 'BOM-BLR', dynamicFare: 6920, baselineFare: 5710, surgePct: 21.2, pressure: 76 },
    { sector: 'DEL-BLR', dynamicFare: 7840, baselineFare: 6850, surgePct: 14.5, pressure: 68 },
    { sector: 'BOM-GOI', dynamicFare: 5120, baselineFare: 4000, surgePct: 28.0, pressure: 80 },
    { sector: 'DEL-CCU', dynamicFare: 6180, baselineFare: 5650, surgePct: 9.4, pressure: 52 },
    { sector: 'DEL-SXR', dynamicFare: 8420, baselineFare: 6400, surgePct: 31.5, pressure: 88 },
    { sector: 'BLR-HYD', dynamicFare: 4250, baselineFare: 3630, surgePct: 17.1, pressure: 64 },
    { sector: 'MAA-DEL', dynamicFare: 7120, baselineFare: 6750, surgePct: 5.5, pressure: 48 },
  ];

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Power BI Ministerial Analytics Workspace"
        subtitle="Embedded Microsoft Power BI Service dashboard analyzing national airfare surge trends, carrier market concentration, and CPI index sensitivity."
        badge={
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
            <PowerBiLogo className="w-3.5 h-3.5" />
            <span>Power BI DirectQuery Connected</span>
          </span>
        }
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface text-xs font-semibold text-ink-secondary hover:bg-subtle transition-all active:scale-95"
            >
              <RefreshCw className={clsx('w-3.5 h-3.5 text-amber-600', isRefreshing && 'animate-spin')} />
              <span>Sync DirectQuery</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-ink-muted px-2.5 py-1 rounded bg-subtle border border-border">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>MoCA & MoSPI Direct Access</span>
            </div>
          </div>
        }
      />

      {/* Embedded Power BI Container */}
      <div className="w-full bg-[#F3F4F6] rounded-xl shadow-lg border border-slate-300 overflow-hidden flex flex-col font-sans">
        {/* Ribbon Bar */}
        <div className="bg-[#1E1E1E] text-white px-4 py-2 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <PowerBiLogo className="w-6 h-6" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs">Microsoft Power BI Service</span>
                <span className="text-[10px] bg-neutral-700 text-neutral-300 px-1.5 py-0.2 rounded font-mono">
                  PRO WORKSPACE
                </span>
              </div>
              <span className="text-[10px] text-neutral-400">
                Aviation Economics Surveillance Unit • Live Pipeline v1.2
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Power BI analytical report exported')}
              className="flex items-center gap-1 text-[11px] bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-2.5 py-1 rounded border border-neutral-700"
            >
              <Download className="w-3 h-3 text-neutral-300" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => showToast('Power BI dashboard link copied for Teams sharing')}
              className="flex items-center gap-1 text-[11px] bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-2.5 py-1 rounded border border-neutral-700"
            >
              <Share2 className="w-3 h-3 text-neutral-300" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Filters Slicers Bar */}
        <div className="bg-white border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3 h-3 text-slate-400" /> Carrier Slicer:
              </span>
              <select
                value={selectedCarrier}
                onChange={(e) => setSelectedCarrier(e.target.value)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded px-2 py-1 border border-slate-300 focus:outline-none"
              >
                <option value="All">All Carriers (Total Market)</option>
                <option value="IndiGo">IndiGo (6E)</option>
                <option value="Air India">Air India Group (AI)</option>
                <option value="SpiceJet">SpiceJet (SG)</option>
                <option value="Akasa Air">Akasa Air (QP)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Category Slicer:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded px-2 py-1 border border-slate-300 focus:outline-none"
              >
                <option value="All">All 25 Representative Corridors</option>
                <option value="Metro">Metro Trunk</option>
                <option value="Business">Business High-Density</option>
                <option value="Tourism">Tourism / Seasonal</option>
                <option value="Regional">Regional UDAN</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span>Surveillance Date: <strong>{travelDate}</strong></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>DirectQuery: <strong>Connected</strong></span>
          </div>
        </div>

        {/* Power BI Canvas */}
        <div className="p-4 space-y-4 bg-[#F0F2F5]">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Airfare CPI Index
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 font-mono">
                  {nationalKpis.indexValue}
                </span>
                <span className="text-xs font-bold text-rose-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3" /> +3.3%
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Laspeyres weighted baseline</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                National Fare Pressure
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-rose-600 font-mono">
                  {nationalKpis.farePressure} / 100
                </span>
                <span className="text-xs text-slate-500 font-semibold">Surge Active</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {nationalKpis.routesUnderSurge} sectors exceeding threshold
              </span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Average Dynamic Premium
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-600 font-mono">₹1,655</span>
                <span className="text-xs font-semibold text-slate-500">per ticket</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Spread over DGCA baseline</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Carrier Yield / ASKM
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 font-mono">₹5.42</span>
                <span className="text-xs font-bold text-emerald-600">+18.4%</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Passenger kilometer yield</span>
            </div>
          </div>

          {/* Visuals Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <h4 className="font-bold text-xs text-slate-900">
                  Dynamic Fare vs Baseline Index by Sector (₹)
                </h4>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-600">
                  Clustered Bar Visual
                </span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="sector" tick={{ fontSize: 10, fill: '#64748B' }} interval={0} angle={-20} textAnchor="end" />
                    <YAxis tick={{ fontSize: 10, fill: '#64748B' }} tickFormatter={(v) => `₹${v / 1000}k`} />
                    <Tooltip formatter={(v: any, name: any) => [`₹${Number(v).toLocaleString('en-IN')}`, name === 'dynamicFare' ? 'Dynamic Spot Fare' : 'Baseline Fare']} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} formatter={(v) => v === 'dynamicFare' ? 'Dynamic Spot Fare' : 'Baseline Fare'} />
                    <Bar dataKey="baselineFare" fill="#94A3B8" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="dynamicFare" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <h4 className="font-bold text-xs text-slate-900">
                    Carrier Surge Premium Spread (%)
                  </h4>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-600">
                    Carrier Slicer
                  </span>
                </div>
                <div className="space-y-3">
                  {carrierData.map((c) => (
                    <div key={c.carrier} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-800">{c.carrier}</span>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-slate-500">Mkt: {c.share}</span>
                          <span className="font-bold text-rose-600">+{c.surgePct}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                        <div
                          className="bg-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(c.surgePct * 3.5, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2.5 bg-amber-50 rounded border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2 mt-4">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>MoCA Regulatory Insight:</strong> IndiGo and Air India capture 86% of total surge margin across high-frequency metro sectors.
                </span>
              </div>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                <h4 className="font-bold text-xs text-slate-900">
                  DirectQuery Ingestion: Dynamic Airfare Observation Table
                </h4>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                APIx Gateway v1.2 • 25 Rows
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-3.5 py-2">Sector</th>
                    <th className="px-3.5 py-2">Category</th>
                    <th className="px-3.5 py-2 text-right">Distance (km)</th>
                    <th className="px-3.5 py-2 text-right">Baseline Fare</th>
                    <th className="px-3.5 py-2 text-right">Dynamic Fare</th>
                    <th className="px-3.5 py-2 text-right">Surge %</th>
                    <th className="px-3.5 py-2 text-center">Pressure Score</th>
                    <th className="px-3.5 py-2">Primary Catalyst</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {filteredRoutes.map((route) => (
                    <tr key={route.id} className="hover:bg-amber-50/40">
                      <td className="px-3.5 py-2 font-bold text-slate-900 font-sans">
                        {route.origin} → {route.destination}
                      </td>
                      <td className="px-3.5 py-2 font-sans text-slate-600">{route.category}</td>
                      <td className="px-3.5 py-2 text-right text-slate-600">{route.distanceKm}</td>
                      <td className="px-3.5 py-2 text-right text-slate-600">
                        ₹{route.baselineFare.toLocaleString('en-IN')}
                      </td>
                      <td className="px-3.5 py-2 text-right font-bold text-slate-900">
                        ₹{route.currentFare.toLocaleString('en-IN')}
                      </td>
                      <td className="px-3.5 py-2 text-right font-bold">
                        <span className={route.surgePct >= 15 ? 'text-rose-600' : 'text-amber-600'}>
                          +{route.surgePct}%
                        </span>
                      </td>
                      <td className="px-3.5 py-2 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-[10px]">
                          {route.pressureScore} / 100
                        </span>
                      </td>
                      <td className="px-3.5 py-2 font-sans text-slate-600 text-[10px]">
                        {route.primaryDriver || 'Standard dynamic adjustment'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tab Footer */}
        <div className="bg-[#2B2B2B] text-neutral-300 px-3 py-1.5 flex items-center justify-between border-t border-neutral-700 text-xs">
          <div className="flex items-center gap-1">
            <span className="bg-white text-slate-900 font-bold px-3 py-1 rounded text-xs">
              Executive Overview
            </span>
            <span className="text-neutral-400 hover:text-white px-3 py-1 rounded text-xs cursor-pointer">
              Carrier Parity
            </span>
            <span className="text-neutral-400 hover:text-white px-3 py-1 rounded text-xs cursor-pointer">
              Geographic Heatmap
            </span>
          </div>
          <span className="text-[10px] text-neutral-400 font-mono">
            Microsoft Power BI Embedded Workspace • APIx Integration
          </span>
        </div>
      </div>
    </div>
  );
};
