import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { KpiCard } from '../components/common/KpiCard';
import { ForecastChart } from '../components/forecast/ForecastChart';
import { ScenarioSimulator } from '../components/forecast/ScenarioSimulator';
import { ExplainablePredictionBars } from '../components/forecast/ExplainablePredictionBars';
import { LineChart, Sparkles } from 'lucide-react';

export const FareForecast: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SectionHeader
        title="Predictive Fare Pressure & Scenario Simulation"
        subtitle="Forecasting near-term airfare trajectories and quantifying the impact of delay cascades, search momentum, and weather squalls on ticket prices."
        badge={
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
            <LineChart className="w-3.5 h-3.5 text-indigo-600" />
            ML Forecast Model v2.1
          </span>
        }
      />

      {/* TOP KPI ROW */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <KpiCard
          label="Current Scraped Fare"
          value="₹7,480"
          trend="up"
          trendLabel="+28.4%"
          status="critical"
          subValue="DEL-BOM (T+7)"
          tooltip="Current live median economy quote"
        />

        <KpiCard
          label="Model Predicted Fare"
          value="₹7,350"
          trend="down"
          trendLabel="-1.7% from peak"
          status="healthy"
          subValue="Expected in 48h"
          tooltip="Estimated fare level once runway calibration NOTAM clears"
        />

        <KpiCard
          label="Forecast Band (90% CI)"
          value="₹7,200–₹7,700"
          trend="stable"
          trendLabel="Tight Range"
          status="neutral"
          subValue="Margin: &plusmn;₹250"
          tooltip="Bayesian confidence bounds around forecast point"
        />

        <KpiCard
          label="Surge Probability"
          value="78%"
          trend="up"
          trendLabel="High Pressure"
          status="critical"
          subValue="Next 72 Hours"
          tooltip="Probability that fare remains elevated above +15% baseline"
        />

        <KpiCard
          label="Model Confidence"
          value="High"
          trend="stable"
          trendLabel="R² = 0.884"
          status="healthy"
          subValue="Backtested"
          tooltip="Model accuracy on 12-month historical out-of-sample data"
        />
      </div>

      {/* Primary Forecast Chart */}
      <ForecastChart />

      {/* Interactive What-If Scenario Simulator */}
      <ScenarioSimulator />

      {/* Explainable Prediction Feature Attributions */}
      <ExplainablePredictionBars />
    </div>
  );
};
