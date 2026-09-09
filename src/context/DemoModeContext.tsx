import React, { createContext, useContext, useState } from 'react';
import { MUMBAI_SURGE_SCENARIO, DemoScenario } from '../data/demoScenario';

interface DemoModeContextType {
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  scenario: DemoScenario;
  selectedRouteId: string;
  setSelectedRouteId: (routeId: string) => void;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  isVoiceOpen: boolean;
  setIsVoiceOpen: (open: boolean) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

export const DemoModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true); // Defaults to true for judge demo
  const [selectedRouteId, setSelectedRouteId] = useState<string>('DEL-BOM');
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
