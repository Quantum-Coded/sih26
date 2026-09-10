import { RouteData } from '../data/routes';
import { AIRPORTS } from '../data/airports';

export interface StateHeatEntry {
  stateName: string;
  surge: number;
  maxSurge: number;
  pressure: number;
  routeCount: number;
  airports: string[];
  dominantRoute?: RouteData;
  primaryDriver?: string;
  status: 'Extreme' | 'High' | 'Elevated' | 'Normal' | 'Discount';
}

export type StateHeatmap = Map<string, StateHeatEntry>;

// Direct mapping of airport codes to canonical TopoJSON state names
export const AIRPORT_TO_STATE: Record<string, string> = {
  DEL: 'Delhi',
  BOM: 'Maharashtra',
  BLR: 'Karnataka',
  HYD: 'Telangana',
  CCU: 'West Bengal',
  MAA: 'Tamil Nadu',
  AMD: 'Gujarat',
  COK: 'Kerala',
  GOI: 'Goa',
  PNQ: 'Maharashtra',
  JAI: 'Rajasthan',
  LKO: 'Uttar Pradesh',
  GAU: 'Assam',
  PAT: 'Bihar',
  BBI: 'Odisha',
  SXR: 'Jammu and Kashmir',
  IXC: 'Punjab',
  TRV: 'Kerala',
};

// Also support Chandigarh mapping if referenced
export const STATE_ALIASES: Record<string, string[]> = {
  Punjab: ['Punjab', 'Chandigarh'],
  'Jammu and Kashmir': ['Jammu and Kashmir', 'Ladakh'],
};

/**
 * Builds a Map of stateName -> StateHeatEntry by aggregating route metrics
 * for routes originating from or arriving at airports in that state.
 */
export function buildStateHeatmap(routes: RouteData[]): StateHeatmap {
  const map = new Map<string, StateHeatEntry>();
  const accumulators = new Map<
    string,
    {
      routes: RouteData[];
      surges: number[];
      pressures: number[];
      airports: Set<string>;
    }
  >();

  // Initialize accumulators for all known airport states and aliases
  for (const airport of Object.values(AIRPORTS)) {
    const sName = airport.stateName || AIRPORT_TO_STATE[airport.iata];
    const statesToInit = [sName];
    if (STATE_ALIASES[sName]) {
      statesToInit.push(...STATE_ALIASES[sName]);
    }

    for (const state of statesToInit) {
      if (state && !accumulators.has(state)) {
        accumulators.set(state, {
          routes: [],
          surges: [],
          pressures: [],
          airports: new Set([airport.iata]),
        });
      } else if (state) {
        accumulators.get(state)!.airports.add(airport.iata);
      }
    }
  }

  // Aggregate routes touching each state
  for (const route of routes) {
    const originAirport = AIRPORTS[route.origin];
    const destAirport = AIRPORTS[route.destination];

    const originState = originAirport?.stateName || AIRPORT_TO_STATE[route.origin];
    const destState = destAirport?.stateName || AIRPORT_TO_STATE[route.destination];

    const touchingStates = new Set<string>();
    if (originState) {
      touchingStates.add(originState);
      if (STATE_ALIASES[originState]) {
        STATE_ALIASES[originState].forEach((s) => touchingStates.add(s));
      }
    }
    if (destState) {
      touchingStates.add(destState);
      if (STATE_ALIASES[destState]) {
        STATE_ALIASES[destState].forEach((s) => touchingStates.add(s));
      }
    }

    for (const stateName of touchingStates) {
      let acc = accumulators.get(stateName);
      if (!acc) {
        acc = {
          routes: [],
          surges: [],
          pressures: [],
          airports: new Set(),
        };
        accumulators.set(stateName, acc);
      }

      acc.routes.push(route);
      acc.surges.push(route.surgePct);
      acc.pressures.push(route.pressureScore);

      if (originState === stateName || STATE_ALIASES[originState]?.includes(stateName)) {
        acc.airports.add(route.origin);
      }
      if (destState === stateName || STATE_ALIASES[destState]?.includes(stateName)) {
        acc.airports.add(route.destination);
      }
    }
  }

  // Convert accumulators to StateHeatEntry
  for (const [stateName, acc] of accumulators.entries()) {
    if (acc.routes.length === 0) {
      map.set(stateName, {
        stateName,
        surge: 0,
        maxSurge: 0,
        pressure: 30,
        routeCount: 0,
        airports: Array.from(acc.airports),
        status: 'Normal',
      });
      continue;
    }

    const avgSurge = acc.surges.reduce((sum, v) => sum + v, 0) / acc.surges.length;
    const maxSurge = Math.max(...acc.surges);
    const avgPressure = Math.round(
      acc.pressures.reduce((sum, v) => sum + v, 0) / acc.pressures.length
    );

    // Pick dominant route: one with highest pressure score
    const dominantRoute = [...acc.routes].sort((a, b) => b.pressureScore - a.pressureScore)[0];

    let status: StateHeatEntry['status'] = 'Normal';
    if (maxSurge >= 25 || avgSurge >= 20) status = 'Extreme';
    else if (maxSurge >= 15 || avgSurge >= 12) status = 'High';
    else if (maxSurge >= 5 || avgSurge >= 5) status = 'Elevated';
    else if (avgSurge <= -4) status = 'Discount';

    map.set(stateName, {
      stateName,
      surge: Math.round(avgSurge * 10) / 10,
      maxSurge: Math.round(maxSurge * 10) / 10,
      pressure: avgPressure,
      routeCount: acc.routes.length,
      airports: Array.from(acc.airports),
      dominantRoute,
      primaryDriver: dominantRoute?.primaryDriver,
      status,
    });
  }

  return map;
}

/**
 * Returns fill and stroke styles for an Indian state based on its surveillance data
 */
export function getStateStyle(
  stateName: string,
  entry?: StateHeatEntry,
  isHovered: boolean = false,
  isSelected: boolean = false
): { fill: string; stroke: string; strokeWidth: number; fillOpacity: number } {
  // If state has no monitored routes
  if (!entry || entry.routeCount === 0) {
    if (isHovered) {
      return {
        fill: '#1e293b',
        stroke: '#38bdf8',
        strokeWidth: 1.2,
        fillOpacity: 0.8,
      };
    }
    return {
      fill: '#111e32',
      stroke: 'rgba(51, 65, 85, 0.4)',
      strokeWidth: 0.6,
      fillOpacity: 0.65,
    };
  }

  // Active surveillance state styling by surge status
  let fill = '#1e293b';
  let stroke = 'rgba(71, 85, 105, 0.5)';

  switch (entry.status) {
    case 'Extreme':
      fill = '#881337'; // Deep Rose/Crimson
      stroke = '#f43f5e';
      break;
    case 'High':
      fill = '#9a3412'; // Rich Orange/Vermilion
      stroke = '#fb923c';
      break;
    case 'Elevated':
      fill = '#78350f'; // Amber
      stroke = '#f59e0b';
      break;
    case 'Discount':
      fill = '#064e3b'; // Deep Emerald
      stroke = '#10b981';
      break;
    case 'Normal':
    default:
      fill = '#1a283e';
      stroke = '#475569';
      break;
  }

  if (isSelected) {
    return {
      fill,
      stroke: '#38bdf8',
      strokeWidth: 2.2,
      fillOpacity: 0.95,
    };
  }

  if (isHovered) {
    return {
      fill,
      stroke: '#ffffff',
      strokeWidth: 1.8,
      fillOpacity: 0.95,
    };
  }

  return {
    fill,
    stroke,
    strokeWidth: 0.8,
    fillOpacity: 0.75,
  };
}
