import React, { useState, useEffect, useMemo, useRef } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { AIRPORTS, Airport } from '../../data/airports';
import { RouteData } from '../../data/routes';
import { useNavigate } from 'react-router-dom';
import { useDemoMode } from '../../context/DemoModeContext';
import { SeverityBadge } from '../common/SeverityBadge';
import {
  buildStateHeatmap,
  getStateStyle,
  StateHeatmap,
  StateHeatEntry,
} from '../../utils/stateRouteHeatmap';
import {
  ArrowRight,
  Plane,
  Maximize2,
  Minimize2,
  Radio,
  Layers,
  Sparkles,
  Info,
  X,
  ExternalLink,
} from 'lucide-react';
import clsx from 'clsx';

interface GeoFeature {
  type: string;
  properties: {
    st_nm: string;
    st_code?: string;
  };
  geometry: any;
}

interface GeoData {
  type: string;
  features: GeoFeature[];
}

export const IndiaRouteMap: React.FC = () => {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [districtMeshD, setDistrictMeshD] = useState<string | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<RouteData | null>(null);
  const [hoveredAirport, setHoveredAirport] = useState<Airport | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDistricts, setShowDistricts] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setSelectedRouteId, routes, travelDate } = useDemoMode();

  // Load GeoJSON and district mesh locally from public/data
  useEffect(() => {
    let isMounted = true;

    fetch('/data/india-states.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: GeoData) => {
        if (isMounted) setGeoData(data);
      })
      .catch((err) => {
        console.error('Error loading india-states.json:', err);
      });

    fetch('/data/india-districts-mesh.json')
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (isMounted && data?.d) {
          setDistrictMeshD(data.d);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Sync fullscreen change if user toggles via browser shortcuts (F11)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      if (containerRef.current && !document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(() => {
          // In-window fullscreen fallback works automatically via React state
        });
      }
    } else {
      setIsFullscreen(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Projection setup centered strictly on the Indian subcontinent
  const projection = useMemo(() => {
    return geoMercator()
      .scale(980)
      .center([82.0, 23.0])
      .translate([400, 300]);
  }, []);

  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  // Projected SVG coordinates for all airports based on their real lat/lng
  const projectedAirports = useMemo(() => {
    const result: Record<string, { x: number; y: number; airport: Airport }> = {};
    for (const airport of Object.values(AIRPORTS)) {
      const pt = projection([airport.lng, airport.lat]);
      if (pt) {
        result[airport.iata] = {
          x: Math.round(pt[0] * 10) / 10,
          y: Math.round(pt[1] * 10) / 10,
          airport,
        };
      }
    }
    return result;
  }, [projection]);

  // State route heatmap aggregation
  const stateHeatmap: StateHeatmap = useMemo(() => {
    return buildStateHeatmap(routes);
  }, [routes]);

  // Helper to generate quadratic Bezier curve path between two projected coordinates
  const getCurvePath = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    // Calculate perpendicular offset for natural great-circle curvature
    const cx = (x1 + x2) / 2 - dy * 0.18;
    const cy = (y1 + y2) / 2 + dx * 0.18;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  const getRouteColor = (route: RouteData) => {
    if (route.surgePct >= 25) return '#EF4444'; // Extreme Surge (Red)
    if (route.surgePct >= 15) return '#F97316'; // High (Orange)
    if (route.surgePct >= 5) return '#EAB308'; // Elevated (Amber)
    if (route.surgePct <= -5) return '#10B981'; // Discount/Falling (Green)
    return '#64748B'; // Normal (Muted Slate)
  };

  const handleRouteClick = (routeId: string) => {
    setSelectedRouteId(routeId);
    navigate(`/route?id=${routeId}`);
  };

  const handleStateClick = (stateName: string) => {
    const heat = stateHeatmap.get(stateName);
    setSelectedState(selectedState === stateName ? null : stateName);
    if (heat?.dominantRoute) {
      setSelectedRouteId(heat.dominantRoute.id);
    }
  };

  const selectedStateData = selectedState ? stateHeatmap.get(selectedState) : null;
  const hoveredStateData = hoveredState ? stateHeatmap.get(hoveredState) : null;

  return (
    <div
      ref={containerRef}
      className={clsx(
        'bg-[#0E1A2B] border border-slate-800 transition-all select-none overflow-hidden flex flex-col',
        isFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen rounded-none p-4 md:p-6'
          : 'relative w-full h-[540px] rounded-lg'
      )}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {/* Top Header Overlay */}
      <div className="absolute top-3.5 left-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ring-4 ring-emerald-500/20" />
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>India Sector Surveillance Network</span>
            {isFullscreen && (
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                FULLSCREEN GRID
              </span>
            )}
          </h3>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
          <span>Real TopoJSON Geospatial Intelligence</span>
          <span>•</span>
          <span className="text-slate-300">25 Monitored Corridors</span>
          <span>•</span>
          <span className="text-emerald-400 font-medium">State Surge Heatmap</span>
        </p>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute top-3.5 right-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-md p-2.5 text-[11px] space-y-1.5 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Fare Pressure
          </span>
          <button
            onClick={() => setShowDistricts(!showDistricts)}
            className="text-[10px] font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors pointer-events-auto"
            title="Toggle district geodetic mesh"
          >
            <Layers className="w-3 h-3 text-brand-400" />
            <span>{showDistricts ? 'Mesh: On' : 'Mesh: Off'}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-2 rounded-sm bg-[#881337] border border-rose-500/60" />
          <span className="text-slate-200">Extreme Surge (&gt;+25%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-2 rounded-sm bg-[#9a3412] border border-orange-500/60" />
          <span className="text-slate-200">High (+15% to +25%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-2 rounded-sm bg-[#78350f] border border-amber-500/60" />
          <span className="text-slate-200">Elevated (+5% to +15%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-2 rounded-sm bg-[#1a283e] border border-slate-600" />
          <span className="text-slate-300">Normal (&plusmn;5%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-2 rounded-sm bg-[#064e3b] border border-emerald-500/60" />
          <span className="text-slate-200">Discount (&lt;-5%)</span>
        </div>
      </div>

      {/* Main Map SVG Viewport */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center">
        <svg
          viewBox="140 10 540 590"
          className="w-full h-full cursor-crosshair overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Subtle radar surveillance grid pattern */}
            <pattern id="radarGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(255,255,255,0.025)"
                strokeWidth="0.5"
              />
            </pattern>

            {/* Glowing filter for high-surge flight arcs */}
            <filter id="surgeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Radial gradient for oceanic depth */}
            <radialGradient id="oceanGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#0d1b2e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#08101d" stopOpacity="1" />
            </radialGradient>
          </defs>

          {/* Background Oceanic / Radar Fill */}
          <rect x="140" y="10" width="540" height="590" fill="url(#oceanGlow)" />
          <rect x="140" y="10" width="540" height="590" fill="url(#radarGrid)" />

          {/* State Polygons (Real TopoJSON Choropleth) */}
          <g className="states-group">
            {geoData?.features.map((feature, idx) => {
              const stateName = feature.properties.st_nm;
              const heat = stateHeatmap.get(stateName);
              const isHovered = hoveredState === stateName;
              const isSelected = selectedState === stateName;
              const pathD = pathGenerator(feature as any);
              if (!pathD) return null;

              const style = getStateStyle(stateName, heat, isHovered, isSelected);

              return (
                <path
                  key={feature.properties.st_code || `${stateName}-${idx}`}
                  d={pathD}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  fillOpacity={style.fillOpacity}
                  className="transition-colors duration-150 cursor-pointer"
                  onMouseEnter={() => setHoveredState(stateName)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => handleStateClick(stateName)}
                />
              );
            })}
          </g>

          {/* Precomputed District Geodetic Mesh Overlay */}
          {showDistricts && districtMeshD && (
            <path
              d={districtMeshD}
              fill="none"
              stroke="rgba(148, 163, 184, 0.08)"
              strokeWidth="0.4"
              strokeDasharray="2 3"
              className="pointer-events-none"
            />
          )}

          {/* Route Flight Arcs (Projected on accurate coordinates) */}
          <g className="routes-group">
            {routes.map((route) => {
              const originProj = projectedAirports[route.origin];
              const destProj = projectedAirports[route.destination];
              if (!originProj || !destProj) return null;

              const isHovered = hoveredRoute?.id === route.id;
              const isEpicenter = route.id === 'DEL-BOM';
              const isStateSelected =
                selectedState &&
                (AIRPORTS[route.origin]?.stateName === selectedState ||
                  AIRPORTS[route.destination]?.stateName === selectedState);

              const strokeColor = getRouteColor(route);
              const pathD = getCurvePath(originProj.x, originProj.y, destProj.x, destProj.y);

              return (
                <g
                  key={route.id}
                  className="cursor-pointer"
                  onClick={() => handleRouteClick(route.id)}
                >
                  {/* Invisible thick hover hit-area for effortless clicking/hovering */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="14"
                    onMouseEnter={() => setHoveredRoute(route)}
                    onMouseLeave={() => setHoveredRoute(null)}
                  />

                  {/* Route arc path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isHovered ? 3.6 : isStateSelected ? 2.8 : isEpicenter ? 2.4 : 1.2}
                    strokeOpacity={
                      isHovered ? 1 : isStateSelected ? 0.95 : isEpicenter ? 0.85 : 0.45
                    }
                    filter={isHovered || isEpicenter ? 'url(#surgeGlow)' : undefined}
                    className="transition-all duration-150"
                  />

                  {/* Animated Moving Pulse Dot for Active Surge Routes */}
                  {(isEpicenter || (route.surgePct >= 20 && isHovered)) && (
                    <circle r="3.2" fill="#EF4444">
                      <animateMotion path={pathD} dur="2.8s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              );
            })}
          </g>

          {/* Airport Nodes & Status Rings */}
          <g className="airports-group">
            {Object.values(AIRPORTS).map((airport) => {
              const proj = projectedAirports[airport.iata];
              if (!proj) return null;

              const isHovered = hoveredAirport?.iata === airport.iata;
              const isBOM = airport.iata === 'BOM';
              const isDEL = airport.iata === 'DEL';
              const isTier1 = airport.type === 'tier1';
              const isInSelectedState = selectedState && airport.stateName === selectedState;

              return (
                <g
                  key={airport.iata}
                  transform={`translate(${proj.x}, ${proj.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredAirport(airport)}
                  onMouseLeave={() => setHoveredAirport(null)}
                >
                  {/* Outer Pulsing Ring for National Epicenters */}
                  {(isBOM || isDEL || isInSelectedState) && (
                    <circle
                      r={isTier1 ? 14 : 10}
                      fill="none"
                      stroke={isInSelectedState ? '#38BDF8' : '#EF4444'}
                      strokeWidth="1.4"
                      className="animate-pulse opacity-75"
                    />
                  )}

                  {/* Airport Node Circle */}
                  <circle
                    r={isHovered ? (isTier1 ? 6.5 : 5) : isTier1 ? 5 : 3.5}
                    fill={
                      isBOM
                        ? '#EF4444'
                        : isDEL
                        ? '#F97316'
                        : isInSelectedState
                        ? '#38BDF8'
                        : isTier1
                        ? '#3B82F6'
                        : '#94A3B8'
                    }
                    stroke="#0B1322"
                    strokeWidth="1.5"
                    className="transition-all duration-150"
                  />

                  {/* Airport IATA Label */}
                  <text
                    y={isTier1 ? -8 : -6}
                    textAnchor="middle"
                    className={clsx(
                      'font-mono text-[9.5px] font-bold fill-slate-300 pointer-events-none tracking-tight',
                      (isBOM || isDEL) && 'fill-rose-300 font-extrabold text-[10.5px]',
                      isInSelectedState && 'fill-sky-300 font-extrabold text-[10px]'
                    )}
                  >
                    {airport.iata}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Route Hover Tooltip */}
        {hoveredRoute && (
          <div
            className="absolute z-30 pointer-events-none bg-slate-900/95 border border-slate-700 rounded-lg p-3 text-xs text-white shadow-2xl backdrop-blur-md min-w-[240px] transform -translate-x-1/2 -translate-y-full animate-in fade-in zoom-in-95 duration-100"
            style={{
              left: `${Math.min(Math.max(mousePos.x, 140), 660)}px`,
              top: `${Math.max(mousePos.y - 14, 70)}px`,
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
                  hoveredRoute.surgePct >= 25
                    ? 'Extreme'
                    : hoveredRoute.surgePct >= 15
                    ? 'High'
                    : hoveredRoute.surgePct >= 5
                    ? 'Elevated'
                    : 'Normal'
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
                <span
                  className={clsx(
                    'font-bold tabular-nums',
                    hoveredRoute.surgePct > 0 ? 'text-rose-400' : 'text-emerald-400'
                  )}
                >
                  {hoveredRoute.surgePct > 0
                    ? `+${hoveredRoute.surgePct}%`
                    : `${hoveredRoute.surgePct}%`}
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

        {/* State Hover Tooltip (When not hovering a route) */}
        {!hoveredRoute && hoveredState && (
          <div
            className="absolute z-30 pointer-events-none bg-slate-900/95 border border-slate-700/90 rounded-lg p-3 text-xs text-white shadow-2xl backdrop-blur-md min-w-[210px] transform -translate-x-1/2 -translate-y-full animate-in fade-in duration-100"
            style={{
              left: `${Math.min(Math.max(mousePos.x, 130), 670)}px`,
              top: `${Math.max(mousePos.y - 14, 70)}px`,
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
              <span className="font-bold text-sm text-white">{hoveredState}</span>
              {hoveredStateData && hoveredStateData.routeCount > 0 ? (
                <span
                  className={clsx(
                    'text-[10px] font-semibold px-2 py-0.5 rounded-full border',
                    hoveredStateData.status === 'Extreme' &&
                      'bg-rose-950/80 text-rose-300 border-rose-800',
                    hoveredStateData.status === 'High' &&
                      'bg-orange-950/80 text-orange-300 border-orange-800',
                    hoveredStateData.status === 'Elevated' &&
                      'bg-amber-950/80 text-amber-300 border-amber-800',
                    hoveredStateData.status === 'Discount' &&
                      'bg-emerald-950/80 text-emerald-300 border-emerald-800',
                    hoveredStateData.status === 'Normal' &&
                      'bg-slate-800 text-slate-300 border-slate-700'
                  )}
                >
                  {hoveredStateData.status} Surge
                </span>
              ) : (
                <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                  Regional
                </span>
              )}
            </div>

            {hoveredStateData && hoveredStateData.routeCount > 0 ? (
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Surveillance Hubs:</span>
                  <span className="font-mono font-bold text-sky-400">
                    {hoveredStateData.airports.join(', ')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Monitored Routes:</span>
                  <span className="font-bold text-white">{hoveredStateData.routeCount} pairs</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Average Surge:</span>
                  <span
                    className={clsx(
                      'font-bold tabular-nums',
                      hoveredStateData.surge > 0 ? 'text-rose-400' : 'text-emerald-400'
                    )}
                  >
                    {hoveredStateData.surge > 0
                      ? `+${hoveredStateData.surge}%`
                      : `${hoveredStateData.surge}%`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Pressure Score:</span>
                  <span className="font-bold text-amber-300 tabular-nums">
                    {hoveredStateData.pressure} / 100
                  </span>
                </div>
                {hoveredStateData.dominantRoute && (
                  <div className="pt-1.5 border-t border-slate-800 text-[10px] text-sky-300 flex items-center justify-between">
                    <span>Click to isolate {hoveredStateData.dominantRoute.id}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">
                Representative state with no primary hub. Feeds secondary CPI travel basket.
              </p>
            )}
          </div>
        )}

        {/* Airport Hover Tooltip */}
        {!hoveredRoute && !hoveredState && hoveredAirport && (
          <div
            className="absolute z-30 pointer-events-none bg-slate-900/95 border border-slate-700 rounded-lg p-2.5 text-xs text-white shadow-xl backdrop-blur-md min-w-[200px] transform -translate-x-1/2 -translate-y-full animate-in fade-in duration-100"
            style={{
              left: `${Math.min(Math.max(mousePos.x, 130), 670)}px`,
              top: `${Math.max(mousePos.y - 12, 70)}px`,
            }}
          >
            <div className="font-bold text-sm text-sky-400 flex items-center gap-1.5">
              <span>{hoveredAirport.iata}</span>
              <span className="text-slate-400 font-normal text-xs">({hoveredAirport.city})</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">{hoveredAirport.name}</p>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 pt-1.5 border-t border-slate-800">
              <span>Share: {hoveredAirport.trafficShare}%</span>
              <span className="capitalize text-slate-300">{hoveredAirport.type} Hub</span>
            </div>
          </div>
        )}
      </div>

      {/* Selected State Telemetry Inspector (Docked at left in Fullscreen or overlay in card) */}
      {selectedState && selectedStateData && selectedStateData.routeCount > 0 && (
        <div className="absolute bottom-12 left-4 z-20 bg-slate-900/95 border border-sky-500/50 rounded-lg p-3 text-xs text-white shadow-2xl backdrop-blur-md max-w-[280px] animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-bold text-sky-200">{selectedState}</span>
            </div>
            <button
              onClick={() => setSelectedState(null)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-[11px] space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Peak Surge:</span>
              <span className="font-bold text-rose-400">+{selectedStateData.maxSurge}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Active Hubs:</span>
              <span className="font-mono text-slate-200">
                {selectedStateData.airports.join(', ')}
              </span>
            </div>
            {selectedStateData.dominantRoute && (
              <button
                onClick={() => handleRouteClick(selectedStateData.dominantRoute!.id)}
                className="w-full mt-2 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold text-[11px] transition-all"
              >
                <span>Inspect {selectedStateData.dominantRoute.id}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bottom Status Bar with Fullscreen Option at Bottom Corner */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded border border-slate-800">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <span className="truncate">
            Active City-Pairs: <strong className="text-white">25</strong>
          </span>
          <span className="hidden sm:inline">
            Surging Nodes: <strong className="text-rose-400">14 Active</strong>
          </span>
          <span className="hidden md:inline truncate">
            Surveillance Date: <strong className="text-sky-300">{travelDate}</strong>
          </span>
        </div>

        {/* User Option to Open in Full Screen at Bottom Corner */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="hidden lg:inline font-mono text-[10px] text-slate-400">
            Source: Live Ingestion Engine
          </span>
          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-[11px] font-semibold transition-all shadow-sm active:scale-95"
            title={isFullscreen ? 'Exit full screen (Esc)' : 'Open map in full screen'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Fullscreen Map</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
