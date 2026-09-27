import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import RefreshSimulationModal from './components/RefreshSimulationModal';
import NotificationDrawer from './components/NotificationDrawer';
import ApiAccessModal from './components/modals/ApiAccessModal';
import DataSourcesModal from './components/modals/DataSourcesModal';
import MethodologyModal from './components/modals/MethodologyModal';
import { initialAirfareObservations } from './data/mockData';
import { airfareApi } from './services/api';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadAlerts, setUnreadAlerts] = useState(2);

  // Modals & Drawers
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isDataSourcesOpen, setIsDataSourcesOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  // Refresh Simulation State
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);
  const [isRefreshModalOpen, setIsRefreshModalOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [currentStepMessage, setCurrentStepMessage] = useState('');
  const [isPipelineComplete, setIsPipelineComplete] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Today, 10:42 AM');

  // Observations Data
  const [observations, setObservations] = useState(initialAirfareObservations);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  // Scroll to section when tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'trends') {
      document.getElementById('trends-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'routes') {
      document.getElementById('routes-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'leadtime') {
      document.getElementById('routes-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'settings') {
      setIsMethodologyOpen(true);
    }
  };

  // Trigger Data Refresh Pipeline
  const handleRefreshData = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setRefreshSuccess(false);
    setIsPipelineComplete(false);
    setIsRefreshModalOpen(true);
    setCurrentStepIndex(1);
    setCurrentStepMessage('Connecting to data sources...');

    try {
      const result = await airfareApi.refreshPipeline((stepIdx, msg) => {
        setCurrentStepIndex(stepIdx);
        setCurrentStepMessage(msg);
      });

      setIsPipelineComplete(true);
      setIsRefreshing(false);
      setRefreshSuccess(true);
      setLastSyncTime(result.syncTime);

      // Trigger celebratory confetti for hackathon jury presentation
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#2563EB', '#06B6D4', '#10B981'],
        });
      } catch (e) {
        // Ignore if confetti not supported
      }

      // Show toast notification
      setToastMessage({
        title: 'Data Updated Successfully',
        description: '1,248 airfare observations successfully processed.',
      });

      // Reset success button label after 4 seconds
      setTimeout(() => {
        setRefreshSuccess(false);
      }, 4000);

      // Auto dismiss toast after 5 seconds
      setTimeout(() => {
        setToastMessage(null);
      }, 5000);
    } catch (err) {
      setIsRefreshing(false);
      setIsRefreshModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Fixed Left Navigation Sidebar (250px) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        lastSyncTime={lastSyncTime}
        onOpenDataSources={() => setIsDataSourcesOpen(true)}
        onOpenApiModal={() => setIsApiModalOpen(true)}
      />

      {/* Main Content Area (Offset by 250px on desktop) */}
      <div className="flex-1 lg:pl-[250px] flex flex-col justify-between transition-all duration-300">
        <div>
          {/* Top Horizontal Header (72px) */}
          <Header
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            onRefreshData={handleRefreshData}
            isRefreshing={isRefreshing}
            refreshSuccess={refreshSuccess}
            unreadAlertCount={unreadAlerts}
            onToggleNotifications={() => setIsNotificationOpen(true)}
            activeBreadcrumb={
              activeTab === 'trends'
                ? 'Airfare Trends'
                : activeTab === 'routes'
                ? 'Route Analysis'
                : activeTab === 'leadtime'
                ? 'Lead-Time Analysis'
                : 'Overview'
            }
          />

          {/* Main Dashboard Body with responsive padding */}
          <main className="p-3 sm:p-4 md:p-6 lg:p-8">
            <Dashboard
              observations={observations}
              onOpenDataSources={() => setIsDataSourcesOpen(true)}
              onOpenMethodology={() => setIsMethodologyOpen(true)}
            />
          </main>
        </div>

        {/* Global Footer */}
        <Footer
          onOpenMethodology={() => setIsMethodologyOpen(true)}
          onOpenApiModal={() => setIsApiModalOpen(true)}
          onOpenDataSources={() => setIsDataSourcesOpen(true)}
        />
      </div>

      {/* =========================================================================
          INTERACTIVE MODALS & DRAWERS
          ========================================================================= */}

      {/* 1. Refresh Data Pipeline Visualizer Modal */}
      <RefreshSimulationModal
        isOpen={isRefreshModalOpen}
        currentStepIndex={currentStepIndex}
        currentStepMessage={currentStepMessage}
        isComplete={isPipelineComplete}
        onClose={() => setIsRefreshModalOpen(false)}
      />

      {/* 2. Notification / Intelligence Alerts Flyout */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onClearAlerts={() => {
          setUnreadAlerts(0);
          setIsNotificationOpen(false);
        }}
      />

      {/* 3. API Explorer Modal */}
      <ApiAccessModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
      />

      {/* 4. Data Gateways Modal */}
      <DataSourcesModal
        isOpen={isDataSourcesOpen}
        onClose={() => setIsDataSourcesOpen(false)}
      />

      {/* 5. Methodology & Mathematical Formulation Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      {/* 6. Success Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-200 max-w-sm">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 text-[13px]">
            <div className="font-bold text-slate-100">{toastMessage.title}</div>
            <div className="text-slate-300 text-[12px]">{toastMessage.description}</div>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
