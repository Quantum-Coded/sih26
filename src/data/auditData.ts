export interface PipelineStep {
  id: string;
  name: string;
  countLabel: string;
  status: 'passed' | 'warning';
  passRate: string;
  description: string;
  processingTimeMs: number;
}

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'step-1',
    name: '1. SOURCE INGESTION',
    countLabel: '1,312 Raw Signals',
    status: 'passed',
    passRate: '100%',
    description: 'Multi-threaded scrapers targeting IndiGo, Air India, Akasa, SpiceJet, MakeMyTrip, EaseMyTrip & Ixigo.',
    processingTimeMs: 1420
  },
  {
    id: 'step-2',
    name: '2. RAW QUOTE PARSE',
    countLabel: '1,296 Parsed Quotes',
    status: 'passed',
    passRate: '98.8%',
    description: 'Extraction of base fare, passenger service fees, UDF, fuel surcharge, and convenience fees from JSON/HTML DOM.',
    processingTimeMs: 380
  },
  {
    id: 'step-3',
    name: '3. NORMALIZATION',
    countLabel: '1,296 Normalized',
    status: 'passed',
    passRate: '100%',
    description: 'Standardized to INR, IST departure timestamps, single-passenger economy unbundled baseline.',
    processingTimeMs: 110
  },
  {
    id: 'step-4',
    name: '4. DEDUPLICATION',
    countLabel: '1,284 Unique Pairs',
    status: 'passed',
    passRate: '99.1%',
    description: 'De-duplicated across carrier direct portals and OTA feeds; direct airline fare prioritized where variance < 1.5%.',
    processingTimeMs: 160
  },
  {
    id: 'step-5',
    name: '5. OUTLIER / PHANTOM CHECK',
    countLabel: '1,262 Passed Filter',
    status: 'warning',
    passRate: '98.3%',
    description: 'Filtered 22 phantom fare quotes (sold-out seat caches that error at payment checkout step).',
    processingTimeMs: 240
  },
  {
    id: 'step-6',
    name: '6. VALID OBSERVATION BASKET',
    countLabel: '1,248 Verified Quotes',
    status: 'passed',
    passRate: '98.9%',
    description: 'Assigned to the representative 25 DGCA city-pair baskets across 5 lead-time windows (T+1 to T+45).',
    processingTimeMs: 85
  },
  {
    id: 'step-7',
    name: '7. ROUTE SUB-INDEX',
    countLabel: '25 City-Pair Indexes',
    status: 'passed',
    passRate: '100%',
    description: 'Weighted geometric mean computed for each route based on airline passenger seat share.',
    processingTimeMs: 45
  },
  {
    id: 'step-8',
    name: '8. NATIONAL APIx PUBLICATION',
    countLabel: 'Index: 117.4 (+3.8%)',
    status: 'passed',
    passRate: '100%',
    description: 'Consolidated Laspeyres price index weighted by DGCA annual passenger kilometer metrics.',
    processingTimeMs: 25
  }
];

export interface AuditQuote {
  quoteId: string;
  route: string;
  airline: string;
  airlineName: string;
  observedAt: string;
  baseFare: number;
  tax: number;
  fee: number;
  totalFare: number;
  leadTime: string;
  status: 'VERIFIED' | 'ADJUSTED' | 'OUTLIER_FLAGGED';
  source: string;
  methodology: string;
  hash: string;
  rawJson: string;
}

