import React, { useState } from "react";
import { useLanguage, languageNames } from "../context/LanguageContext";
import { useDisasterData } from "../context/DisasterDataContext";
import { alertSound } from "../utils/alertSound";
import {
  MapPin,
  Calendar,
  CloudRain,
  Globe,
  Volume2,
  VolumeX,
  Bell,
  Triangle
} from "lucide-react";

export const HeaderBar = () => {
  const { lang, setLang, t } = useLanguage();
  const { sensors } = useDisasterData();
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const criticalCount = sensors.filter((s) => s.riskLevel === "CRITICAL").length;
  const highCount = sensors.filter((s) => s.riskLevel === "HIGH").length;

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const handleToggleSound = () => {
    const muted = alertSound.toggleMute();
    setIsAudioMuted(muted);
  };

  const handleTestSiren = () => {
    alertSound.playEmergencySiren(2.5);
  };

  return (
    <header className="bg-slate-900/90 border-b border-slate-800/80 px-5 py-3 text-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-30 backdrop-blur-md shadow-lg">
      {/* Left Info Cluster */}
      <div className="flex flex-wrap items-center gap-6 text-xs w-full md:w-auto justify-between md:justify-start">
        {/* Your Location */}
        <div>
          <span className="text-[11px] text-slate-400 block flex items-center gap-1 font-medium">
            {t("header.yourLocation")}: <span className="text-cyan-400 cursor-pointer hover:underline font-bold text-[10px]">&bull; Edit</span>
          </span>
          <h3 className="font-bold text-white text-xs mt-0.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{t("header.currentLocation")}</span>
          </h3>
        </div>

        {/* System Status Badge */}
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">
            {t("header.statusLabel")}:
          </span>
          <div className="mt-0.5 flex items-center gap-2">
            {criticalCount > 0 ? (
              <span className="bg-red-950 border border-red-800 text-red-300 px-3 py-1 rounded-full font-bold text-xs shadow-inner animate-pulse flex items-center gap-1">
                <Triangle className="w-3 h-3 fill-red-400" />
                Level IV (Critical)
              </span>
            ) : highCount > 0 ? (
              <span className="bg-amber-950 border border-amber-800 text-amber-300 px-3 py-1 rounded-full font-bold text-xs shadow-inner flex items-center gap-1">
                <Triangle className="w-3 h-3 fill-amber-400" />
                Level III (Siaga)
              </span>
            ) : (
              <span className="bg-emerald-950 border border-emerald-800 text-emerald-300 px-3 py-1 rounded-full font-bold text-xs shadow-inner flex items-center gap-1">
                <Triangle className="w-3 h-3 fill-emerald-400" />
                Level I (Normal)
              </span>
            )}
          </div>
        </div>

        {/* Date Display */}
        <div className="hidden sm:block">
          <span className="text-[11px] text-slate-400 block font-medium">
            {t("header.dateLabel")}:
          </span>
          <span className="font-bold text-slate-200 mt-0.5 block flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {currentDate}
          </span>
        </div>

        {/* Weather & Precip Widget */}
        <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
          <CloudRain className="w-5 h-5 text-cyan-400" />
          <div>
            <span className="font-bold text-white text-xs block leading-tight">28°C Heavy Rain</span>
            <span className="text-[9px] text-slate-400">Precip 142.5mm &bull; Hum 88%</span>
          </div>
        </div>
      </div>

      {/* Right User & Control Cluster */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        {/* Test Siren Button */}
        <button
          onClick={handleTestSiren}
          title="Play Test Emergency Siren Sound"
          className="flex items-center gap-1 bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 font-bold text-xs px-2.5 py-1.5 rounded-xl transition shadow"
        >
          <Bell className="w-3.5 h-3.5 text-red-400 animate-bounce" />
          <span className="hidden sm:inline">Test Siren</span>
        </button>

        {/* Audio Mute/Unmute Toggle */}
        <button
          onClick={handleToggleSound}
          title={isAudioMuted ? "Unmute Alert Audio" : "Mute Alert Audio"}
          className={`p-2 rounded-xl border transition ${
            isAudioMuted
              ? "bg-slate-950 border-slate-800 text-slate-500"
              : "bg-amber-950 border-amber-800 text-amber-300 shadow-md shadow-amber-950/50"
          }`}
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
        </button>

        {/* Language Selector Dropdown */}
        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1.5 rounded-xl text-xs">
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-slate-200 font-semibold focus:outline-none text-xs cursor-pointer"
          >
            {Object.entries(languageNames).map(([code, name]) => (
              <option key={code} value={code} className="bg-slate-900 text-slate-200">
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-slate-950 font-bold text-xs shadow-md">
            JD
          </div>
          <div className="text-left hidden sm:block">
            <span className="font-bold text-white text-xs block leading-tight">John Doe</span>
            <span className="text-[9px] text-amber-400 font-mono block uppercase tracking-wider">COMMAND ADMIN</span>
          </div>
        </div>
      </div>
    </header>
  );
};
