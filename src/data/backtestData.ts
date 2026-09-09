export interface BacktestPoint {
  month: string;
  apix: number;
  dgcaBenchmark: number;
  diffPct: number;
}

// 12-Month Backtest Data comparing Real-time APIx vs DGCA Monthly Ex-Post Benchmark
export const BACKTEST_12M_DATA: BacktestPoint[] = [
  { month: 'Oct 2025', apix: 104.5, dgcaBenchmark: 103.8, diffPct: 0.7 },
  { month: 'Nov 2025', apix: 116.2, dgcaBenchmark: 114.9, diffPct: 1.1 },
  { month: 'Dec 2025', apix: 124.8, dgcaBenchmark: 122.5, diffPct: 1.9 },
  { month: 'Jan 2026', apix: 108.4, dgcaBenchmark: 107.1, diffPct: 1.2 },
  { month: 'Feb 2026', apix: 102.1, dgcaBenchmark: 101.5, diffPct: 0.6 },
  { month: 'Mar 2026', apix: 109.5, dgcaBenchmark: 108.2, diffPct: 1.2 },
  { month: 'Apr 2026', apix: 112.4, dgcaBenchmark: 111.0, diffPct: 1.3 },
  { month: 'May 2026', apix: 118.9, dgcaBenchmark: 117.2, diffPct: 1.4 },
  { month: 'Jun 2026', apix: 121.5, dgcaBenchmark: 119.8, diffPct: 1.4 },
  { month: 'Jul 2026', apix: 103.8, dgcaBenchmark: 102.9, diffPct: 0.9 },
  { month: 'Aug 2026', apix: 108.6, dgcaBenchmark: 107.4, diffPct: 1.1 },
  { month: 'Sep 2026 (Live)', apix: 117.4, dgcaBenchmark: 115.8, diffPct: 1.4 },
];

export interface ReplayScenario {
  id: string;
  name: string;
  period: string;
  affectedRoute: string;
  eventDescription: string;
  fareMovementObserved: string;
  apixReaction: string;
  predictionAccuracy: string;
}

export const BACKTEST_REPLAYS: ReplayScenario[] = [
  {
    id: 'rep-1',
    name: 'Delhi Winter Fog Crisis (Jan 2026)',
    period: '04 Jan – 11 Jan 2026',
    affectedRoute: 'DEL-BOM / DEL-BLR',
    eventDescription: 'CAT III-B zero-visibility conditions shut down northern airspace for 3 consecutive mornings.',
    fareMovementObserved: 'Last-minute (T+1) fares spiked from ₹6,200 to ₹14,800 (+138%).',
    apixReaction: 'APIx captured intraday surge within 90 minutes of morning departure blockades; index jumped +8.4 pts.',
    predictionAccuracy: 'Predicted fare pressure direction accurately 18 hours in advance using IMD visibility forecasts.'
  },
  {
    id: 'rep-2',
    name: 'Diwali Festive Wave (Nov 2025)',
    period: '08 Nov – 15 Nov 2025',
    affectedRoute: 'DEL-PAT / BOM-CCU',
    eventDescription: 'Mass migration towards Eastern India coinciding with train waitlist exhaustion.',
    fareMovementObserved: 'T+7 and T+15 advance fares escalated to 2.4x regular baseline.',
    apixReaction: 'APIx climbed from 104.2 to 126.8 in synchronization with passenger traffic volumes.',
    predictionAccuracy: 'Model predicted +22% surge probability 6 days prior with 92% confidence.'
  },
  {
    id: 'rep-3',
    name: 'Pratt & Whitney Engine Grounding Impact (Jun 2026)',
    period: '12 Jun – 28 Jun 2026',
    affectedRoute: 'National Basket',
    eventDescription: 'Sudden grounding of 38 domestic A320neo aircraft removed ~6% system-wide seat capacity.',
    fareMovementObserved: 'Sustained elevation across all lead-time buckets for 16 days.',
    apixReaction: 'Sub-indices reflected reduced capacity elasticity immediately with zero lag.',
    predictionAccuracy: 'Directional consistency remained at 96% throughout the supply shock.'
  }
];
