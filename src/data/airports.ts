export interface Airport {
  iata: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  // Normalized coordinates for custom SVG map (viewBox 0 0 800 900)
  svgX: number;
  svgY: number;
  type: 'tier1' | 'tier2';
  trafficShare: number; // in percentage
}

// 18 Key Indian Airports strategically mapped to accurate SVG canvas proportions
export const AIRPORTS: Record<string, Airport> = {
  DEL: { iata: 'DEL', name: 'Indira Gandhi International', city: 'Delhi', state: 'Delhi', lat: 28.5562, lng: 77.1000, svgX: 345, svgY: 250, type: 'tier1', trafficShare: 18.2 },
  BOM: { iata: 'BOM', name: 'Chhatrapati Shivaji Maharaj', city: 'Mumbai', state: 'Maharashtra', lat: 19.0896, lng: 72.8656, svgX: 255, svgY: 485, type: 'tier1', trafficShare: 14.8 },
  BLR: { iata: 'BLR', name: 'Kempegowda International', city: 'Bengaluru', state: 'Karnataka', lat: 13.1986, lng: 77.7066, svgX: 355, svgY: 670, type: 'tier1', trafficShare: 10.5 },
  HYD: { iata: 'HYD', name: 'Rajiv Gandhi International', city: 'Hyderabad', state: 'Telangana', lat: 17.2403, lng: 78.4294, svgX: 375, svgY: 535, type: 'tier1', trafficShare: 7.2 },
  CCU: { iata: 'CCU', name: 'Netaji Subhash Chandra Bose', city: 'Kolkata', state: 'West Bengal', lat: 22.6547, lng: 88.4467, svgX: 615, svgY: 410, type: 'tier1', trafficShare: 6.5 },
  MAA: { iata: 'MAA', name: 'Chennai International', city: 'Chennai', state: 'Tamil Nadu', lat: 12.9941, lng: 80.1709, svgX: 410, svgY: 685, type: 'tier1', trafficShare: 5.9 },
  AMD: { iata: 'AMD', name: 'Sardar Vallabhbhai Patel', city: 'Ahmedabad', state: 'Gujarat', lat: 23.0772, lng: 72.6347, svgX: 250, svgY: 385, type: 'tier1', trafficShare: 3.8 },
  COK: { iata: 'COK', name: 'Cochin International', city: 'Kochi', state: 'Kerala', lat: 10.1518, lng: 76.3930, svgX: 325, svgY: 765, type: 'tier1', trafficShare: 3.4 },
  GOI: { iata: 'GOI', name: 'Dabolim / Mopa', city: 'Goa', state: 'Goa', lat: 15.3808, lng: 73.8314, svgX: 275, svgY: 600, type: 'tier2', trafficShare: 3.1 },
  PNQ: { iata: 'PNQ', name: 'Pune Airport', city: 'Pune', state: 'Maharashtra', lat: 18.5821, lng: 73.9197, svgX: 285, svgY: 510, type: 'tier2', trafficShare: 2.8 },
  JAI: { iata: 'JAI', name: 'Jaipur International', city: 'Jaipur', state: 'Rajasthan', lat: 26.8242, lng: 75.8122, svgX: 315, svgY: 295, type: 'tier2', trafficShare: 1.9 },
  LKO: { iata: 'LKO', name: 'Chaudhary Charan Singh', city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.7606, lng: 80.8893, svgX: 435, svgY: 300, type: 'tier2', trafficShare: 2.1 },
  GAU: { iata: 'GAU', name: 'Lokpriya Gopinath Bordoloi', city: 'Guwahati', state: 'Assam', lat: 26.1061, lng: 91.5859, svgX: 690, svgY: 325, type: 'tier2', trafficShare: 1.8 },
  PAT: { iata: 'PAT', name: 'Jay Prakash Narayan', city: 'Patna', state: 'Bihar', lat: 25.5913, lng: 85.0880, svgX: 535, svgY: 335, type: 'tier2', trafficShare: 1.7 },
  BBI: { iata: 'BBI', name: 'Biju Patnaik', city: 'Bhubaneswar', state: 'Odisha', lat: 20.2444, lng: 85.8178, svgX: 555, svgY: 480, type: 'tier2', trafficShare: 1.5 },
  SXR: { iata: 'SXR', name: 'Sheikh ul-Alam', city: 'Srinagar', state: 'Jammu & Kashmir', lat: 34.0047, lng: 74.7742, svgX: 295, svgY: 120, type: 'tier2', trafficShare: 1.6 },
  IXC: { iata: 'IXC', name: 'Shaheed Bhagat Singh', city: 'Chandigarh', state: 'Punjab/Haryana', lat: 30.6735, lng: 76.7885, svgX: 335, svgY: 195, type: 'tier2', trafficShare: 1.3 },
  TRV: { iata: 'TRV', name: 'Thiruvananthapuram', city: 'Trivandrum', state: 'Kerala', lat: 8.4821, lng: 76.9200, svgX: 335, svgY: 815, type: 'tier2', trafficShare: 1.1 }
};
