import React from "react";
import { useLanguage, languageNames } from "../context/LanguageContext";
import { useDisasterData } from "../context/DisasterDataContext";
import {
  ShieldAlert,
  Globe,
  Wifi,
  WifiOff,
  RefreshCw,
  FileText,
  AlertTriangle,
  Activity,
  Layers
} from "lucide-react";

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const {
    isOffline,
    setIsOffline,
    pendingOfflineCount,
    syncOfflineData,
    sensors,
    unitsDeployed,
    setShowSitRepModal
  } = useDisasterData();

  const criticalCount = sensors.filter((s) => s.riskLevel === "CRITICAL").length;

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 py-3 text-white shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Title & Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-red-600 to-amber-600 p-2.5 rounded-xl shadow-lg shadow-red-950/50 flex items-center justify-center animate-pulse">
            <ShieldAlert className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-amber-300 to-emerald-400">
              {t("appTitle")}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              {t("subTitle")}
            </p>
          </div>
        </div>

        {/* Status Pills & Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Critical Risk Pill */}
          <div className="flex items-center gap-1.5 bg-red-950/70 border border-red-800 text-red-300 px-3 py-1.5 rounded-full font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-bounce" />
            <span>{criticalCount} {t("status.criticalCount")}</span>
          </div>

          {/* Emergency Units Pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-blue-950/70 border border-blue-800 text-blue-300 px-3 py-1.5 rounded-full">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>{unitsDeployed} NDRF Units</span>
          </div>

          {/* Offline/Online Toggle Simulator */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            title="Click to toggle simulated Offline mode for PWA testing"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
              isOffline
                ? "bg-amber-950/80 border-amber-600 text-amber-300 shadow-lg shadow-amber-950/50"
                : "bg-emerald-950/80 border-emerald-600 text-emerald-300"
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="font-bold">{t("status.offline")}</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold">{t("status.live")}</span>
              </>
            )}
          </button>

          {/* Pending Sync Button if offline reports exist */}
          {pendingOfflineCount > 0 && (
            <button
              onClick={syncOfflineData}
              className="flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-full animate-bounce transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{pendingOfflineCount} {t("status.pendingSync")}</span>
            </button>
          )}

          {/* SitRep PDF/Print Modal Button */}
          <button
            onClick={() => setShowSitRepModal(true)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg transition font-medium"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{t("nav.situationReport")}</span>
          </button>

          {/* Multilingual Selector */}
          <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 px-2 py-1 rounded-lg">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs font-semibold cursor-pointer"
            >
              {Object.entries(languageNames).map(([code, name]) => (
                <option key={code} value={code} className="bg-slate-900 text-slate-200">
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
