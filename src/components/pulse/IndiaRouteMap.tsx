import React, { useState } from 'react';
import { AIRPORTS } from '../../data/airports';
import { ROUTES, RouteData } from '../../data/routes';
import { useNavigate } from 'react-router-dom';
import { useDemoMode } from '../../context/DemoModeContext';
import { SeverityBadge } from '../common/SeverityBadge';
import { RupeeValue } from '../common/RupeeValue';
import { ArrowRight, Plane } from 'lucide-react';
import clsx from 'clsx';

export const IndiaRouteMap: React.FC = () => {
  const [hoveredRoute, setHoveredRoute] = useState<RouteData | null>(null);
  const [hoveredAirport, setHoveredAirport] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const navigate = useNavigate();
  const { setSelectedRouteId, routes } = useDemoMode();

  const handleRouteClick = (routeId: string) => {
    setSelectedRouteId(routeId);
    navigate(`/route?id=${routeId}`);
  };

  // Helper to generate quadratic Bezier curve path between two airports
  const getCurvePath = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    // Calculate perpendicular offset for elegant arc curvature
    const cx = (x1 + x2) / 2 - dy * 0.18;
    const cy = (y1 + y2) / 2 + dx * 0.18;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  const getRouteColor = (route: RouteData) => {
    if (route.surgePct >= 25) return '#B82323'; // Extreme Surge (Red)
    if (route.surgePct >= 15) return '#EA580C'; // High (Orange)
    if (route.surgePct >= 5) return '#D97706'; // Elevated (Amber)
    if (route.surgePct <= -5) return '#059669'; // Negative/Falling (Green)
    return '#64748B'; // Normal (Muted Slate)
  };

  return (
    <div
      className="relative w-full h-[520px] bg-[#0E1A2B] rounded-lg border border-slate-800 overflow-hidden flex flex-col select-none"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            India Sector Surveillance Network
          </h3>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">
          25 High-Frequency DGCA City-Pairs • Real-Time Surge Propagation
        </p>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute top-4 right-4 z-10 bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-md p-2.5 text-[11px] space-y-1.5 shadow-lg">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Fare Pressure Scale
        </span>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1.5 rounded-sm bg-[#B82323]" />
          <span className="text-slate-200">Extreme Surge (&gt;+25%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1.5 rounded-sm bg-[#EA580C]" />
          <span className="text-slate-200">High (+15% to +25%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1.5 rounded-sm bg-[#D97706]" />
          <span className="text-slate-200">Elevated (+5% to +15%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1.5 rounded-sm bg-[#64748B]" />
          <span className="text-slate-200">Normal (&plusmn;5%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1.5 rounded-sm bg-[#059669]" />
          <span className="text-slate-200">Falling / Discount (&lt;-5%)</span>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <svg
        viewBox="180 80 560 760"
        className="w-full h-full cursor-crosshair"
      >
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          </pattern>
        </defs>

        <rect x="180" y="80" width="560" height="760" fill="url(#grid)" />

        {/* India Subcontinent Stylized Geodetic Coastline & Northern Borders */}
        <path
          d="M 280 120 L 320 100 L 350 140 L 380 200 L 460 270 L 540 280 L 680 290 L 710 320 L 730 350 L 670 380 L 610 400 L 590 460 L 540 510 L 450 670 L 400 730 L 350 820 L 320 800 L 290 730 L 260 620 L 240 500 L 230 420 L 210 380 L 260 330 L 280 240 Z"
          fill="rgba(30, 41, 59, 0.4)"
          stroke="rgba(71, 85, 105, 0.3)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />

        {/* Route Flight Arcs */}
        {routes.map((route) => {
          const origin = AIRPORTS[route.origin];
          const dest = AIRPORTS[route.destination];
          if (!origin || !dest) return null;

          const isHovered = hoveredRoute?.id === route.id;
          const isMumbaiActive = route.id === 'DEL-BOM';
          const strokeColor = getRouteColor(route);
          const pathD = getCurvePath(origin.svgX, origin.svgY, dest.svgX, dest.svgY);

          return (
            <g key={route.id} className="cursor-pointer" onClick={() => handleRouteClick(route.id)}>
              {/* Invisible thick hover hit-area */}
              <path
                d={pathD}
                fill="none"
                stroke="transparent"
                strokeWidth="16"
                onMouseEnter={() => setHoveredRoute(route)}
                onMouseLeave={() => setHoveredRoute(null)}
              />

              {/* Visible arc path */}
              <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth={isHovered ? 3.5 : isMumbaiActive ? 2.8 : 1.4}
                strokeOpacity={isHovered ? 1 : isMumbaiActive ? 0.95 : 0.65}
                strokeDasharray={route.surgePct >= 20 ? 'none' : 'none'}
                className="transition-all duration-200"
              />

              {/* Moving pulse dot for active DEL-BOM surge */}
              {isMumbaiActive && (
                <circle r="3.5" fill="#EF4444" className="animate-ping">
                  <animateMotion path={pathD} dur="3s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}

        {/* Airport Nodes */}
        {Object.values(AIRPORTS).map((airport) => {
          const isHovered = hoveredAirport === airport.iata;
          const isBOM = airport.iata === 'BOM';
          const isDEL = airport.iata === 'DEL';

          return (
            <g
              key={airport.iata}
              transform={`translate(${airport.svgX}, ${airport.svgY})`}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredAirport(airport.iata)}
              onMouseLeave={() => setHoveredAirport(null)}
            >
              {/* Pulsing ring for major surge epicenters (BOM & DEL) */}
              {(isBOM || isDEL) && (
                <circle
                  r={airport.type === 'tier1' ? 16 : 12}
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  className="animate-surge-pulse"
                />
              )}

              {/* Airport node marker */}
              <circle
                r={airport.type === 'tier1' ? 6 : 4}
                fill={isBOM ? '#EF4444' : airport.type === 'tier1' ? '#3B82F6' : '#94A3B8'}
                stroke="#0F172A"
                strokeWidth="1.5"
              />

              {/* Airport Label */}
              <text
                y={airport.type === 'tier1' ? -9 : -7}
                textAnchor="middle"
                className={clsx(
                  'font-mono text-[10px] font-bold fill-slate-300 pointer-events-none tracking-tight',
                  (isBOM || isDEL) && 'fill-rose-400 font-extrabold text-[11px]'
                )}
              >
                {airport.iata}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Dynamic Hover Tooltip Card */}
      {hoveredRoute && (
        <div
          className="absolute z-20 pointer-events-none bg-slate-900/95 border border-slate-700 rounded-lg p-3 text-xs text-white shadow-2xl backdrop-blur-md min-w-[240px] transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${Math.min(Math.max(mousePos.x, 130), 650)}px`,
            top: `${Math.max(mousePos.y - 14, 80)}px`
          }}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-1.5 font-bold text-sm">
              <span>{hoveredRoute.origin}</span>
              <Plane className="w-3.5 h-3.5 text-brand-400" />
              <span>{hoveredRoute.destination}</span>
            </div>
            <SeverityBadge
              level={
                hoveredRoute.surgePct >= 25 ? 'Extreme' :
                hoveredRoute.surgePct >= 15 ? 'High' :
                hoveredRoute.surgePct >= 5 ? 'Elevated' : 'Normal'
              }
              size="sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] mb-2">
            <div>
              <span className="text-slate-400 block">Current Fare</span>
              <span className="text-sm font-bold text-white tabular-nums">
                ₹{hoveredRoute.currentFare.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Baseline Fare</span>
              <span className="text-sm font-semibold text-slate-300 tabular-nums">
                ₹{hoveredRoute.baselineFare.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Surge Movement</span>
              <span className={clsx('font-bold tabular-nums', hoveredRoute.surgePct > 0 ? 'text-rose-400' : 'text-emerald-400')}>
                {hoveredRoute.surgePct > 0 ? `+${hoveredRoute.surgePct}%` : `${hoveredRoute.surgePct}%`}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Pressure Score</span>
              <span className="font-bold text-amber-300 tabular-nums">
                {hoveredRoute.pressureScore} / 100
              </span>
            </div>
          </div>

          {hoveredRoute.primaryDriver && (
            <div className="text-[10px] text-slate-300 bg-slate-800/80 p-1.5 rounded border border-slate-700/60 mb-2">
              <strong className="text-slate-400">Driver:</strong> {hoveredRoute.primaryDriver}
            </div>
          )}

          <div className="flex items-center justify-between text-[10px] text-brand-300 font-semibold pt-1 border-t border-slate-800">
            <span>Click to inspect route intelligence</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      )}

      {/* Bottom status bar */}
      <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded border border-slate-800">
        <div className="flex items-center gap-4">
          <span>Active City-Pairs: <strong className="text-white">25</strong></span>
          <span>Surging Nodes: <strong className="text-rose-400">14 Active</strong></span>
          <span>Primary Bottleneck: <strong className="text-white">Mumbai (BOM) Secondary Runway</strong></span>
        </div>
        <span className="font-mono text-[10px] text-slate-300">
          Source: Automated Multi-Portal Ingestion
        </span>
      </div>
    </div>
  );
};
