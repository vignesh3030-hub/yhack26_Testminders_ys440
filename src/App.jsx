import React, { useState } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { DisasterDataProvider, useDisasterData } from "./context/DisasterDataContext";
import { Sidebar } from "./components/Sidebar";
import { HeaderBar } from "./components/HeaderBar";
import { DashboardLayout } from "./components/DashboardLayout";
import { FullMapsView } from "./components/FullMapsView";
import { SensorTelemetry } from "./components/Dashboard/SensorTelemetry";
import { AnalyticsCharts } from "./components/Dashboard/AnalyticsCharts";
import { WhatIfSimulator } from "./components/AIModel/WhatIfSimulator";
import { EarlyWarningCenter } from "./components/Alerts/EarlyWarningCenter";
import { ReportFeed } from "./components/FieldReports/ReportFeed";
import { EmergencyResponse } from "./components/Response/EmergencyResponse";
import { ShelterTracker } from "./components/Response/ShelterTracker";
import { SituationReportModal } from "./components/Common/SituationReportModal";
import { HistoricalCasesView } from "./components/Dashboard/HistoricalCasesView";

function MainContent() {
  const { showSitRepModal, setShowSitRepModal } = useDisasterData();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex selection:bg-red-500 selection:text-white">
      {/* Left Vertical Icon Rail Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Right Main Body Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <HeaderBar />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
          {activeTab === "dashboard" && (
            <DashboardLayout />
          )}

          {activeTab === "gisMap" && (
            <FullMapsView />
          )}

          {activeTab === "historicalCases" && (
            <HistoricalCasesView onSelectSimulate={() => setActiveTab("aiPredictor")} />
          )}

          {activeTab === "aiPredictor" && (
            <div className="space-y-6">
              <WhatIfSimulator />
              <AnalyticsCharts />
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <SensorTelemetry />
              <AnalyticsCharts />
            </div>
          )}

          {activeTab === "earlyWarnings" && (
            <div className="space-y-6">
              <EarlyWarningCenter />
            </div>
          )}

          {activeTab === "fieldReports" && (
            <div className="space-y-6">
              <ReportFeed />
            </div>
          )}

          {activeTab === "emergencyResponse" && (
            <div className="space-y-6">
              <EmergencyResponse />
              <ShelterTracker />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-900/60 py-3.5 px-6 text-center text-xs text-slate-400 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>AIMS - AI-Powered Landslide Early Warning System &bull; North Eastern Region India</span>
            <span className="text-slate-400 font-mono">
              Integrates Rainfall, Soil Saturation, Slope Mechanics & InSAR Geodesy
            </span>
          </div>
        </footer>
      </div>

      {/* Printable Disaster Situation Report Modal */}
      {showSitRepModal && (
        <SituationReportModal onClose={() => setShowSitRepModal(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <DisasterDataProvider>
        <MainContent />
      </DisasterDataProvider>
    </LanguageProvider>
  );
}
