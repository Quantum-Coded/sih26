export interface ForecastPoint {
  timeLabel: string;
  historicalFare?: number;
  predictedFare?: number;
  lowerConfidence?: number;
  upperConfidence?: number;
  isActual: boolean;
}

export const DEL_BOM_7D_FORECAST: ForecastPoint[] = [
  { timeLabel: '06 Sep', historicalFare: 6680, isActual: true },
  { timeLabel: '07 Sep', historicalFare: 7050, isActual: true },
  { timeLabel: '08 Sep', historicalFare: 7240, isActual: true },
  { timeLabel: '09 Sep (Now)', historicalFare: 7480, predictedFare: 7480, lowerConfidence: 7480, upperConfidence: 7480, isActual: true },
  { timeLabel: '10 Sep (T+1)', predictedFare: 7550, lowerConfidence: 7350, upperConfidence: 7750, isActual: false },
  { timeLabel: '11 Sep (T+2)', predictedFare: 7620, lowerConfidence: 7380, upperConfidence: 7860, isActual: false },
  { timeLabel: '12 Sep (T+3)', predictedFare: 7510, lowerConfidence: 7220, upperConfidence: 7800, isActual: false },
  { timeLabel: '13 Sep (T+4)', predictedFare: 7380, lowerConfidence: 7050, upperConfidence: 7710, isActual: false },
  { timeLabel: '14 Sep (T+5)', predictedFare: 7250, lowerConfidence: 6890, upperConfidence: 7600, isActual: false },
  { timeLabel: '15 Sep (T+6)', predictedFare: 7180, lowerConfidence: 6780, upperConfidence: 7580, isActual: false },
  { timeLabel: '16 Sep (T+7)', predictedFare: 7350, lowerConfidence: 7200, upperConfidence: 7700, isActual: false },
];

export interface ModelSignalItem {
  id: string;
  name: string;
  category: string;
  value: string;
  impact: 'High Positive' | 'Moderate Positive' | 'Neutral' | 'Negative';
  direction: 'up' | 'down' | 'neutral';
  weightPct: number;
  contributionPct: number;
  description: string;
}

export const FORECAST_SIGNALS: ModelSignalItem[] = [
  {
    id: 'sig-1',
    name: 'Lead-Time Decay',
    category: 'Temporal',
    value: 'T+7 Window (168h)',
    impact: 'High Positive',
    direction: 'up',
    weightPct: 28,
    contributionPct: 31,
    description: 'Seats entering prime corporate booking curve where willingness-to-pay increases steeply.'
  },
  {
    id: 'sig-2',
    name: 'Intraday Fare Momentum',
    category: 'Price Action',
    value: '+3.8% in 6 hours',
    impact: 'High Positive',
    direction: 'up',
    weightPct: 22,
    contributionPct: 24,
    description: 'Persistent positive velocity across multiple OTA scrapers indicates algorithmic tier escalation.'
  },
  {
    id: 'sig-3',
    name: 'Search Interest Acceleration',
    category: 'Demand',
    value: '+18.2% vs 7D Avg',
    impact: 'Moderate Positive',
    direction: 'up',
    weightPct: 18,
    contributionPct: 18,
    description: 'Spike in flight queries following cancellation notices across alternative travel modes.'
  },
  {
    id: 'sig-4',
    name: 'Coastal Weather Warning',
    category: 'Environment',
    value: 'Squall Line (IMD Orange)',
    impact: 'Moderate Positive',
    direction: 'up',
    weightPct: 12,
    contributionPct: 11,
    description: 'Reduced airport acceptance rate at BOM limits available arrival slots, suppressing seat inventory.'
  },
  {
    id: 'sig-5',
    name: 'Holiday Proximity',
    category: 'Calendar',
    value: 'Extended Weekend 4d away',
    impact: 'Moderate Positive',
    direction: 'up',
    weightPct: 10,
    contributionPct: 9,
    description: 'Overlap with regional festive dates creates leisure demand floor underneath business pricing.'
  },
  {
    id: 'sig-6',
    name: 'ATC Delay Propagation',
    category: 'Operations',
    value: '26% outbound delay',
    impact: 'Moderate Positive',
    direction: 'up',
    weightPct: 7,
    contributionPct: 5,
    description: 'Aircraft turnaround delays at Mumbai cascade into evening flight schedule compression.'
  },
  {
    id: 'sig-7',
    name: 'Fuel Surcharge & Forex',
    category: 'Macro',
    value: 'ATF +0.4% MoM',
    impact: 'Neutral',
    direction: 'neutral',
    weightPct: 3,
    contributionPct: 2,
    description: 'Stable jet fuel prices in India maintaining baseline cost structure.'
  }
];

// Helper formula for Scenario Simulator
export function calculateScenarioForecast(
  baseFare: number,
  searchDemandDelta: number, // e.g. -20 to +50%
  weatherRiskLevel: number, // 0 = Clear, 1 = Moderate, 2 = High, 3 = Severe
  delayRatePct: number, // 5% to 50%
  eventSeverityScale: number // 1 to 5
) {
  // Elasticity coefficients calibrated from historical airline dynamic pricing
  const demandImpact = (searchDemandDelta / 100) * 0.42; // +10% search -> +4.2% fare pressure
  const weatherImpact = weatherRiskLevel * 0.045; // up to +13.5%
  const delayImpact = ((delayRatePct - 12) / 100) * 0.35; // baseline delay 12%
  const eventImpact = ((eventSeverityScale - 1) * 0.03); // up to +12%

  const totalMultiplier = 1 + demandImpact + weatherImpact + delayImpact + eventImpact;
  const predictedFare = Math.round(baseFare * Math.max(0.85, totalMultiplier));
  const rangeMargin = Math.round(predictedFare * 0.04);
  const surgeProbability = Math.min(99, Math.max(10, Math.round(50 + (totalMultiplier - 1) * 110)));

  return {
    predictedFare,
    lowerBound: predictedFare - rangeMargin,
    upperBound: predictedFare + rangeMargin,
    surgeProbability,
    deltaPct: Number((((predictedFare - baseFare) / baseFare) * 100).toFixed(1))
  };
}
