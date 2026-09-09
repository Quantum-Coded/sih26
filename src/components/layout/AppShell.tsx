import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { DemoModeBanner } from './DemoModeBanner';
import { AiCopilotDrawer } from '../copilot/AiCopilotDrawer';
import { VoiceModal } from '../copilot/VoiceModal';
import { Toast } from '../common/Toast';

export const AppShell: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas">
      {/* Fixed Left Navigation */}
      <Sidebar />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <TopBar />
        <DemoModeBanner />

        {/* Scrollable Page Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1440px] mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Overlays & Modals */}
      <AiCopilotDrawer />
      <VoiceModal />
      <Toast />
    </div>
  );
};
