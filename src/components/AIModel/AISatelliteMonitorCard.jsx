import React from "react";
import { useDisasterData } from "../../context/DisasterDataContext";
import { SATELLITE_MONITORING_ZONES } from "../../utils/satelliteWeatherAi";
import {
  Globe,
  Radio,
  CloudRain,
  AlertTriangle,
  Zap,
  Clock,
  Compass,
  RefreshCw,
  ExternalLink,
  ShieldAlert
} from "lucide-react";

export const AISatelliteMonitorCard = () => {
  const {
    selectedSatelliteZone,
    satelliteAiData,
    isSatelliteLoading,
    refreshSatelliteAi
  } = useDisasterData();

  if (!satelliteAiData) return null;

  const { analytics, telemetry, advisories, city, state, coordinates, zoomEarthUrl } = satelliteAiData;
  const isCritical = analytics.riskLevel === "CRITICAL";
  const isHigh = analytics.riskLevel === "HIGH";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-4 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div
        className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: analytics.color }}
      />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800/80 text-cyan-400 shadow-lg relative">
            <Globe className="w-5 h-5 animate-pulse" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                AI SATELLITE WEATHER RISK ANALYZER
              </h3>
              <span className="text-[10px] font-mono font-bold bg-cyan-950 border border-cyan-800 text-cyan-300 px-2 py-0.5 rounded">
                ZOOM.EARTH AI BACKEND
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live orbital satellite radar, cloudburst convection, & AI landslide reach predictions
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => refreshSatelliteAi(selectedSatelliteZone)}
            disabled={isSatelliteLoading}
            className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-300 font-semibold text-xs px-3 py-1.5 rounded-xl transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSatelliteLoading ? "animate-spin text-cyan-400" : ""}`} />
            <span>{isSatelliteLoading ? "Analyzing..." : "Refresh AI Feed"}</span>
          </button>

          <a
            href={zoomEarthUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 font-semibold text-xs px-2.5 py-1.5 rounded-xl transition"
            title="Inspect Live Imagery on Zoom.earth"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Zoom.earth</span>
          </a>
        </div>
      </div>

      {/* Corridor Zone Selector */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider px-1">
          Target Corridor:
        </span>
        <select
          value={selectedSatelliteZone}
          onChange={(e) => refreshSatelliteAi(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-xs font-bold text-slate-100 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer flex-1"
        >
          {Object.keys(SATELLITE_MONITORING_ZONES).map((zoneKey) => (
            <option key={zoneKey} value={zoneKey} className="bg-slate-900 text-white">
              {zoneKey}
            </option>
          ))}
        </select>
        <span className="text-[11px] font-mono text-cyan-400 font-semibold px-2">
          {coordinates}
        </span>
      </div>

      {/* Main KPI Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* KPI 1: AI Satellite Hazard Level */}
        <div
          className="p-3.5 rounded-xl border space-y-1.5 bg-slate-950/80 transition shadow-inner"
          style={{ borderColor: `${analytics.color}50` }}
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase font-bold">
            <span>AI Satellite Hazard</span>
            <ShieldAlert className="w-4 h-4" style={{ color: analytics.color }} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white" style={{ color: analytics.color }}>
              {analytics.riskLevel}
            </span>
            <span className="text-xs font-mono font-bold text-slate-300">
              {analytics.hazardIndex}% Risk
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${analytics.hazardIndex}%`, backgroundColor: analytics.color }}
            />
          </div>
        </div>

        {/* KPI 2: AI Predicted Impact Reach Time */}
        <div className="p-3.5 rounded-xl border border-red-900/60 bg-red-950/30 space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-red-400 uppercase font-bold">
            <span>Landslide Reach ETA</span>
            <Clock className="w-4 h-4 text-red-400 animate-pulse" />
          </div>
          <div className="text-sm font-black text-white font-mono truncate">
            {analytics.reachTimeString}
          </div>
          <span className="text-[10px] text-red-300 block font-semibold">
            {isCritical ? "Imminent Debris Reach Risk" : isHigh ? "High Impact Window" : "No Immediate Reach Hazard"}
          </span>
        </div>

        {/* KPI 3: Cloudburst Convection Risk */}
        <div className="p-3.5 rounded-xl border border-cyan-900/60 bg-cyan-950/30 space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-cyan-400 uppercase font-bold">
            <span>Cloudburst Risk</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-cyan-200">
              {analytics.cloudburstProbability}%
            </span>
            <span className="text-[11px] text-cyan-400 font-mono font-semibold">Convective</span>
          </div>
          <span className="text-[10px] text-slate-400 block truncate">
            Cloud Temp: {telemetry.cloudTopTempC}°C (Extreme)
          </span>
        </div>

        {/* KPI 4: Satellite Rain Rate */}
        <div className="p-3.5 rounded-xl border border-amber-900/60 bg-amber-950/30 space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-amber-400 uppercase font-bold">
            <span>Satellite Rain Rate</span>
            <CloudRain className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-amber-200">
              {telemetry.satelliteRainRateMmh}
            </span>
            <span className="text-xs text-amber-400 font-bold font-mono">mm/hr</span>
          </div>
          <span className="text-[10px] text-slate-400 block">
            Cloud Cover Opacity: {telemetry.cloudCoverPct}%
          </span>
        </div>
      </div>

      {/* AI Diagnostics & Advisories Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
              AI Satellite Weather Advisory Diagnostics ({city}, {state})
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Updated: {analytics.lastAnalyzed}
          </span>
        </div>

        <ul className="space-y-1.5 text-xs text-slate-300">
          {advisories.map((adv, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold mt-0.5">•</span>
              <span>{adv}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
