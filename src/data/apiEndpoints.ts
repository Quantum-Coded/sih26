export interface ApiParam {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string;
  description: string;
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  title: string;
  description: string;
  category: 'Index' | 'Routes' | 'Surge' | 'Forecast' | 'Audit';
  params: ApiParam[];
  sampleResponse: Record<string, any>;
}

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: 'ep-1',
    method: 'GET',
    path: '/api/v1/index/latest',
    title: 'National Airfare Price Index',
    description: 'Retrieves current official APIx index level, intraday delta, and basket data quality metrics.',
    category: 'Index',
    params: [
      { name: 'base_year', type: 'string', required: false, defaultValue: '2024', description: 'Reference base year (default 2024 = 100)' },
      { name: 'frequency', type: 'string', required: false, defaultValue: 'daily', description: 'Interval frequency: daily | weekly | monthly' }
    ],
    sampleResponse: {
      status: 'success',
      timestamp: '2026-09-09T14:08:00+05:30',
      data: {
        apix_value: 117.4,
        base_period: '2024=100',
        change_today_pct: 3.8,
        change_7d_pct: 7.9,
        change_30d_pct: 12.6,
        pressure_score: 68,
        active_routes_in_basket: 25,
        total_observations_evaluated: 1284,
        data_quality_score: 96.8,
        methodology_version: 'APIx-v1.2',
        regulatory_authority: 'MoSPI / NSO CPI-Augmentation Specification'
      }
    }
  },
  {
    id: 'ep-2',
    method: 'GET',
    path: '/api/v1/routes/DEL-BOM',
    title: 'Route Intelligence Summary',
    description: 'Fetches sector-level pricing, historical baseline, lead-time elasticity curve, and carrier quotes.',
    category: 'Routes',
    params: [
      { name: 'lead_time', type: 'string', required: false, defaultValue: 'T+7', description: 'Advance booking bucket: T+1, T+7, T+15, T+30, T+45' },
      { name: 'currency', type: 'string', required: false, defaultValue: 'INR', description: 'Currency code' }
    ],
    sampleResponse: {
      status: 'success',
      route: 'DEL-BOM',
      sector: 'Delhi Indira Gandhi (DEL) → Mumbai Chhatrapati Shivaji (BOM)',
      departure_date: '2026-09-16',
      lead_time: 'T+7',
      pricing: {
        median_fare: 7480,
        baseline_fare: 5825,
        surge_pct: 28.4,
        pressure_score: 84,
        z_score: 2.31,
        anomaly_flag: true,
        price_position: 'EXTREME'
      },
      carrier_quotes: [
        { code: '6E', name: 'IndiGo', median_fare: 7480, flights: 22 },
        { code: 'AI', name: 'Air India', median_fare: 8100, flights: 14 },
        { code: 'QP', name: 'Akasa Air', median_fare: 7250, flights: 6 }
      ],
      attribution: {
        primary_driver: 'Mumbai ATC Radar & Crosswind Delays',
        association_score: 0.71
      }
    }
  },
  {
    id: 'ep-3',
    method: 'GET',
    path: '/api/v1/surge',
    title: 'Surge Anomaly Monitor',
    description: 'Lists all city pairs currently exhibiting statistical fare surges above 2.0 sigma with fingerprint scores.',
    category: 'Surge',
    params: [
      { name: 'min_surge_pct', type: 'number', required: false, defaultValue: '15.0', description: 'Filter threshold for percentage above baseline' },
      { name: 'severity', type: 'string', required: false, defaultValue: 'all', description: 'Filter: elevated | high | extreme' }
    ],
    sampleResponse: {
      status: 'success',
      timestamp: '2026-09-09T14:08:00+05:30',
      active_surges_count: 14,
      surging_routes: [
        { route: 'DEL-SXR', surge_pct: 31.5, z_score: 2.45, current_fare: 7100, baseline: 5400, driver: 'Autumn Tourism' },
        { route: 'DEL-BOM', surge_pct: 28.4, z_score: 2.31, current_fare: 7480, baseline: 5825, driver: 'Operations & Demand' },
        { route: 'DEL-GOI', surge_pct: 28.0, z_score: 2.15, current_fare: 8450, baseline: 6600, driver: 'Weekend Leisure' },
        { route: 'BOM-GOI', surge_pct: 26.9, z_score: 1.95, current_fare: 4950, baseline: 3900, driver: 'Coastal Inflow' },
        { route: 'DEL-PAT', surge_pct: 23.9, z_score: 2.05, current_fare: 6320, baseline: 5100, driver: 'Festive Pre-booking' },
        { route: 'BOM-BLR', surge_pct: 21.2, z_score: 1.84, current_fare: 6920, baseline: 5710, driver: 'Tech Corridor Congestion' }
      ]
    }
  },
  {
    id: 'ep-4',
    method: 'GET',
    path: '/api/v1/forecast/DEL-BOM',
    title: 'Predictive Fare Pressure',
    description: 'Returns machine-learning generated fare projections, confidence intervals, and feature attribution.',
    category: 'Forecast',
    params: [
      { name: 'horizon', type: 'string', required: false, defaultValue: '7d', description: 'Forecast window: 24h | 3d | 7d' }
    ],
    sampleResponse: {
      status: 'success',
      route: 'DEL-BOM',
      current_fare: 7480,
      predicted_fare_t7: 7350,
      confidence_interval: [7200, 7700],
      surge_probability: 0.78,
      model_confidence: 'High',
      feature_attributions: {
        lead_time_decay: 0.31,
        fare_momentum: 0.24,
        search_demand_velocity: 0.18,
        coastal_weather: 0.11,
        holiday_proximity: 0.09,
        atc_operations: 0.05,
        macro_atf: 0.02
      }
    }
  },
  {
    id: 'ep-5',
    method: 'GET',
    path: '/api/v1/audit/AX-20260909-00421',
    title: 'Quote Provenance Audit',
    description: 'Cryptographic hash, scraping timestamps, raw JSON payloads, and validation decision logs for a quote.',
    category: 'Audit',
    params: [
      { name: 'quote_id', type: 'string', required: true, defaultValue: 'AX-20260909-00421', description: 'Unique quote identifier' }
    ],
    sampleResponse: {
      status: 'success',
      quote_id: 'AX-20260909-00421',
      hash_signature: '0x8f2d4e199c4b72a1e8093d9a04f21',
      collected_at_utc: '2026-09-09T08:32:18Z',
      normalized_at_ist: '2026-09-09T14:02:18+05:30',
      source_engine: 'IndiGo Direct API Scraper v2.4',
      validation_pipeline: {
        deduplicated: true,
        outlier_checked: true,
        currency_converted: 'INR (1.0)',
        fare_class: 'Economy Standard',
        audit_verdict: 'PASSED'
      },
      fare_breakdown: {
        base_fare: 5780,
        cgst: 289,
        sgst: 289,
        udf_fee: 412,
        passenger_service_fee: 110,
        total: 7480
      }
    }
  }
];
