export interface WaterfallItem {
  name: string;
  contribution: number;
  isTotal?: boolean;
  color: string;
  notes: string;
}

export const WATERFALL_DECOMPOSITION: WaterfallItem[] = [
  { name: 'DEL-BOM', contribution: 1.4, color: '#B82323', notes: 'Primary driver (+28.4% route surge on 14.5% basket weight)' },
  { name: 'BOM-BLR', contribution: 0.9, color: '#B82323', notes: 'Western-Southern tech corridor spillover' },
  { name: 'DEL-BLR', contribution: 0.6, color: '#B46808', notes: 'Corporate business demand surge' },
  { name: 'DEL-SXR', contribution: 0.4, color: '#B46808', notes: 'Tourism peak season elasticity' },
  { name: 'BOM-HYD', contribution: 0.3, color: '#B46808', notes: 'Secondary airport disruption delay' },
  { name: 'MAA-DEL', contribution: -0.3, color: '#107E54', notes: 'Off-setting capacity addition from IndiGo' },
  { name: 'All Other Routes', contribution: 0.5, color: '#64748B', notes: 'Net aggregate across 19 regional & feeder pairs' },
  { name: 'National APIx Change', contribution: 3.8, isTotal: true, color: '#1A3A6B', notes: 'Today net index shift: 113.6 → 117.4' }
];

export interface RegionMetric {
  region: string;
  apix: number;
  changePct: number;
  farePressure: number; // 0-100
  volatility30d: number; // %
  topSurgingRoute: string;
  activeRoutesCount: number;
}

export const REGIONAL_METRICS: RegionMetric[] = [
  { region: 'West (BOM, PNQ, AMD, GOI)', apix: 124.6, changePct: 5.8, farePressure: 82, volatility30d: 14.2, topSurgingRoute: 'DEL-BOM (+28.4%)', activeRoutesCount: 7 },
  { region: 'North (DEL, SXR, JAI, IXC, LKO)', apix: 118.2, changePct: 3.4, farePressure: 69, volatility30d: 11.5, topSurgingRoute: 'DEL-SXR (+31.5%)', activeRoutesCount: 8 },
  { region: 'South (BLR, HYD, MAA, COK, TRV)', apix: 112.5, changePct: 2.1, farePressure: 56, volatility30d: 8.9, topSurgingRoute: 'BLR-GOI (+20.6%)', activeRoutesCount: 9 },
  { region: 'East (CCU, PAT, BBI)', apix: 114.1, changePct: 2.8, farePressure: 61, volatility30d: 10.1, topSurgingRoute: 'DEL-PAT (+23.9%)', activeRoutesCount: 5 },
  { region: 'Northeast (GAU, IXB)', apix: 106.8, changePct: -1.2, farePressure: 38, volatility30d: 6.4, topSurgingRoute: 'GAU-DEL (+1.5%)', activeRoutesCount: 3 },
  { region: 'Central (BHO, NAG)', apix: 108.4, changePct: 0.8, farePressure: 44, volatility30d: 5.8, topSurgingRoute: 'DEL-NAG (+3.2%)', activeRoutesCount: 2 },
];

export interface MarketSegmentMetric {
  segment: string;
  description: string;
  apix: number;
  avgFare: number;
  surgePct: number;
  elasticity: string;
  shareOfPassengerKm: number;
}

export const MARKET_SEGMENTS: MarketSegmentMetric[] = [
  { segment: 'Metro-to-Metro', description: 'DEL, BOM, BLR, HYD, MAA, CCU connects', apix: 121.2, avgFare: 7120, surgePct: 18.2, elasticity: 'High', shareOfPassengerKm: 58.4 },
  { segment: 'Leisure & Tourism', description: 'Goa, Srinagar, Kochi, Jaipur', apix: 126.8, avgFare: 6450, surgePct: 24.5, elasticity: 'Extreme', shareOfPassengerKm: 18.1 },
  { segment: 'Tier-2 Connectivity', description: 'Patna, Lucknow, Chandigarh, Bhubaneswar', apix: 110.5, avgFare: 4280, surgePct: 7.9, elasticity: 'Moderate', shareOfPassengerKm: 16.2 },
  { segment: 'Regional UDAN', description: 'Subsidized & RCS feeder routes', apix: 102.4, avgFare: 3100, surgePct: 0.4, elasticity: 'Low', shareOfPassengerKm: 7.3 },
];

export interface HolidayComparison {
  festival: string;
  period: string;
  peakIndex: number;
  surgeDurationDays: number;
  avgFareMultiplier: number;
  mostImpactedSector: string;
}

export const HOLIDAY_COMPARISONS: HolidayComparison[] = [
  { festival: 'Diwali Peak (Simulated)', period: 'T-3 to T+2 of Deepavali', peakIndex: 142.8, surgeDurationDays: 9, avgFareMultiplier: 2.14, mostImpactedSector: 'DEL-PAT / BOM-PAT' },
  { festival: 'Independence Day 2026', period: '14–17 Aug 2026', peakIndex: 111.4, surgeDurationDays: 4, avgFareMultiplier: 1.38, mostImpactedSector: 'DEL-GOI / BOM-GOI' },
  { festival: 'Holi 2026', period: '02–06 Mar 2026', peakIndex: 128.5, surgeDurationDays: 6, avgFareMultiplier: 1.75, mostImpactedSector: 'DEL-LKO / BOM-DEL' },
  { festival: 'Christmas / New Year 2025', period: '22 Dec – 02 Jan', peakIndex: 148.2, surgeDurationDays: 12, avgFareMultiplier: 2.35, mostImpactedSector: 'BOM-GOI / DEL-COK' },
  { festival: 'Eid ul-Fitr 2026', period: '28 Mar – 01 Apr', peakIndex: 122.0, surgeDurationDays: 5, avgFareMultiplier: 1.52, mostImpactedSector: 'DEL-SXR / CCU-DEL' },
];

export interface HistoricalAnalogue {
  rank: number;
  period: string;
  similarityScore: number; // 0 to 100
  keyFactors: string;
  observedOutcome: string;
  actualIndexDelta: string;
}

export const HISTORICAL_ANALOGUES: HistoricalAnalogue[] = [
  {
    rank: 1,
    period: 'Aug 2026 (Mid-Monsoon ATC Recalibration)',
    similarityScore: 91,
    keyFactors: 'Similar runway maintenance, heavy coastal rain, high corporate demand window',
    observedOutcome: 'Surge peaked at T+36 hours and normalized back to +6% baseline within 4 days',
    actualIndexDelta: '+12.4 points at peak'
  },
  {
    rank: 2,
    period: 'Nov 2025 (Post-Diwali Mumbai Fog & Runway Squeeze)',
    similarityScore: 84,
    keyFactors: 'Western metro capacity bottleneck with high return traffic',
    observedOutcome: 'Airlines deployed wide-body A350/777 on DEL-BOM to relieve seat pressure',
    actualIndexDelta: '+15.8 points at peak'
  },
  {
    rank: 3,
    period: 'Oct 2025 (Cyclone Alert Western Coast)',
    similarityScore: 78,
    keyFactors: 'Severe crosswinds and 30%+ diversion rates',
    observedOutcome: 'Dynamic pricing cap reached across 4 carriers before DGCA intervention inquiry',
    actualIndexDelta: '+19.2 points at peak'
  }
];
