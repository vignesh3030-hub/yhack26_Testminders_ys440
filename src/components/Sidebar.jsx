import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useDisasterData } from "../context/DisasterDataContext";
import {
  ShieldAlert,
  Home,
  Globe,
  CloudRain,
  Cpu,
  AlertTriangle,
  FileText,
  Truck,
  User,
  WifiOff,
  Wifi,
  FileDown
} from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  const { isOffline, setIsOffline, setShowSitRepModal } = useDisasterData();

  const navItems = [
    { id: "dashboard", icon: Home, label: t("nav.dashboard") },
    { id: "gisMap", icon: Globe, label: t("nav.gisMap") },
    { id: "analytics", icon: CloudRain, label: t("nav.analytics") },
    { id: "aiPredictor", icon: Cpu, label: t("nav.aiPredictor") },
    { id: "earlyWarnings", icon: AlertTriangle, label: t("nav.earlyWarnings") },
    { id: "fieldReports", icon: FileText, label: t("nav.fieldReports") },
    { id: "emergencyResponse", icon: Truck, label: t("nav.emergencyResponse") }
  ];

  return (
    <aside className="w-16 md:w-20 bg-slate-950 border-r border-slate-800/80 flex flex-col items-center py-4 justify-between min-h-screen sticky top-0 z-40 shadow-2xl">
      {/* Top Logo */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-red-950/60 ring-2 ring-red-500/40 animate-pulse cursor-pointer">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-black tracking-widest text-red-400 mt-1">AIMS</span>
      </div>

      {/* Nav Icons list */}
      <nav className="flex flex-col items-center gap-3 my-auto w-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`group relative w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                isActive
                  ? "bg-gradient-to-br from-red-600 to-amber-600 text-white shadow-lg shadow-red-950/50 ring-1 ring-red-400/50"
                  : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800"
              }`}
            >
              <Icon className="w-5 h-5" />

              {/* Tooltip on Hover */}
              <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 border border-slate-700 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                {item.label}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile & Offline status */}
      <div className="flex flex-col items-center gap-3">
        {/* Export SitRep Trigger */}
        <button
          onClick={() => setShowSitRepModal(true)}
          title="Export SitRep PDF"
          className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-amber-400 flex items-center justify-center transition"
        >
          <FileDown className="w-4 h-4" />
        </button>

        {/* Offline status toggle */}
        <button
          onClick={() => setIsOffline(!isOffline)}
          title={isOffline ? "Mode: Offline" : "Mode: Online"}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition border ${
            isOffline
              ? "bg-amber-950 border-amber-600 text-amber-300 animate-pulse"
              : "bg-emerald-950 border-emerald-600 text-emerald-300"
          }`}
        >
          {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
        </button>

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs shadow-inner">
          <User className="w-4 h-4 text-slate-300" />
        </div>
      </div>
    </aside>
  );
};