export const AUDIT_QUOTES: AuditQuote[] = [
  {
    quoteId: 'AX-20260909-00421',
    route: 'DEL-BOM',
    airline: '6E',
    airlineName: 'IndiGo (6E-5021)',
    observedAt: '09 Sep 2026, 14:02:18 IST',
    baseFare: 5780,
    tax: 1100,
    fee: 600,
    totalFare: 7480,
    leadTime: 'T+7',
    status: 'VERIFIED',
    source: 'IndiGo Direct API Scraper v2.4',
    methodology: 'APIx-v1.2',
    hash: '0x8f2d4e199c4b72a1e8093d9a04f21',
    rawJson: JSON.stringify({ flightNumber: '6E-5021', dep: 'DEL 18:30', arr: 'BOM 20:45', class: 'Y-Standard', base: 5780, cgst: 289, sgst: 289, udf: 412, psc: 110, total: 7480, scrapedAtUtc: '2026-09-09T08:32:18Z' }, null, 2)
  },
  {
    quoteId: 'AX-20260909-00422',
    route: 'DEL-BOM',
    airline: 'AI',
    airlineName: 'Air India (AI-805)',
    observedAt: '09 Sep 2026, 14:03:04 IST',
    baseFare: 6350,
    tax: 1150,
    fee: 600,
    totalFare: 8100,
    leadTime: 'T+7',
    status: 'VERIFIED',
    source: 'Air India NDC Portal',
    methodology: 'APIx-v1.2',
    hash: '0x3c71a9f029b4e1837d9910a30b5e',
    rawJson: JSON.stringify({ flightNumber: 'AI-805', dep: 'DEL 20:00', arr: 'BOM 22:15', class: 'Economy-Classic', base: 6350, taxes: 1150, fees: 600, total: 8100 }, null, 2)
  },
  {
    quoteId: 'AX-20260909-00423',
    route: 'BOM-BLR',
    airline: 'QP',
    airlineName: 'Akasa Air (QP-1311)',
    observedAt: '09 Sep 2026, 14:04:12 IST',
    baseFare: 5590,
    tax: 1060,
    fee: 600,
    totalFare: 7250,
    leadTime: 'T+7',
    status: 'VERIFIED',
    source: 'MakeMyTrip OTA Feed',
    methodology: 'APIx-v1.2',
    hash: '0x992b104928feac193b0183e921d7',
    rawJson: JSON.stringify({ flightNumber: 'QP-1311', dep: 'BOM 09:15', arr: 'BLR 10:55', fare: 7250, verifiedCheckout: true }, null, 2)
  },
  {
    quoteId: 'AX-20260909-00424',
    route: 'DEL-BOM',
    airline: 'SG',
    airlineName: 'SpiceJet (SG-124)',
    observedAt: '09 Sep 2026, 13:58:45 IST',
    baseFare: 5980,
    tax: 1070,
    fee: 600,
    totalFare: 7650,
    leadTime: 'T+7',
    status: 'VERIFIED',
    source: 'EaseMyTrip Live Scraper',
    methodology: 'APIx-v1.2',
    hash: '0x2a10b9cd44e829314e8a1290bb34',
    rawJson: JSON.stringify({ flightNumber: 'SG-124', total: 7650, seatAvailability: 3 }, null, 2)
  },
  {
    quoteId: 'AX-20260909-00425',
    route: 'DEL-GOI',
    airline: '6E',
    airlineName: 'IndiGo (6E-6104)',
    observedAt: '09 Sep 2026, 14:01:50 IST',
    baseFare: 6750,
    tax: 1100,
    fee: 600,
    totalFare: 8450,
    leadTime: 'T+7',
    status: 'VERIFIED',
    source: 'IndiGo Direct API Scraper v2.4',
    methodology: 'APIx-v1.2',
    hash: '0x17b38c2901eeff443219aa0182b8',
    rawJson: JSON.stringify({ flightNumber: '6E-6104', total: 8450, fareTier: 'Peak-Leisure' }, null, 2)
  },
  {
    quoteId: 'AX-20260909-00426',
    route: 'DEL-BOM',
    airline: 'AI',
    airlineName: 'Air India (AI-658)',
    observedAt: '09 Sep 2026, 13:45:10 IST',
    baseFare: 14200,
    tax: 2100,
    fee: 600,
    totalFare: 16900,
    leadTime: 'T+7',
    status: 'OUTLIER_FLAGGED',
    source: 'Yatra Portal Feed',
    methodology: 'APIx-v1.2',
    hash: '0xfa89100234b912a77103ec190012',
    rawJson: JSON.stringify({ flightNumber: 'AI-658', class: 'Business-J-Class', flag: 'Non-Economy quote detected in economy basket', rejectedAtStep: 'OUTLIER_CHECK' }, null, 2)
  },
];

// Interactive "Trace This Number" Tree for Index 117.4
export interface ProvenanceNode {
  id: string;
  label: string;
  value: string;
  subtext: string;
  badge?: string;
  children?: ProvenanceNode[];
}

export const PROVENANCE_TREE: ProvenanceNode = {
  id: 'root',
  label: 'National Airfare Price Index (APIx)',
  value: '117.4',
  subtext: 'Computed 09 Sep 2026, 14:08 IST • Base Year 2024 = 100',
  badge: '+3.8% Daily Delta',
  children: [
    {
      id: 'sub-del-bom',
      label: 'DEL → BOM Sector Basket (Weight: 14.5%)',
      value: 'Index: 128.4',
      subtext: 'Route median: ₹7,480 (Baseline: ₹5,825 • +28.4%)',
      badge: 'Contributes +1.4 pts',
      children: [
        {
          id: 'quote-6e',
          label: 'IndiGo 6E Quotes (61.8% route weight)',
          value: '₹7,480 median',
          subtext: '22 observed flights • 142 live quotes captured',
          children: [
            { id: 'raw-6e', label: 'Quote AX-20260909-00421', value: '₹7,480', subtext: 'Base ₹5,780 + Taxes ₹1,100 + UDF ₹600 • Verified at 14:02 IST' },
            { id: 'clean-6e', label: 'Cleaning Rule CR-04 Applied', value: 'Passed', subtext: 'Deduplicated with MMT quote #8192; direct carrier chosen.' }
          ]
        },
        {
          id: 'quote-ai',
          label: 'Air India AI Quotes (21.4% route weight)',
          value: '₹8,100 median',
          subtext: '14 observed flights • Validated against NDC GDS feed',
          children: [
            { id: 'raw-ai', label: 'Quote AX-20260909-00422', value: '₹8,100', subtext: 'Base ₹6,350 + Taxes ₹1,150 + Fees ₹600' }
          ]
        },
        {
          id: 'quote-qp',
          label: 'Akasa Air QP Quotes (11.2% route weight)',
          value: '₹7,250 median',
          subtext: '6 observed flights • Lowest economy tier'
        }
      ]
    },
    {
      id: 'sub-bom-blr',
      label: 'BOM → BLR Sector Basket (Weight: 9.8%)',
      value: 'Index: 121.2',
      subtext: 'Route median: ₹6,920 (Baseline: ₹5,710 • +21.2%)',
      badge: 'Contributes +0.9 pts',
      children: [
        { id: 'quote-bom-blr-all', label: '118 Quotes consolidated across 4 carriers', value: '₹6,920 median', subtext: 'All passed sanity check Z < 2.5' }
      ]
    },
    {
      id: 'sub-del-blr',
      label: 'DEL → BLR Sector Basket (Weight: 11.2%)',
      value: 'Index: 116.0',
      subtext: 'Route median: ₹8,350 (Baseline: ₹7,200 • +16.0%)',
      badge: 'Contributes +0.6 pts'
    },
    {
      id: 'sub-others',
      label: 'Remaining 22 City-Pairs (Weight: 64.5%)',
      value: 'Weighted Index: 111.8',
      subtext: 'Aggregated via Laspeyres formula using 2025-26 DGCA seat share weights',
      badge: 'Contributes +0.9 pts'
    }
  ]
};
