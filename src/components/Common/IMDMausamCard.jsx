import React, { useState, useEffect } from "react";
import { fetchImdMausamFeed, IMD_MONITORING_DISTRICTS } from "../../utils/imdMausamBackend";
import {
  CloudLightning,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Wind,
  Droplets,
  Gauge,
  Radio
} from "lucide-react";

export const IMDMausamCard = () => {
  const [selectedZone, setSelectedZone] = useState("East Sikkim / Gangtok Axis");
  const [imdData, setImdData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadFeed = async (zoneName) => {
    setIsLoading(true);
    try {
      const data = await fetchImdMausamFeed(zoneName);
      setImdData(data);
      setSelectedZone(zoneName);
    } catch (err) {
      console.warn("IMD Feed error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeed(selectedZone);
  }, []);

  if (!imdData) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3.5 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: imdData.warningColor }}
      />

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-600 to-red-600 text-white shadow-lg flex-shrink-0">
            <CloudLightning className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                INDIA METEOROLOGICAL DEPARTMENT (IMD) MAUSAM GATEWAY
              </h3>
              <span className="text-[10px] font-mono font-bold bg-amber-950 border border-amber-800 text-amber-300 px-2 py-0.5 rounded">
                OFFICIAL GOVT FEED
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Real-time district weather warnings & national severe monsoon bulletins
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadFeed(selectedZone)}
            disabled={isLoading}
            className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs px-3 py-1.5 rounded-xl transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-amber-400" : ""}`} />
            <span>{isLoading ? "Fetching..." : "Refresh IMD Feed"}</span>
          </button>

          <a
            href="https://mausam.imd.gov.in/index_en.php"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-xl transition shadow"
          >
            <span>mausam.imd.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* District Selector & Status Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">
            IMD Subdivision:
          </span>
          <select
            value={selectedZone}
            onChange={(e) => loadFeed(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-100 font-bold text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500 cursor-pointer flex-1"
          >
            {Object.keys(IMD_MONITORING_DISTRICTS).map((zoneKey) => (
              <option key={zoneKey} value={zoneKey} className="bg-slate-900 text-white">
                {zoneKey} ({IMD_MONITORING_DISTRICTS[zoneKey].district})
              </option>
            ))}
          </select>
        </div>

        <span
          className="font-bold text-[11px] px-2.5 py-1 rounded-lg border font-mono uppercase"
          style={{
            backgroundColor: `${imdData.warningColor}20`,
            borderColor: imdData.warningColor,
            color: imdData.warningColor
          }}
        >
          IMD {imdData.warningLevel} WARNING ACTIVE
        </span>
      </div>

      {/* Live IMD Bulletin Box */}
      <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-1.5">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-ping" />
            <span>IMD National Severe Weather Bulletin ({imdData.district}, {imdData.state})</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Station ID: {imdData.stationId} | Synced: {imdData.lastUpdated}
          </span>
        </div>

        <p className="text-xs text-slate-200 font-medium leading-relaxed">
          {imdData.imdBulletin}
        </p>

        {/* Telemetry Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">IMD 24h Rain</span>
            <span className="font-mono font-bold text-cyan-300">{imdData.precip24h} mm</span>
          </div>
          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">Relative Humidity</span>
            <span className="font-mono font-bold text-blue-300">{imdData.humidity}%</span>
          </div>
          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">Wind Speed</span>
            <span className="font-mono font-bold text-amber-300">{imdData.windSpeed} km/h</span>
          </div>
          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">Surface Pressure</span>
            <span className="font-mono font-bold text-emerald-300">{imdData.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
