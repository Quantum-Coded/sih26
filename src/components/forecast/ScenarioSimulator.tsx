import React, { useState } from 'react';
import { calculateScenarioForecast } from '../../data/forecastData';
import { Sliders, RotateCcw, Sparkles } from 'lucide-react';
import { RupeeValue } from '../common/RupeeValue';

export const ScenarioSimulator: React.FC = () => {
  const [searchDemand, setSearchDemand] = useState<number>(18);
  const [weatherRisk, setWeatherRisk] = useState<number>(2); // 0 to 3
  const [delayRate, setDelayRate] = useState<number>(26); // %
  const [eventSeverity, setEventSeverity] = useState<number>(4); // 1 to 5

  const baselineFare = 5825;
  const sim = calculateScenarioForecast(baselineFare, searchDemand, weatherRisk, delayRate, eventSeverity);

  const handleReset = () => {
    setSearchDemand(18);
    setWeatherRisk(2);
    setDelayRate(26);
    setEventSeverity(4);
  };

  const weatherLabels = ['Clear Skies (0)', 'Moderate Convective (1)', 'High Squall / Alert (2)', 'Severe Ground Stop (3)'];

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-700" />
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Interactive What-If Scenario Simulator
            </h3>
            <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
              Illustrative model scenario
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Adjust contextual flight delay rates, storm warnings, and search pressure to observe simulated model response
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-brand-700 font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive Sliders Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Slider 1: Search Demand */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-ink-primary">Aggregator Search Query Acceleration:</span>
              <span className="font-bold font-mono text-brand-700">{searchDemand > 0 ? `+${searchDemand}%` : `${searchDemand}%`}</span>
            </div>
            <input
              type="range"
              min="-20"
              max="50"
              value={searchDemand}
              onChange={(e) => setSearchDemand(Number(e.target.value))}
              className="w-full h-1.5 bg-subtle rounded-lg appearance-none cursor-pointer accent-brand-700"
            />
            <div className="flex justify-between text-[10px] text-ink-muted">
              <span>-20% (Depressed)</span>
              <span>Baseline (0%)</span>
              <span>+50% (Extreme Rush)</span>
            </div>
          </div>

          {/* Slider 2: Weather Risk */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-ink-primary">IMD Coastal Weather Warning Level:</span>
              <span className="font-bold font-mono text-amber-700">{weatherLabels[weatherRisk]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="1"
              value={weatherRisk}
              onChange={(e) => setWeatherRisk(Number(e.target.value))}
              className="w-full h-1.5 bg-subtle rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* Slider 3: Delay Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-ink-primary">Airport Outbound Delay Rate (%):</span>
              <span className="font-bold font-mono text-rose-700">{delayRate}% Delays</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={delayRate}
              onChange={(e) => setDelayRate(Number(e.target.value))}
              className="w-full h-1.5 bg-subtle rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[10px] text-ink-muted">
              <span>5% (Smooth)</span>
              <span>15% (Normal Peak)</span>
              <span>50% (Gridlock)</span>
            </div>
          </div>

          {/* Slider 4: Event Severity */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-ink-primary">Secondary Runway / NOTAM Constraint Severity:</span>
              <span className="font-bold font-mono text-indigo-700">Level {eventSeverity} / 5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={eventSeverity}
              onChange={(e) => setEventSeverity(Number(e.target.value))}
              className="w-full h-1.5 bg-subtle rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        {/* Right: Dynamic Output Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-brand-900 text-white rounded-xl p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Dynamic Model Projections
            </span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono text-slate-300">
              Live Recalculation
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-slate-400 block">Simulated Predicted Fare</span>
              <div className="text-2xl font-extrabold text-white tabular-nums">
                ₹{sim.predictedFare.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-slate-400">
                Confidence Band: ₹{sim.lowerBound.toLocaleString('en-IN')} – ₹{sim.upperBound.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Surge Probability</span>
                <span className="text-lg font-bold text-rose-400 font-mono">
                  {sim.surgeProbability}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Deviation vs Baseline</span>
                <span className={`text-lg font-bold font-mono ${sim.deltaPct > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {sim.deltaPct > 0 ? `+${sim.deltaPct}%` : `${sim.deltaPct}%`}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 italic bg-white/5 p-2 rounded">
            Changes in input variables trigger immediate recalculation of dynamic pricing elasticity curves.
          </div>
        </div>
      </div>
    </div>
  );
};
