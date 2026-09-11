import React, { useState } from "react";
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
  FileDown,
  BookOpen,
  Lock,
  Unlock
} from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  const { isOffline, setIsOffline, setShowSitRepModal } = useDisasterData();
  const [isLocked, setIsLocked] = useState(true); // Locked expanded by default

  const navItems = [
    { id: "dashboard", icon: Home, label: t("nav.dashboard") },
    { id: "gisMap", icon: Globe, label: t("nav.gisMap") },
    { id: "analytics", icon: CloudRain, label: t("nav.analytics") },
    { id: "aiPredictor", icon: Cpu, label: t("nav.aiPredictor") },
    { id: "historicalCases", icon: BookOpen, label: t("nav.historicalCases") || "Historical Cases" },
    { id: "earlyWarnings", icon: AlertTriangle, label: t("nav.earlyWarnings") },
    { id: "fieldReports", icon: FileText, label: t("nav.fieldReports") },
    { id: "emergencyResponse", icon: Truck, label: t("nav.emergencyResponse") }
  ];

  return (
    <aside
      className={`sticky top-0 h-screen bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between py-4 px-3 z-50 shadow-2xl transition-all duration-300 flex-shrink-0 ${
        isLocked ? "w-64" : "w-16 md:w-20 items-center"
      }`}
    >
      {/* Top Header & Lock Toggle */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-2 px-1">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-red-950/60 ring-2 ring-red-500/40 animate-pulse cursor-pointer">
            <ShieldAlert className="w-5 h-5" />
          </div>
          {isLocked && (
            <div className="flex flex-col whitespace-nowrap animate-fadeIn">
              <span className="text-sm font-black tracking-wider text-white">AIMS COMMAND</span>
              <span className="text-[10px] text-red-400 font-bold tracking-widest uppercase">Disaster Monitor</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsLocked(!isLocked)}
          title={isLocked ? "Unlock Sidebar (Collapse)" : "Lock Sidebar (Expand)"}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition cursor-pointer"
        >
          {isLocked ? <Lock className="w-4 h-4 text-amber-400" /> : <Unlock className="w-4 h-4 text-slate-400" />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex flex-col gap-1.5 my-auto w-full overflow-y-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`group relative w-full rounded-xl flex items-center gap-3 px-3 py-2.5 transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-950/50 ring-1 ring-red-400/50 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800/60 font-medium"
              } ${!isLocked ? "justify-center" : ""}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />

              {isLocked ? (
                <span className="text-xs whitespace-nowrap tracking-wide">{item.label}</span>
              ) : (
                /* Tooltip on Hover in Compact Mode */
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 border border-slate-700 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Section */}
      <div className="flex flex-col gap-2 pt-3 border-t border-slate-800/80">
        {/* Export SitRep Trigger */}
        <button
          onClick={() => setShowSitRepModal(true)}
          title="Export SitRep PDF"
          className={`rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-amber-400 flex items-center gap-2 p-2.5 transition cursor-pointer ${
            !isLocked ? "justify-center" : ""
          }`}
        >
          <FileDown className="w-4 h-4 flex-shrink-0" />
          {isLocked && <span className="text-xs font-bold text-slate-200">Export SitRep PDF</span>}
        </button>

        {/* Offline status toggle */}
        <button
          onClick={() => setIsOffline(!isOffline)}
          title={isOffline ? "Mode: Offline" : "Mode: Online"}
          className={`rounded-xl flex items-center gap-2 p-2.5 transition border cursor-pointer ${
            isOffline
              ? "bg-amber-950/80 border-amber-600 text-amber-300"
              : "bg-slate-900 border-emerald-950 text-emerald-400"
          } ${!isLocked ? "justify-center" : ""}`}
        >
          {isOffline ? <WifiOff className="w-4 h-4 flex-shrink-0 animate-pulse text-amber-300" /> : <Wifi className="w-4 h-4 flex-shrink-0 text-emerald-400" />}
          {isLocked && (
            <span className="text-xs font-bold font-mono">
              {isOffline ? "Status: Offline" : "Status: Online"}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className={`flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800 ${!isLocked ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex-shrink-0 flex items-center justify-center text-slate-300 font-bold text-xs shadow-inner">
            <User className="w-4 h-4 text-slate-300" />
          </div>
          {isLocked && (
            <div className="flex flex-col whitespace-nowrap overflow-hidden">
              <span className="text-xs font-bold text-white">Disaster Admin</span>
              <span className="text-[10px] text-slate-400">NDRF Officer</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
