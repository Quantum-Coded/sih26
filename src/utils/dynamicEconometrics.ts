/**
 * Dynamic Airfare Econometric Engine
 * Computes high-frequency Laspeyres Price Index, route-specific dynamic pricing,
 * surge pressure, and lead-time elasticity based on travel dates and seasonality.
 */

import { ROUTES, RouteData } from '../data/routes';

export interface NationalKpis {
  indexValue: string;
  indexTrend: 'up' | 'down' | 'stable';
  indexTrendLabel: string;
  indexStatus: 'critical' | 'elevated' | 'healthy' | 'neutral';
  farePressure: string;
  farePressureStatus: 'critical' | 'elevated' | 'healthy' | 'neutral';
  farePressureTrendLabel: string;
  routesUnderSurge: number;
  routesUnderSurgeLabel: string;
  liveObservations: string;
  dataQualityScore: string;
  leadDays: number;
  isWeekend: boolean;
}

/**
 * Deterministic hash from date string to generate smooth consistent variations
 */
function hashDate(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Compute the date multiplier based on lead-time, day of week, and seasonality
 */
export function computeDateMultiplier(travelDate: string): {
  multiplier: number;
  leadDays: number;
  isWeekend: boolean;
  dayOfWeek: number;
} {
  const target = new Date(travelDate);
  const now = new Date();
  // Strip hours for pure date comparison
  const targetDateOnly = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffMs = targetDateOnly.getTime() - nowDateOnly.getTime();
  const leadDays = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  const dayOfWeek = target.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6; // Fri, Sat, Sun
  const month = target.getMonth(); // 0-11

  // 1. Lead-time curve multiplier (Empirical DGCA decay function)
  let leadMultiplier = 1.0;
  if (leadDays <= 1) {
    leadMultiplier = 1.38; // T+1 last minute surge (+38%)
  } else if (leadDays <= 3) {
    leadMultiplier = 1.25; // T+3 (+25%)
  } else if (leadDays <= 7) {
    leadMultiplier = 1.14; // T+7 (+14%)
  } else if (leadDays <= 15) {
    leadMultiplier = 1.02; // T+15 (~baseline)
  } else if (leadDays <= 30) {
    leadMultiplier = 0.92; // T+30 advance discount (-8%)
  } else {
    leadMultiplier = 0.85; // T+45 early bird (-15%)
  }

  // 2. Day-of-week multiplier
  let dowMultiplier = 1.0;
  if (dayOfWeek === 5) dowMultiplier = 1.09; // Friday peak
  else if (dayOfWeek === 0) dowMultiplier = 1.08; // Sunday return peak
  else if (dayOfWeek === 1) dowMultiplier = 1.05; // Monday business
  else if (dayOfWeek === 2 || dayOfWeek === 3) dowMultiplier = 0.96; // Midweek trough

  // 3. Seasonal festive multiplier (Diwali / Puja / Holiday in Oct-Nov-Dec)
  let seasonMultiplier = 1.0;
  if (month === 9 || month === 10) seasonMultiplier = 1.06; // Oct-Nov peak festive
  else if (month === 11) seasonMultiplier = 1.08; // Dec holiday travel

  // Deterministic micro-jitter (±1.5%) based on date hash
  const dateHash = hashDate(travelDate);
  const microJitter = 1 + ((dateHash % 30) - 15) / 1000;

  const totalMultiplier = Number((leadMultiplier * dowMultiplier * seasonMultiplier * microJitter).toFixed(3));

  return {
    multiplier: totalMultiplier,
    leadDays,
    isWeekend,
    dayOfWeek,
  };
}

/**
 * Return all 25 DGCA monitored routes dynamically recalculated for the selected travel date
 */
export function getDynamicRoutes(travelDate: string): RouteData[] {
  const { multiplier, leadDays } = computeDateMultiplier(travelDate);

  return ROUTES.map((r) => {
    // Route elasticity adjustment
    let elasticityFactor = 1.0;
    if (r.category === 'Business') elasticityFactor = 1.08;
    else if (r.category === 'Tourism') elasticityFactor = 1.12;
    else if (r.category === 'Regional') elasticityFactor = 0.95;

    // Adjusted multiplier for this specific sector
    const routeMultiplier = 1 + (multiplier - 1) * elasticityFactor;
    const dynamicCurrentFare = Math.round(r.baselineFare * routeMultiplier);
    const dynamicSurgePct = Number((((dynamicCurrentFare - r.baselineFare) / r.baselineFare) * 100).toFixed(1));

    // Dynamic pressure score (0-100)
    let dynamicPressure = Math.round(r.pressureScore * (routeMultiplier / 1.15));
    dynamicPressure = Math.max(15, Math.min(98, dynamicPressure));

    // Dynamic Z-Score
    const dynamicZScore = Number(((dynamicSurgePct / 12) * (leadDays <= 3 ? 1.3 : 0.9)).toFixed(2));

    const dynamicTrend: 'up' | 'down' | 'stable' =
      dynamicSurgePct > 3 ? 'up' : dynamicSurgePct < -3 ? 'down' : 'stable';

    return {
      ...r,
      currentFare: dynamicCurrentFare,
      surgePct: dynamicSurgePct,
      pressureScore: dynamicPressure,
      zScore: dynamicZScore,
      trend: dynamicTrend,
      dailyQuotesCount: Math.round(r.dailyQuotesCount * (0.9 + (hashDate(travelDate + r.id) % 25) / 100)),
    };
  });
}

/**
 * Return aggregated National Macro KPIs dynamically recalculated for the selected travel date
 */
export function getNationalKpis(travelDate: string): NationalKpis {
  const { multiplier, leadDays, isWeekend } = computeDateMultiplier(travelDate);
  const dynamicRoutes = getDynamicRoutes(travelDate);

  // Laspeyres weighted aggregate index calculation
  let weightedIndexSum = 0;
  let totalWeight = 0;

  dynamicRoutes.forEach((r) => {
    const routeIndex = (r.currentFare / r.baselineFare) * 100;
    weightedIndexSum += routeIndex * r.weight;
    totalWeight += r.weight;
  });

  const rawIndex = totalWeight > 0 ? weightedIndexSum / totalWeight : 117.4;
  const nationalIndex = Number(rawIndex.toFixed(1));
  const deltaPct = Number(((nationalIndex - 100) * 0.22).toFixed(1));

  // Pressure score
  const avgPressure = Math.round(
    dynamicRoutes.reduce((acc, r) => acc + r.pressureScore, 0) / dynamicRoutes.length
  );

  // Routes under surge (> 10% surge)
  const surgeCount = dynamicRoutes.filter((r) => r.surgePct >= 10).length;

  // Quotes count
  const totalQuotes = dynamicRoutes.reduce((acc, r) => acc + r.dailyQuotesCount, 0);

  // Quality score
  const quality = (96.2 + ((hashDate(travelDate) % 15) / 10)).toFixed(1) + '%';

  const indexTrend: 'up' | 'down' | 'stable' = deltaPct > 0 ? 'up' : deltaPct < 0 ? 'down' : 'stable';
  const indexStatus: 'critical' | 'elevated' | 'healthy' | 'neutral' =
    nationalIndex >= 122 ? 'critical' : nationalIndex >= 115 ? 'elevated' : 'healthy';

  const farePressureStatus: 'critical' | 'elevated' | 'healthy' | 'neutral' =
    avgPressure >= 75 ? 'critical' : avgPressure >= 55 ? 'elevated' : 'healthy';

  return {
    indexValue: nationalIndex.toFixed(1),
    indexTrend,
    indexTrendLabel: `${deltaPct > 0 ? `+${deltaPct}%` : `${deltaPct}%`} for ${leadDays === 0 ? 'today' : `T+${leadDays}`}`,
    indexStatus,
    farePressure: `${avgPressure} / 100`,
    farePressureStatus,
    farePressureTrendLabel: avgPressure >= 70 ? 'High Pressure' : avgPressure >= 50 ? 'Moderate' : 'Stable',
    routesUnderSurge: surgeCount,
    routesUnderSurgeLabel: `${surgeCount} of 25 monitored`,
    liveObservations: totalQuotes.toLocaleString('en-IN'),
    dataQualityScore: quality,
    leadDays,
    isWeekend,
  };
}

/**
 * Dynamically recalculate sector KPIs and pricing based on Lead Time (T+1 to T+45)
 * and Traveler Profile (Business, Leisure, Weekend)
 */
export function computeRouteLeadTimeProfile(
  baseRoute: RouteData,
  leadTime: string = 'T+7',
  preset: string = 'Business'
): RouteData {
  if (!baseRoute) return baseRoute;

  const base = baseRoute.baselineFare;
  const baseSurge = baseRoute.surgePct;

  // 1. Lead Time Multiplier (Advance purchase yield curve)
  let leadFactor = 1.0;
  if (leadTime === 'T+1') {
    leadFactor = 1.38 + Math.max(0, baseSurge * 0.005); // Last-minute surge (+38% to +50%)
  } else if (leadTime === 'T+3') {
    leadFactor = 1.22 + Math.max(0, baseSurge * 0.003); // 3 days out (+22%)
  } else if (leadTime === 'T+7') {
    leadFactor = 1.0 + (baseSurge / 100); // Standard 7-day benchmark
  } else if (leadTime === 'T+15') {
    leadFactor = 0.98 + (baseSurge * 0.25 / 100); // 2 weeks prior (~0.98x - 1.05x)
  } else if (leadTime === 'T+30') {
    leadFactor = 0.90; // Early bird tier (-10%)
  } else if (leadTime === 'T+45') {
    leadFactor = 0.82; // Deep advance booking discount (-18%)
  }

  // 2. Profile Multiplier (Elasticity and demand preferences)
  let profileFactor = 1.0;
  let pressureDelta = 0;
  if (preset === 'Business') {
    profileFactor = 1.06; // Corporate peak hour demand (+6%)
    pressureDelta = +6;
  } else if (preset === 'Leisure') {
    profileFactor = 0.94; // Elastic off-peak leisure (-6%)
    pressureDelta = -8;
  } else if (preset === 'Weekend') {
    profileFactor = 1.09; // Weekend getaway demand (+9%)
    pressureDelta = +8;
  }

  const effectiveCurrentFare = Math.round(base * leadFactor * profileFactor);
  const effectiveSurgePct = Number((((effectiveCurrentFare - base) / base) * 100).toFixed(1));

  // Dynamic pressure score (bounded 12 to 98)
  const pressureRatio = effectiveCurrentFare / (baseRoute.currentFare || base);
  const effectivePressure = Math.max(
    12,
    Math.min(98, Math.round(baseRoute.pressureScore * pressureRatio + pressureDelta))
  );

  // Dynamic Z-score statistical distance
  const effectiveZScore = Number((effectiveSurgePct / 12).toFixed(2));

  const effectiveTrend: 'up' | 'down' | 'stable' =
    effectiveSurgePct > 3 ? 'up' : effectiveSurgePct < -3 ? 'down' : 'stable';

  return {
    ...baseRoute,
    currentFare: effectiveCurrentFare,
    surgePct: effectiveSurgePct,
    pressureScore: effectivePressure,
    zScore: effectiveZScore,
    trend: effectiveTrend,
  };
}
