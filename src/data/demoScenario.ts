export interface DemoScenario {
  id: string;
  name: string;
  tagline: string;
  routeId: string;
  origin: string;
  destination: string;
  departureDate: string;
  timestamp: string;
  currentFare: number;
  baselineFare: number;
  surgePct: number;
  pressureScore: number;
  zScore: number;
  searchDemandPct: number;
  weatherRisk: 'Low' | 'Moderate' | 'High';
  delayRatePct: number;
  predictedRange: [number, number];
  surgeProbabilityPct: number;
  confidence: string;
  mainEventTitle: string;
  mainEventSummary: string;
  fingerprint: {
    priceMomentum: number;
    demand: number;
    weather: number;
    operations: number;
    holiday: number;
    news: number;
  };
  connectedRoutes: Array<{
    routeId: string;
    surgePct: number;
    fare: number;
    baseline: number;
    pressure: number;
  }>;
}

export const MUMBAI_SURGE_SCENARIO: DemoScenario = {
  id: 'mumbai-airfare-surge-2026',
  name: 'Mumbai Airfare Surge',
  tagline: 'High-frequency western corridor airfare spike driven by runway maintenance and ATC radar disruptions',
  routeId: 'DEL-BOM',
  origin: 'DEL',
  destination: 'BOM',
  departureDate: '16 Sep 2026',
  timestamp: '14:08 IST',
  currentFare: 7480,
  baselineFare: 5825,
  surgePct: 28.4,
  pressureScore: 84,
  zScore: 2.31,
  searchDemandPct: 18,
  weatherRisk: 'High',
  delayRatePct: 26,
  predictedRange: [7350, 7700],
  surgeProbabilityPct: 78,
  confidence: 'High',
  mainEventTitle: 'Mumbai Airport Radar Upgrade & Secondary Runway Crosswinds',
  mainEventSummary: 'Chhatrapati Shivaji Maharaj International Airport (BOM) reported 26% outbound flight delays and slot holds due to scheduled primary runway calibration combined with squall-line weather.',
  fingerprint: {
    priceMomentum: 31,
    demand: 24,
    weather: 18,
    operations: 15,
    holiday: 8,
    news: 4
  },
  connectedRoutes: [
    { routeId: 'DEL-BOM', surgePct: 28.4, fare: 7480, baseline: 5825, pressure: 84 },
    { routeId: 'BOM-BLR', surgePct: 21.2, fare: 6920, baseline: 5710, pressure: 76 },
    { routeId: 'BOM-COK', surgePct: 19.4, fare: 5850, baseline: 4900, pressure: 73 },
    { routeId: 'BOM-HYD', surgePct: 17.1, fare: 5620, baseline: 4800, pressure: 71 },
    { routeId: 'BOM-MAA', surgePct: 14.4, fare: 5950, baseline: 5200, pressure: 66 },
  ]
};
