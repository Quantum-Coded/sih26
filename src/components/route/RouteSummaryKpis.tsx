import React from 'react';
import { RouteData } from '../../data/routes';
import { KpiCard } from '../common/KpiCard';

interface RouteSummaryKpisProps {
  route: RouteData;
}

export const RouteSummaryKpis: React.FC<RouteSummaryKpisProps> = ({ route }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
      <KpiCard
        label="Current Median Fare"
        value={`₹${route.currentFare.toLocaleString('en-IN')}`}
        trend={route.trend}
        trendLabel={route.trend === 'up' ? 'Escalating' : 'Discounting'}
        status={route.surgePct >= 20 ? 'critical' : route.surgePct >= 10 ? 'elevated' : 'healthy'}
        subValue="Economy unbundled"
        tooltip="Median scraped economy quote for departure date"
      />

      <KpiCard
        label="Comparable Baseline"
        value={`₹${route.baselineFare.toLocaleString('en-IN')}`}
        trend="stable"
        trendLabel="Historical"
        status="neutral"
        subValue="30-day moving median"
        tooltip="Normal seasonal benchmark fare for this booking window"
      />

      <KpiCard
        label="Surge Deviation"
        value={route.surgePct > 0 ? `+${route.surgePct}%` : `${route.surgePct}%`}
        trend={route.trend}
        trendLabel={route.surgePct >= 20 ? 'Extreme Surge' : route.surgePct >= 10 ? 'Elevated' : 'Within Band'}
        status={route.surgePct >= 20 ? 'critical' : route.surgePct >= 10 ? 'elevated' : 'healthy'}
        subValue={`Δ ₹${Math.abs(route.currentFare - route.baselineFare).toLocaleString('en-IN')}`}
        tooltip="Percentage difference between current quote and seasonal baseline"
      />

      <KpiCard
        label="Route Pressure Score"
        value={`${route.pressureScore} / 100`}
        trend="up"
        trendLabel={route.pressureScore >= 80 ? 'Severe Hold' : route.pressureScore >= 60 ? 'Tight' : 'Normal'}
        status={route.pressureScore >= 80 ? 'critical' : route.pressureScore >= 60 ? 'elevated' : 'healthy'}
        subValue="Normalized metric"
        tooltip="Composite pressure score reflecting velocity, seat exhaustion and delays"
      />

      <KpiCard
        label="Statistical Anomaly"
        value={`${route.zScore > 0 ? `+${route.zScore}` : route.zScore}σ`}
        trend={route.trend}
        trendLabel={route.zScore > 2 ? 'Outlier (>2σ)' : 'Standard'}
        status={route.zScore > 2 ? 'critical' : 'healthy'}
        subValue="Standard deviations"
        tooltip="Z-score statistical distance from historical distribution mean"
      />
    </div>
  );
};
