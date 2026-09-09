export interface TimeSeriesPoint {
  date: string;
  apix: number;
  baseline: number;
  lowerBand?: number;
  upperBand?: number;
  isAnomaly?: boolean;
  notes?: string;
}

export interface BookingWindowPrice {
  window: string; // T+45, T+30, T+15, T+7, T+1
  days: number;
  fare: number;
  baseline: number;
  elasticityLabel: string;
}

// 30-Day National APIx Daily Index Data
export const NATIONAL_APIX_30D: TimeSeriesPoint[] = [
  { date: '11 Aug', apix: 104.2, baseline: 103.0 },
  { date: '12 Aug', apix: 104.8, baseline: 103.1 },
  { date: '13 Aug', apix: 105.1, baseline: 103.2 },
  { date: '14 Aug', apix: 108.6, baseline: 103.5, isAnomaly: true, notes: 'Independence Day Eve Travel Surge' },
  { date: '15 Aug', apix: 111.4, baseline: 103.8, isAnomaly: true, notes: 'Independence Day Extended Weekend' },
  { date: '16 Aug', apix: 109.8, baseline: 103.6 },
  { date: '17 Aug', apix: 106.2, baseline: 103.4 },
  { date: '18 Aug', apix: 104.5, baseline: 103.2 },
  { date: '19 Aug', apix: 103.8, baseline: 103.1 },
  { date: '20 Aug', apix: 103.5, baseline: 103.0 },
  { date: '21 Aug', apix: 104.1, baseline: 103.0 },
  { date: '22 Aug', apix: 104.9, baseline: 103.2 },
  { date: '23 Aug', apix: 105.4, baseline: 103.4 },
  { date: '24 Aug', apix: 105.0, baseline: 103.3 },
  { date: '25 Aug', apix: 104.6, baseline: 103.2 },
  { date: '26 Aug', apix: 106.2, baseline: 103.5, notes: 'Janmashtami Booking Spike' },
  { date: '27 Aug', apix: 107.5, baseline: 103.8 },
  { date: '28 Aug', apix: 105.2, baseline: 103.5 },
  { date: '29 Aug', apix: 104.8, baseline: 103.4 },
  { date: '30 Aug', apix: 105.9, baseline: 103.6 },
  { date: '31 Aug', apix: 106.8, baseline: 103.7 },
  { date: '01 Sep', apix: 106.1, baseline: 103.6 },
  { date: '02 Sep', apix: 105.7, baseline: 103.5 },
  { date: '03 Sep', apix: 106.4, baseline: 103.6 },
  { date: '04 Sep', apix: 107.9, baseline: 103.9 },
  { date: '05 Sep', apix: 109.2, baseline: 104.1 },
  { date: '06 Sep', apix: 111.0, baseline: 104.3, isAnomaly: true, notes: 'Mumbai Weather Red Alert Inception' },
  { date: '07 Sep', apix: 113.8, baseline: 104.5, isAnomaly: true, notes: 'Western Corridor Congestion Multiplier' },
  { date: '08 Sep', apix: 115.1, baseline: 104.8, isAnomaly: true, notes: 'Airline Fleet Rescheduling' },
  { date: '09 Sep', apix: 117.4, baseline: 105.0, isAnomaly: true, notes: 'Current Index: +3.8% intraday, +11.8% over baseline' },
];

export const NATIONAL_APIX_7D = NATIONAL_APIX_30D.slice(-7);

export const NATIONAL_APIX_90D: TimeSeriesPoint[] = Array.from({ length: 90 }).map((_, i) => {
  const day = i + 1;
  const baseline = 101.5 + (day * 0.04);
  let noise = Math.sin(day * 0.4) * 2.1 + ((day % 7 === 5 || day % 7 === 6) ? 3.2 : 0);
  if (day >= 83) noise += (day - 82) * 2.2; // Mumbai Surge buildup
  const apix = Number((baseline + noise).toFixed(1));
  return {
    date: `D-${90 - day}`,
    apix,
    baseline: Number(baseline.toFixed(1)),
    isAnomaly: day >= 86
  };
});

// DEL-BOM Specific 30-Day Fare Movement with Confidence and Anomaly Bands
export interface RouteTimeSeriesPoint {
  date: string;
  fare: number;
  baseline: number;
  predicted?: number;
  lowerBand: number;
  upperBand: number;
  eventMarker?: string;
  source: string;
}

