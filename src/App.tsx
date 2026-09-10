import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoModeProvider } from './context/DemoModeContext';
import { AppShell } from './components/layout/AppShell';

// Pages
import { NationalPulse } from './pages/NationalPulse';
import { RouteIntelligence } from './pages/RouteIntelligence';
import { SurgeMonitor } from './pages/SurgeMonitor';
import { EventIntelligence } from './pages/EventIntelligence';
import { FareForecast } from './pages/FareForecast';
import { PolicyAnalytics } from './pages/PolicyAnalytics';
import { AuditDataTrust } from './pages/AuditDataTrust';
import { ValidationBacktest } from './pages/ValidationBacktest';
import { AskApix } from './pages/AskApix';
import { GovernmentApiExplorer } from './pages/GovernmentApiExplorer';
import { PowerBiAnalytics } from './pages/PowerBiAnalytics';

export const App: React.FC = () => {
  return (
    <DemoModeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<NationalPulse />} />
            <Route path="pulse" element={<NationalPulse />} />
            <Route path="route" element={<RouteIntelligence />} />
            <Route path="surges" element={<SurgeMonitor />} />
            <Route path="events" element={<EventIntelligence />} />
            <Route path="forecast" element={<FareForecast />} />
            <Route path="policy" element={<PolicyAnalytics />} />
            <Route path="powerbi" element={<PowerBiAnalytics />} />
            <Route path="audit" element={<AuditDataTrust />} />
            <Route path="backtest" element={<ValidationBacktest />} />
            <Route path="ask" element={<AskApix />} />
            <Route path="api-explorer" element={<GovernmentApiExplorer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DemoModeProvider>
  );
};

export default App;
