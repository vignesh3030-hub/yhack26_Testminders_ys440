import React, { useState, useEffect } from "react";
import { useLanguage, languageNames } from "../context/LanguageContext";
import { useDisasterData } from "../context/DisasterDataContext";
import { alertSound } from "../utils/alertSound";
import { fetchLiveIndianWeather } from "../utils/weatherApi";
import { BroadcastModal } from "./Alerts/BroadcastModal";
import {
  MapPin,
  Calendar,
  CloudRain,
  Globe,
  Volume2,
  VolumeX,
  Bell,
  Triangle,
  X,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Wind,
  Droplets,
  Thermometer,
  RefreshCw,
  Zap,
  ExternalLink
} from "lucide-react";

export const HeaderBar = () => {
  const { lang, setLang, t } = useLanguage();
  const { sensors, unitsDeployed } = useDisasterData();
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Dynamic Location State
  const [currentLocation, setCurrentLocation] = useState("East Sikkim / Gangtok Axis");

  // Live AccuWeather & Open-Meteo Weather State
  const [weatherData, setWeatherData] = useState({
    temp: 24,
    humidity: 88,
    precip24h: 142.5,
    windSpeed: 18,
    condition: "AccuWeather Live: Heavy Rain",
    source: "AccuWeather & Open-Meteo Live India Feed",
    lastUpdated: "Just now",
    forecastDates: []
  });
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  
  // Modals state
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [sirenNotification, setSirenNotification] = useState(false);

  // Fetch live weather data whenever location changes
  useEffect(() => {
    let isMounted = true;
    const loadWeather = async () => {
      setIsLoadingWeather(true);
      const data = await fetchLiveIndianWeather(currentLocation);
      if (isMounted) {
        setWeatherData(data);
        setIsLoadingWeather(false);
      }
    };
    loadWeather();
    return () => { isMounted = false; };
  }, [currentLocation]);

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
    setSirenNotification(true);
    setTimeout(() => setSirenNotification(false), 3000);
  };

  const locationsList = [
    { label: "East Sikkim / Gangtok Axis (NH-10)", state: "Sikkim", risk: "CRITICAL" },
    { label: "The Nilgiris / Coonoor Marappalam (NH-181)", state: "Tamil Nadu", risk: "CRITICAL" },
    { label: "East Khasi Hills / Sohra Ridge (NH-206)", state: "Meghalaya", risk: "CRITICAL" },
    { label: "Dima Hasao / Haflong Corridor (NH-27)", state: "Assam", risk: "HIGH" },
    { label: "Aizawl / Laipuitlang Slopes (NH-54)", state: "Mizoram", risk: "HIGH" },
    { label: "Noney / Tupul Axis (NH-37)", state: "Manipur", risk: "CRITICAL" },
    { label: "Tiruvannamalai / Annamalayar Foothills", state: "Tamil Nadu", risk: "CRITICAL" }
  ];

  return (
    <>
      {/* Test Siren Notification Toast */}
      {sirenNotification && (
        <div className="fixed top-4 right-4 z-[10000] bg-red-950 border border-red-700 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Bell className="w-5 h-5 text-red-400 animate-spin" />
          <div>
            <h4 className="font-bold text-xs">Emergency Siren Triggered!</h4>
            <p className="text-[11px] text-red-200">2.5s Synthesized Warning Audio Playing...</p>
          </div>
        </div>
      )}

      <header className="bg-slate-900/90 border-b border-slate-800/80 px-5 py-3 text-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-30 backdrop-blur-md shadow-lg">
        {/* Left Info Cluster */}
        <div className="flex flex-wrap items-center gap-6 text-xs w-full md:w-auto justify-between md:justify-start">
          {/* Your Location */}
          <div
            onClick={() => setShowLocationModal(true)}
            className="cursor-pointer group p-1 rounded-lg hover:bg-slate-800/60 transition"
            title="Click to change location"
          >
            <span className="text-[11px] text-slate-400 block flex items-center gap-1 font-medium">
              {t("header.yourLocation")}:{" "}
              <span className="text-cyan-400 group-hover:underline font-bold text-[10px]">&bull; Edit</span>
            </span>
            <h3 className="font-bold text-white text-xs mt-0.5 flex items-center gap-1 group-hover:text-amber-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition" />
              <span>{currentLocation}</span>
            </h3>
          </div>

          {/* System Status Badge */}
          <div
            onClick={() => setShowStatusModal(true)}
            className="cursor-pointer group p-1 rounded-lg hover:bg-slate-800/60 transition"
            title="Click for System Status Overview"
          >
            <span className="text-[11px] text-slate-400 block font-medium">
              {t("header.statusLabel")}:
            </span>
            <div className="mt-0.5 flex items-center gap-2">
              {criticalCount > 0 ? (
                <span className="bg-red-950 border border-red-800 text-red-300 px-3 py-1 rounded-full font-bold text-xs shadow-inner animate-pulse flex items-center gap-1 group-hover:border-red-500">
                  <Triangle className="w-3 h-3 fill-red-400" />
                  Level IV (Critical)
                </span>
              ) : highCount > 0 ? (
                <span className="bg-amber-950 border border-amber-800 text-amber-300 px-3 py-1 rounded-full font-bold text-xs shadow-inner flex items-center gap-1 group-hover:border-amber-500">
                  <Triangle className="w-3 h-3 fill-amber-400" />
                  Level III (Siaga)
                </span>
              ) : (
                <span className="bg-emerald-950 border border-emerald-800 text-emerald-300 px-3 py-1 rounded-full font-bold text-xs shadow-inner flex items-center gap-1 group-hover:border-emerald-500">
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
          <div
            onClick={() => setShowWeatherModal(true)}
            className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 cursor-pointer hover:border-cyan-500/60 hover:bg-slate-900 transition group"
            title="Click for AccuWeather & Live Precip Telemetry"
          >
            <CloudRain className={`w-5 h-5 text-cyan-400 group-hover:scale-110 transition ${isLoadingWeather ? "animate-spin" : ""}`} />
            <div>
              <span className="font-bold text-white text-xs block leading-tight group-hover:text-cyan-300">
                {weatherData.temp}°C {weatherData.condition?.split(" ")[0] || "Heavy Rain"}
              </span>
              <span className="text-[9px] text-slate-400">Precip {weatherData.precip24h}mm &bull; Hum {weatherData.humidity}%</span>
            </div>
          </div>
        </div>

        {/* Right User & Control Cluster */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Test Siren Button */}
          <button
            onClick={handleTestSiren}
            title="Play Test Emergency Siren Sound"
            className="flex items-center gap-1 bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 font-bold text-xs px-2.5 py-1.5 rounded-xl transition shadow active:scale-95 cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 text-red-400 animate-bounce" />
            <span className="hidden sm:inline">Test Siren</span>
          </button>

          {/* Audio Mute/Unmute Toggle */}
          <button
            onClick={handleToggleSound}
            title={isAudioMuted ? "Unmute Alert Audio" : "Mute Alert Audio"}
            className={`p-2 rounded-xl border transition cursor-pointer active:scale-95 ${
              isAudioMuted
                ? "bg-slate-950 border-slate-800 text-slate-500"
                : "bg-amber-950 border-amber-800 text-amber-300 shadow-md shadow-amber-950/50"
            }`}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          </button>

          {/* Official IMD Mausam Gateway Link */}
          <a
            href="https://mausam.imd.gov.in/index_en.php"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-800/80 text-amber-300 font-bold text-xs px-2.5 py-1.5 rounded-xl transition shadow cursor-pointer"
            title="IMD Mausam National Disaster Weather Gateway (mausam.imd.gov.in)"
          >
            <span>IMD Mausam</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>

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
          <div
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2.5 bg-slate-950 border border-slate-800 hover:border-amber-500/60 px-3 py-1.5 rounded-xl cursor-pointer transition group"
            title="Click for Command Admin Profile & Privileges"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-slate-950 font-bold text-xs shadow-md group-hover:scale-105 transition">
              V
            </div>
            <div className="text-left hidden sm:block">
              <span className="font-bold text-white text-xs block leading-tight group-hover:text-amber-300">Vicky</span>
              <span className="text-[9px] text-amber-400 font-mono block uppercase tracking-wider">COMMAND ADMIN</span>
            </div>
          </div>
        </div>
      </header>

      {/* 1. LOCATION EDIT MODAL */}
      {showLocationModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-5 space-y-4 shadow-2xl text-slate-100 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Select Command Monitor Location</h3>
              </div>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Select your active monitoring location corridor for high-frequency IoT telemetry updates:
            </p>

            <div className="space-y-2 text-xs">
              {locationsList.map((loc, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentLocation(loc.label);
                    setShowLocationModal(false);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    currentLocation === loc.label
                      ? "bg-amber-950/60 border-amber-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <span className="font-bold block">{loc.label}</span>
                    <span className="text-[10px] text-slate-400">{loc.state}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    loc.risk === "CRITICAL" ? "bg-red-950 border border-red-800 text-red-300" : "bg-amber-950 border border-amber-800 text-amber-300"
                  }`}>
                    {loc.risk}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowLocationModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. SYSTEM STATUS OVERVIEW MODAL */}
      {showStatusModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-5 space-y-4 shadow-2xl text-slate-100 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                <h3 className="font-bold text-white text-base">System Status: Level IV (Critical)</h3>
              </div>
              <button
                onClick={() => setShowStatusModal(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-red-950/50 border border-red-800 rounded-xl space-y-2 text-xs">
              <h4 className="font-bold text-red-300 text-sm">Active Threat Assessment: CRITICAL ALARM</h4>
              <p className="text-slate-300">
                Multiple IoT slope sensor stations have exceeded the Factor of Safety failure threshold (Fs &lt; 1.0) across Sikkim, Meghalaya, and Tamil Nadu corridors.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 block">Critical Sensors:</span>
                  <span className="text-red-400 font-bold">{criticalCount} Nodes Active</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 block">Deployed NDRF Units:</span>
                  <span className="text-cyan-400 font-bold">{unitsDeployed} Teams Active</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setShowBroadcastModal(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold rounded-xl shadow"
              >
                <Radio className="w-4 h-4 animate-spin" />
                <span>Launch Emergency Broadcast</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. LIVE ACCUWEATHER & PRECIP MODAL */}
      {showWeatherModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-5 space-y-4 shadow-2xl text-slate-100 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-white text-base">AccuWeather Live India Telemetry</h3>
                  <span className="text-[10px] text-cyan-400 font-mono font-bold">SOURCE: {weatherData.source} (Updated: {weatherData.lastUpdated})</span>
                </div>
              </div>
              <button
                onClick={() => setShowWeatherModal(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-cyan-950/40 border border-cyan-800/80 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase block">{weatherData.location}</span>
                <span className="text-2xl font-black text-white">{weatherData.temp}°C</span>
                <span className="text-xs text-cyan-300 font-bold block">{weatherData.condition}</span>
              </div>
              <div className="text-right font-mono text-xs space-y-1">
                <div className="text-slate-300">24h Precip: <strong className="text-cyan-300">{weatherData.precip24h} mm</strong></div>
                <div className="text-slate-300">Humidity: <strong className="text-blue-300">{weatherData.humidity}%</strong></div>
                <div className="text-slate-300">Wind: <strong className="text-emerald-300">{weatherData.windSpeed} km/h</strong></div>
              </div>
            </div>

            {/* 5-Day Live Weather Forecast Dates */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>AccuWeather 5-Day Indian Region Forecast & Dates:</span>
              </h4>

              <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                {weatherData.forecastDates.map((fc, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 block">{fc.date}</span>
                    <span className="font-mono font-bold text-white block text-xs">{fc.maxTemp}°C</span>
                    <span className="text-[9px] font-mono text-cyan-300 block">{fc.precip}mm</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowWeatherModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. USER PROFILE & ADMIN SETTINGS MODAL */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-5 space-y-4 shadow-2xl text-slate-100 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Command Admin Profile</h3>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg">
                V
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Vicky</h4>
                <p className="text-xs text-amber-400 font-mono font-semibold uppercase">Disaster Command Center Administrator</p>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Full Dissemination & Dispatch Privileges Active
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">Emergency SMS Target Mobile:</span>
                <span className="font-mono text-emerald-400 font-bold text-sm bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800 inline-block">+91 8667653030</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">Assigned Headquarters:</span>
                <span className="font-bold text-white">NER Disaster Command Operations & Control Center</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Modal Popup */}
      {showBroadcastModal && (
        <BroadcastModal onClose={() => setShowBroadcastModal(false)} />
      )}
    </>
  );
};