export const DEL_BOM_30D_HISTORY: RouteTimeSeriesPoint[] = [
  { date: '11 Aug', fare: 5750, baseline: 5800, lowerBand: 5200, upperBand: 6400, source: '6E / AI / QP' },
  { date: '13 Aug', fare: 5820, baseline: 5810, lowerBand: 5210, upperBand: 6410, source: 'Consolidated' },
  { date: '15 Aug', fare: 6850, baseline: 5820, lowerBand: 5220, upperBand: 6420, eventMarker: 'Aug 15 Rush', source: 'Consolidated' },
  { date: '18 Aug', fare: 5900, baseline: 5800, lowerBand: 5200, upperBand: 6400, source: 'Consolidated' },
  { date: '21 Aug', fare: 5790, baseline: 5810, lowerBand: 5210, upperBand: 6410, source: 'Consolidated' },
  { date: '24 Aug', fare: 5840, baseline: 5815, lowerBand: 5215, upperBand: 6415, source: 'Consolidated' },
  { date: '27 Aug', fare: 6020, baseline: 5820, lowerBand: 5220, upperBand: 6420, source: 'Consolidated' },
  { date: '30 Aug', fare: 5910, baseline: 5820, lowerBand: 5220, upperBand: 6420, source: 'Consolidated' },
  { date: '02 Sep', fare: 5880, baseline: 5820, lowerBand: 5220, upperBand: 6420, source: 'Consolidated' },
  { date: '04 Sep', fare: 6150, baseline: 5825, lowerBand: 5225, upperBand: 6425, source: 'Consolidated' },
  { date: '06 Sep', fare: 6680, baseline: 5825, lowerBand: 5225, upperBand: 6425, eventMarker: 'ATC Alert', source: 'Consolidated' },
  { date: '07 Sep', fare: 7050, baseline: 5825, lowerBand: 5225, upperBand: 6425, eventMarker: 'Squall Line', source: 'Consolidated' },
  { date: '08 Sep', fare: 7240, baseline: 5825, lowerBand: 5225, upperBand: 6425, source: 'Consolidated' },
  { date: '09 Sep', fare: 7480, baseline: 5825, lowerBand: 5225, upperBand: 6425, predicted: 7650, eventMarker: 'Today Surge (+28.4%)', source: 'Real-time Scrape' },
];

// Lead-Time Elasticity Curve for DEL-BOM (T+45 to T+1)
export const DEL_BOM_LEAD_TIME_CURVE: BookingWindowPrice[] = [
  { window: 'T+45', days: 45, fare: 4900, baseline: 4750, elasticityLabel: 'Low Fare Base' },
  { window: 'T+30', days: 30, fare: 5100, baseline: 4980, elasticityLabel: 'Advance Planning' },
  { window: 'T+15', days: 15, fare: 5700, baseline: 5450, elasticityLabel: 'Moderate Slope' },
  { window: 'T+7',  days: 7,  fare: 7480, baseline: 5825, elasticityLabel: 'Surge Acceleration' },
  { window: 'T+1',  days: 1,  fare: 9200, baseline: 7600, elasticityLabel: 'Extreme Last-Minute' },
];

// Airline Comparison for DEL-BOM
export interface AirlineQuoteComparison {
  airlineCode: string;
  name: string;
  lowestFare: number;
  medianFare: number;
  flightCount: number;
  fareChangePct: number;
  availability: 'Plentiful' | 'Moderate' | 'Constrained' | 'Sold Out';
  baseFare: number;
  taxes: number;
  udfFee: number;
}

export const DEL_BOM_AIRLINE_QUOTES: AirlineQuoteComparison[] = [
  { airlineCode: '6E', name: 'IndiGo', lowestFare: 7150, medianFare: 7480, flightCount: 22, fareChangePct: 27.2, availability: 'Moderate', baseFare: 5780, taxes: 1100, udfFee: 600 },
  { airlineCode: 'AI', name: 'Air India', lowestFare: 7650, medianFare: 8100, flightCount: 14, fareChangePct: 32.8, availability: 'Constrained', baseFare: 6350, taxes: 1150, udfFee: 600 },
  { airlineCode: 'QP', name: 'Akasa Air', lowestFare: 6990, medianFare: 7250, flightCount: 6, fareChangePct: 22.5, availability: 'Moderate', baseFare: 5590, taxes: 1060, udfFee: 600 },
  { airlineCode: 'SG', name: 'SpiceJet', lowestFare: 7400, medianFare: 7650, flightCount: 4, fareChangePct: 29.1, availability: 'Constrained', baseFare: 5980, taxes: 1070, udfFee: 600 },
  { airlineCode: 'IX', name: 'AI Express', lowestFare: 7100, medianFare: 7300, flightCount: 5, fareChangePct: 24.0, availability: 'Moderate', baseFare: 5650, taxes: 1050, udfFee: 600 },
];

// Price Position Distribution Bands for DEL-BOM
export const PRICE_POSITION_DEL_BOM = {
  currentFare: 7480,
  minObserved: 3850,
  p25: 5200,
  median: 5825,
  p75: 6450,
  p90: 7100,
  maxObserved: 11400,
  status: 'EXTREME' as 'LOW' | 'NORMAL' | 'HIGH' | 'EXTREME',
  pctRank: 92.4, // In 92nd percentile of historical prices
};
