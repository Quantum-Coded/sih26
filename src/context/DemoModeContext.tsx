import React, { createContext, useContext, useState, useMemo } from 'react';
import { MUMBAI_SURGE_SCENARIO, DemoScenario } from '../data/demoScenario';
import { RouteData } from '../data/routes';
import {
  getDynamicRoutes,
  getNationalKpis,
  computeDateMultiplier,
  NationalKpis,
} from '../utils/dynamicEconometrics';

interface DemoModeContextType {
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  scenario: DemoScenario;
  selectedRouteId: string;
  setSelectedRouteId: (routeId: string) => void;
  travelDate: string;
  setTravelDate: (date: string) => void;
  routes: RouteData[];
  currentRoute: RouteData;
  nationalKpis: NationalKpis;
  dateMultiplier: number;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  isVoiceOpen: boolean;
  setIsVoiceOpen: (open: boolean) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const getInitialTravelDate = (): string => {
  // Default to today + 7 days (standard advance booking window)
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
};

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

export const DemoModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true); // Defaults to true for judge demo
  const [selectedRouteId, setSelectedRouteId] = useState<string>('DEL-BOM');
  const [travelDate, setTravelDate] = useState<string>(getInitialTravelDate());
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamically compute routes, national KPIs, and multipliers whenever travelDate changes
  const routes = useMemo(() => {
    return getDynamicRoutes(travelDate);
  }, [travelDate]);

  const nationalKpis = useMemo(() => {
    return getNationalKpis(travelDate);
  }, [travelDate]);

  const currentRoute = useMemo(() => {
    return routes.find((r) => r.id === selectedRouteId) || routes[0];
  }, [routes, selectedRouteId]);

  const { multiplier: dateMultiplier } = useMemo(() => {
    return computeDateMultiplier(travelDate);
  }, [travelDate]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  return (
    <DemoModeContext.Provider
      value={{
        isDemoMode,
        setIsDemoMode,
        scenario: MUMBAI_SURGE_SCENARIO,
        selectedRouteId,
        setSelectedRouteId,
        travelDate,
        setTravelDate,
        routes,
        currentRoute,
        nationalKpis,
        dateMultiplier,
        isCopilotOpen,
        setIsCopilotOpen,
        isVoiceOpen,
        setIsVoiceOpen,
        selectedLanguage,
        setSelectedLanguage,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </DemoModeContext.Provider>
  );
};

export const useDemoMode = (): DemoModeContextType => {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return context;
};
