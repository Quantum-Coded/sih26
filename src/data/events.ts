export type EventType =
  | 'Weather'
  | 'Airport disruption'
  | 'Major event'
  | 'Holiday'
  | 'Festival'
  | 'Travel demand'
  | 'News spike'
  | 'Operational issue';

export type EventSeverity = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface EvidenceRecord {
  category: 'News' | 'Weather' | 'Operations' | 'Search demand' | 'Holiday calendar';
  source: string;
  timestamp: string;
  summary: string;
  metric: string;
  reliabilityScore: number;
  urlRef?: string;
}

export interface MarketEvent {
  id: string;
  title: string;
  type: EventType;
  severity: EventSeverity;
  location: string;
  affectedAirports: string[];
  affectedRoutes: Array<{
    routeId: string;
    fareImpactPct: number;
    lagHours: number;
  }>;
  timestamp: string;
  sourceType: string;
  summary: string;
  associationScore: number; // 0 to 1
  lagDescription: string;
  evidence: EvidenceRecord[];
}

export const MARKET_EVENTS: MarketEvent[] = [
  {
    id: 'EVT-2026-0909-01',
    title: 'Mumbai Airport Radar Maintenance & Crosswind Squall',
    type: 'Airport disruption',
    severity: 'Critical',
    location: 'Mumbai (BOM)',
    affectedAirports: ['BOM', 'DEL', 'BLR', 'HYD', 'MAA'],
    affectedRoutes: [
      { routeId: 'DEL-BOM', fareImpactPct: 28.4, lagHours: 4 },
      { routeId: 'BOM-BLR', fareImpactPct: 21.2, lagHours: 3.5 },
      { routeId: 'BOM-COK', fareImpactPct: 19.4, lagHours: 5 },
      { routeId: 'BOM-HYD', fareImpactPct: 17.1, lagHours: 3 },
      { routeId: 'BOM-MAA', fareImpactPct: 14.4, lagHours: 4.5 }
    ],
    timestamp: '09 Sep 2026, 08:30 IST',
    sourceType: 'DGCA NOTAM & Mumbai ATC Feed',
    summary: 'Secondary runway 14/32 active due to scheduled ILS calibration on primary 09/27. Heavy convective thunderstorms reduced hourly movement rate from 46 to 28 movements, triggering cascading delays.',
    associationScore: 0.71,
    lagDescription: 'Event signal → fare acceleration: ~3–6 hours',
    evidence: [
      {
        category: 'Operations',
        source: 'AAI NOTAM BOM/A1842/26',
        timestamp: '09 Sep 06:15 IST',
        summary: 'Runway 09/27 closed for calibration maintenance 06:00-11:00 UTC. Peak delay index 26%.',
        metric: 'Slot capacity -39%',
        reliabilityScore: 99
      },
      {
        category: 'Weather',
        source: 'IMD Coastal Doppler Radar Mumbai',
        timestamp: '09 Sep 07:45 IST',
        summary: 'Convective thunderstorm cell passing over Santacruz. Surface wind gusts 28 knots, crosswind on secondary runway.',
        metric: 'Visibility 1800m',
        reliabilityScore: 95
      },
      {
        category: 'Search demand',
        source: 'Aggregator Search Velocity Index',
        timestamp: '09 Sep 09:20 IST',
        summary: 'Sudden 18.2% spike in queries for alternative flights between Delhi and Mumbai within 120 minutes of flight cancellations.',
        metric: '+18.2% search query acceleration',
        reliabilityScore: 92
      },
      {
        category: 'News',
        source: 'Financial Express Aviation Desk',
        timestamp: '09 Sep 10:10 IST',
        summary: 'Over 45 flights delayed and 8 diverted as Mumbai airport operates on single secondary runway amidst monsoon showers.',
        metric: '45 delayed, 8 diverted',
        reliabilityScore: 88
      }
    ]
  },
  {
    id: 'EVT-2026-0908-02',
    title: 'Autumn Kashmir Valley Tourism Surge',
    type: 'Travel demand',
    severity: 'High',
    location: 'Srinagar (SXR)',
    affectedAirports: ['SXR', 'DEL'],
    affectedRoutes: [
      { routeId: 'DEL-SXR', fareImpactPct: 31.5, lagHours: 12 }
    ],
    timestamp: '08 Sep 2026, 14:00 IST',
    sourceType: 'OTA Booking Inflow Analytics',
    summary: 'Record hotel bookings in Gulmarg and Pahalgam for mid-September weekend trip packages drive seat depletion on Northern routes.',
    associationScore: 0.65,
    lagDescription: 'Demand trend → price peak: ~12–18 hours',
    evidence: [
      {
        category: 'Search demand',
        source: 'MakeMyTrip & Ixigo Leisure Index',
        timestamp: '08 Sep 11:30 IST',
        summary: 'DEL-SXR searches up 42% week-on-week for mid-September departure windows.',
        metric: 'Load factor 94.2%',
        reliabilityScore: 91
      },
      {
        category: 'Holiday calendar',
        source: 'National Calendar Intelligence',
        timestamp: '08 Sep 09:00 IST',
        summary: 'Upcoming long weekend combining regional holidays and Saturday/Sunday.',
        metric: '3-Day leisure cluster',
        reliabilityScore: 99
      }
    ]
  },
  {
    id: 'EVT-2026-0907-03',
    title: 'Goa Extended Weekend Leisure Inflow',
    type: 'Festival',
    severity: 'High',
    location: 'Goa (GOI)',
    affectedAirports: ['GOI', 'DEL', 'BOM', 'BLR'],
    affectedRoutes: [
      { routeId: 'DEL-GOI', fareImpactPct: 28.0, lagHours: 8 },
      { routeId: 'BOM-GOI', fareImpactPct: 26.9, lagHours: 6 },
      { routeId: 'BLR-GOI', fareImpactPct: 20.6, lagHours: 6 }
    ],
    timestamp: '07 Sep 2026, 18:30 IST',
    sourceType: 'OTA Yield Management Models',
    summary: 'Leisure fares across Western/Southern metros heading into coastal resorts surged as bucket inventories closed.',
    associationScore: 0.78,
    lagDescription: 'Leisure demand → yield bump: ~6–8 hours',
    evidence: [
      {
        category: 'Operations',
        source: 'Airline Inventory Tracking',
        timestamp: '07 Sep 16:00 IST',
        summary: 'Economy lowest fare classes (T/U/V) completely sold out across all morning flights into Goa.',
        metric: 'Zero discount buckets',
        reliabilityScore: 96
      }
    ]
  },
  {
    id: 'EVT-2026-0905-04',
    title: 'Eastern India Early Festive Pre-Booking Surge',
    type: 'Holiday',
    severity: 'Moderate',
    location: 'Patna (PAT) & Kolkata (CCU)',
    affectedAirports: ['PAT', 'CCU', 'DEL'],
    affectedRoutes: [
      { routeId: 'DEL-PAT', fareImpactPct: 23.9, lagHours: 24 },
      { routeId: 'DEL-CCU', fareImpactPct: 9.4, lagHours: 36 }
    ],
    timestamp: '05 Sep 2026, 11:00 IST',
    sourceType: 'Ministry of Railways & Aviation Booking Trends',
    summary: 'Train waitlists reaching 200+ on Rajdhani routes for festive dates causing immediate spillover into air travel bookings.',
    associationScore: 0.69,
    lagDescription: 'Rail capacity exhaustion → air surge: ~24 hours',
    evidence: [
      {
        category: 'Holiday calendar',
        source: 'Indian Festive Calendar',
        timestamp: '05 Sep 10:00 IST',
        summary: 'Durga Puja / Chhath travel booking window opens for 30-day advance fares.',
        metric: 'T+30 volume +54%',
        reliabilityScore: 98
      }
    ]
  }
];

// Event / Airfare Overlay Timeline Chart Data for the Mumbai Event
export const EVENT_FARE_OVERLAY_DATA = [
  { time: '04:00 IST', eventIntensity: 10, fareMovement: 5850, annotation: 'Normal conditions' },
  { time: '06:00 IST', eventIntensity: 25, fareMovement: 5920, annotation: 'NOTAM published' },
  { time: '08:00 IST', eventIntensity: 75, fareMovement: 6240, annotation: 'Thunderstorm hits BOM' },
  { time: '10:00 IST', eventIntensity: 95, fareMovement: 6890, annotation: 'Cascading flight delays (26%)' },
  { time: '12:00 IST', eventIntensity: 85, fareMovement: 7210, annotation: 'Discount fare classes depleted' },
  { time: '14:00 IST', eventIntensity: 70, fareMovement: 7480, annotation: 'Surge plateau (+28.4%)' },
  { time: '16:00 IST (Est)', eventIntensity: 50, fareMovement: 7420, annotation: 'Gradual recovery expected' },
  { time: '18:00 IST (Est)', eventIntensity: 30, fareMovement: 7150, annotation: 'Primary runway reopened' },
];
