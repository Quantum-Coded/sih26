export interface InvestigationResult {
  id: string;
  query: string;
  routeId?: string;
  signalsChecked: Array<{ name: string; status: 'verified' | 'warning'; detail: string }>;
  headline: string;
  summary: string;
  keyDrivers: Array<{ title: string; contribution: string; detail: string }>;
  disclaimer: string;
  actions: Array<{ label: string; actionType: 'chart' | 'evidence' | 'trace' | 'navigate'; targetRoute: string }>;
  evidenceCards: Array<{ source: string; category: string; time: string; text: string }>;
}

export const PRESET_INVESTIGATIONS: Record<string, InvestigationResult> = {
  'delhi-mumbai': {
    id: 'inv-del-bom',
    query: 'Why did Delhi–Mumbai airfare rise today?',
    routeId: 'DEL-BOM',
    signalsChecked: [
      { name: 'Fare history (365d)', status: 'verified', detail: 'Identified 28.4% deviation from 30-day baseline' },
      { name: 'Comparable baseline', status: 'verified', detail: 'Seasonal baseline calculated at ₹5,825' },
      { name: 'Search demand acceleration', status: 'verified', detail: '+18.2% query spike detected in 2-hour window' },
      { name: 'Weather radar feeds', status: 'verified', detail: 'Convective thunderstorm cell & low cloud ceiling at BOM' },
      { name: 'Flight operations & ATC', status: 'verified', detail: 'Runway 09/27 calibration NOTAM + 26% delay rate' },
      { name: 'Event correlation engine', status: 'verified', detail: 'Temporal lag association estimated at 3.8 hours' },
      { name: 'Holiday proximity check', status: 'verified', detail: 'Leisure demand spillover from upcoming 3-day weekend' },
      { name: 'Audit & quote integrity', status: 'verified', detail: '142 live quotes validated with 0 phantom errors' }
    ],
    headline: 'DEL-BOM T+7 fares are ₹7,480 (+28.4% above ₹5,825 baseline) with Pressure Score 84/100.',
    summary: 'Airfare acceleration began at 08:30 IST following scheduled calibration on Mumbai runway 09/27 coinciding with thunderstorm-induced ground holds. Outbound delay rate rose to 26%, forcing sudden seat depletion across morning and evening non-stop flights.',
    keyDrivers: [
      { title: 'Airport Capacity Bottleneck', contribution: '+31%', detail: 'Single secondary runway 14/32 constrained aircraft arrival rate from 46 to 28/hr.' },
      { title: 'Algorithmic Yield Escalation', contribution: '+24%', detail: 'Airlines depleted economy discount buckets (T/U/V) within 90 minutes of initial delays.' },
      { title: 'Alternative Search Surge', contribution: '+18%', detail: 'Aggregator searches surged +18.2% as passengers sought same-day rebookings.' },
      { title: 'Weather Crosswind Factor', contribution: '+11%', detail: 'IMD Mumbai recorded gusts up to 28 knots with visibility dropping below 1800m.' }
    ],
    disclaimer: 'Statistical association detected (R² = 0.71, lag ~3.8h). Under MoSPI analytical standards, causality is an economic inference and not a formal legal determination.',
    actions: [
      { label: 'View Fare Movement Chart', actionType: 'navigate', targetRoute: '/route?id=DEL-BOM' },
      { label: 'Inspect Evidence Stack', actionType: 'navigate', targetRoute: '/events' },
      { label: 'Trace Index Calculation', actionType: 'navigate', targetRoute: '/audit' }
    ],
    evidenceCards: [
      { source: 'AAI NOTAM BOM/A1842/26', category: 'Operations', time: '09 Sep 06:15 IST', text: 'Runway 09/27 closed for calibration maintenance 06:00-11:00 UTC. Peak delay index 26%.' },
      { source: 'IMD Doppler Santacruz', category: 'Weather', time: '09 Sep 07:45 IST', text: 'Convective thunderstorm cell over Santacruz. Crosswinds on runway 14/32.' },
      { source: 'OTA Velocity Engine', category: 'Search demand', time: '09 Sep 09:20 IST', text: 'Rapid booking acceleration across IndiGo 6E-5021 and Air India AI-805.' }
    ]
  },
  'highest-surge': {
    id: 'inv-highest-surge',
    query: 'Which routes are under the highest surge pressure?',
    signalsChecked: [
      { name: 'National Basket Scan', status: 'verified', detail: '25 representative DGCA city pairs evaluated' },
      { name: 'Z-score thresholding', status: 'verified', detail: '14 routes found with Z > 1.5 sigma' },
      { name: 'Volume confirmation', status: 'verified', detail: 'Verified quote counts exceed statistical minimum' }
    ],
    headline: '14 of 25 monitored routes are currently exhibiting elevated or extreme surge pressure.',
    summary: 'The highest surge is observed on leisure & western corridors: DEL-SXR (+31.5%), DEL-BOM (+28.4%), and DEL-GOI (+28.0%). Eastern routes like DEL-PAT (+23.9%) are registering early festive reservation pressure.',
    keyDrivers: [
      { title: 'Srinagar Leisure Surge (DEL-SXR)', contribution: '31.5%', detail: 'Autumn valley tourism combined with high occupancy.' },
      { title: 'Western Metro Bottleneck (DEL-BOM)', contribution: '28.4%', detail: 'Mumbai ATC runway holds and corporate tech traffic.' },
      { title: 'Goa Coastal Leisure (DEL-GOI)', contribution: '28.0%', detail: 'Extended weekend getaway inventory depletion.' }
    ],
    disclaimer: 'Basket-wide scan completed across 1,284 verified observations.',
    actions: [
      { label: 'Open Surge Monitor', actionType: 'navigate', targetRoute: '/surges' },
      { label: 'View National Market Map', actionType: 'navigate', targetRoute: '/pulse' }
    ],
    evidenceCards: [
      { source: 'APIx Real-Time Feed', category: 'Price Action', time: '09 Sep 14:08 IST', text: 'Top 3 surging sectors contribute 68% of today’s +3.8% index jump.' }
    ]
  },
  'holiday-pressure': {
    id: 'inv-holiday',
    query: 'Compare holiday airfare pressure this year vs last year.',
    signalsChecked: [
      { name: 'Historical Archive (2025-2026)', status: 'verified', detail: 'Extracted 12-month backtested index logs' },
      { name: 'Festival calendar overlay', status: 'verified', detail: 'Mapped Diwali, Independence Day, Holi and Christmas' },
      { name: 'Yield Multipliers', status: 'verified', detail: 'Calculated ex-post average fare multiples' }
    ],
    headline: 'Holiday airfare elasticity is 14% higher in 2026 compared to 2025 across Tier-2 connecting sectors.',
    summary: 'While metro routes (DEL-BOM, BOM-BLR) exhibit predictable ~35-40% holiday surges, regional sectors (DEL-PAT, DEL-LKO) show intensifying spikes due to high train waitlists and limited seat capacity.',
    keyDrivers: [
      { title: 'Rail Spillover Substitution', contribution: '+42%', detail: 'Waitlists on Northern & Eastern railways directly drive airfare yield escalations.' },
      { title: 'Capacity Allocation', contribution: '+28%', detail: 'Airlines have redirected aircraft to high-yield tourism sectors, tightening regional seats.' }
    ],
    disclaimer: 'Based on ex-post DGCA traffic reports and APIx backtested indices.',
    actions: [
      { label: 'View Policy Analytics', actionType: 'navigate', targetRoute: '/policy' },
      { label: 'Backtest Validation', actionType: 'navigate', targetRoute: '/backtest' }
    ],
    evidenceCards: [
      { source: 'DGCA Passenger Yield Archive', category: 'Operations', time: 'Aug 2026', text: 'Year-on-year domestic passenger volume expanded 11.2%.' }
    ]
  },
  'hindi-mumbai': {
    id: 'inv-hi-mumbai',
    query: 'दिल्ली से मुंबई का एयरफेयर आज क्यों बढ़ रहा है? (Delhi se Mumbai ka airfare aaj kyun badh raha hai?)',
    routeId: 'DEL-BOM',
    signalsChecked: [
      { name: 'मूल्य इतिहास विश्लेषण (Fare History)', status: 'verified', detail: '30-दिवसीय बेसलाइन से 28.4% की वृद्धि दर्ज' },
      { name: 'मुंबई मौसम व रडार (Weather & Radar)', status: 'verified', detail: 'सांताक्रूज़ में आंधी और कम दृश्यता (Thunderstorm)' },
      { name: 'हवाई अड्डा संचालन (Runway Operations)', status: 'verified', detail: 'रनवे 09/27 पर मेंटेनेंस; उड़ानों में 26% की देरी' }
    ],
    headline: 'दिल्ली-मुंबई (DEL-BOM) का किराया आज 28.4% बढ़कर ₹7,480 हो गया है (दबाव स्कोर: 84/100)।',
    summary: 'आज सुबह मुंबई एयरपोर्ट के मुख्य रनवे पर जांच कार्य और अचानक बारिश के कारण उड़ानों में भारी देरी हुई। सीटें तेजी से बुक होने के कारण एयरलाइंस के डायनामिक प्राइसिंग एल्गोरिदम ने किरायों में वृद्धि कर दी।',
    keyDrivers: [
      { title: 'रनवे और मौसम की बाधाएं', contribution: '+31%', detail: 'रनवे 09/27 बंद होने से उड़ानों की संख्या प्रति घंटा 46 से घटकर 28 रह गई।' },
      { title: 'सीटों की अचानक मांग', contribution: '+24%', detail: 'उड़ानों के समय में बदलाव से अंतिम समय की टिकट बुकिंग में तेजी आई।' }
    ],
    disclaimer: 'यह विश्लेषण वास्तविक समय डेटा और डीजीसीए दिशा-निर्देशों पर आधारित है।',
    actions: [
      { label: 'रूट विवरण देखें (Route Intelligence)', actionType: 'navigate', targetRoute: '/route?id=DEL-BOM' },
      { label: 'इवेंट्स की जांच करें (Event Intelligence)', actionType: 'navigate', targetRoute: '/events' }
    ],
    evidenceCards: [
      { source: 'DGCA NOTAM BOM/A1842/26', category: 'Operations', time: '09 Sep 06:15 IST', text: 'मुंबई एयरपोर्ट पर 26% उड़ानों में देरी की पुष्टि।' }
    ]
  }
};
