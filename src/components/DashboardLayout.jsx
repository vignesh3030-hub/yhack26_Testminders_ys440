import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useDisasterData } from "../context/DisasterDataContext";
import { RiskTierCounterBar } from "./RiskTierCounterBar";
import { RiskMap } from "./GISMap/RiskMap";
import { DetailReportModal } from "./DetailReportModal";

import {
  Maximize2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  CloudRain,
  Sun,
  Flame,
  Activity,
  AlertTriangle,
  FileText,
  MapPin,
  Compass,
  Download
} from "lucide-react";

export const DashboardLayout = () => {
  const { t } = useLanguage();
  const { sensors, highways, villages } = useDisasterData();

  const [selectedReport, setSelectedReport] = useState(null);

  // Region Checkbox Filter State
  const [selectedStates, setSelectedStates] = useState({
    Sikkim: true,
    Meghalaya: true,
    Assam: true,
    Mizoram: true,
    Nagaland: true,
    Manipur: true,
    Arunachal: true
  });

  const toggleStateFilter = (stateName) => {
    setSelectedStates((prev) => ({ ...prev, [stateName]: !prev[stateName] }));
  };

  return (
    <div className="space-y-5">
      {/* 4-Tier Risk Counter Cards Bar */}
      <RiskTierCounterBar />

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Full Maps Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{t("gis.mapTitle")}</span>
                <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 font-bold px-2 py-0.5 rounded">
                  LIVE NER GIS
                </span>
              </div>
              <button
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                title="Fullscreen Map"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Main Interactive Leaflet Map */}
            <div className="h-[420px] rounded-xl overflow-hidden border border-slate-800">
              <RiskMap />
            </div>
          </div>

          {/* 2. Detail Province / Region Telemetry Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                Detail Region Telemetry (Sikkim / Meghalaya / Assam)
              </h3>

              <div className="flex items-center gap-2">
                {/* Search Box */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    placeholder="Search region..."
                    className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500 w-36"
                  />
                </div>

                {/* Filter Dropdown */}
                <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg text-xs">
                  <Filter className="w-3 h-3 text-amber-400" />
                  <select className="bg-transparent text-slate-300 text-xs focus:outline-none cursor-pointer">
                    <option className="bg-slate-900">Sort By Ward</option>
                    <option className="bg-slate-900">Sort By Precip</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-2 px-2">Kelurahan (Ward)</th>
                    <th className="py-2 px-2">Suhu (Precip)</th>
                    <th className="py-2 px-2">Kelembaban (VWC)</th>
                    <th className="py-2 px-2">Displacement</th>
                    <th className="py-2 px-2">Code</th>
                    <th className="py-2 px-2">Cuaca (Weather)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {sensors.slice(0, 5).map((s) => (
                    <tr key={s.id} className="hover:bg-slate-950/60 transition">
                      <td className="py-2.5 px-2 font-bold text-white">{s.nearestVillage}</td>
                      <td className="py-2.5 px-2 font-mono text-cyan-300">{s.rainfall24h} mm</td>
                      <td className="py-2.5 px-2 font-mono text-blue-300">{s.soilMoistureVWC}%</td>
                      <td className="py-2.5 px-2 font-mono text-amber-300">{s.inclinometerDisplacement} mm/d</td>
                      <td className="py-2.5 px-2 font-mono text-slate-400">{s.id.slice(-2)}</td>
                      <td className="py-2.5 px-2 flex items-center gap-1.5">
                        <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-slate-300">Heavy Rain</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-slate-400 text-[11px]">Showing 1 to 5 of 7 entries</span>
              <div className="flex items-center gap-1 font-mono">
                <button className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-slate-400 hover:text-white">
                  Previous
                </button>
                <button className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold rounded">1</button>
                <button className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-slate-400 hover:text-white">2</button>
                <button className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-slate-400 hover:text-white">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* 3. Maps by Region Widget */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                {t("gis.mapsByProvince")} (NER Checklist)
              </h3>
              <button className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-2.5 py-1 rounded-lg transition">
                <Download className="w-3.5 h-3.5" />
                <span>{t("gis.exportMap")}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Mini Map Thumbnail */}
              <div className="sm:col-span-6 h-36 rounded-xl overflow-hidden border border-slate-800 relative">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
                  alt="Region map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <span className="bg-slate-900/90 text-white font-bold text-xs px-3 py-1 rounded-full border border-slate-700">
                    NER Regional Layer
                  </span>
                </div>
              </div>

              {/* State Checkboxes List */}
              <div className="sm:col-span-6 space-y-2 text-xs">
                {Object.entries({
                  Sikkim: "37°C / 142mm",
                  Meghalaya: "34°C / 185mm",
                  Assam: "33°C / 96mm",
                  Mizoram: "29°C / 112mm"
                }).map(([stateName, val]) => (
                  <label
                    key={stateName}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer hover:border-amber-500/40 transition"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedStates[stateName]}
                        onChange={() => toggleStateFilter(stateName)}
                        className="accent-amber-400 rounded cursor-pointer"
                      />
                      <span className="font-semibold text-slate-200">{stateName}</span>
                    </div>
                    <span className="font-mono text-[11px] text-amber-300">{val}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* 1. Latest Hazard Reports Table ("Laporan Terbaru") */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                {t("tables.recentReports")}
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">SORT BY: Latest</span>
            </div>

            <div className="space-y-2.5">
              {sensors.map((sensor) => {
                const isCrit = sensor.riskLevel === "CRITICAL";

                return (
                  <div
                    key={sensor.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-amber-500/50 transition space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-xs">{sensor.name}</h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isCrit
                            ? "bg-red-950 border border-red-800 text-red-300"
                            : "bg-amber-950 border border-amber-800 text-amber-300"
                        }`}
                      >
                        {sensor.riskLevel}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      Rainfall {sensor.rainfall24h}mm/24h. Inclinometer displacement {sensor.inclinometerDisplacement}mm/d. Fs safety factor = {sensor.fs}.
                    </p>

                    <div className="flex justify-between items-center pt-1 text-[11px]">
                      <span className="text-slate-500 font-mono">{sensor.state}</span>
                      <button
                        onClick={() => setSelectedReport(sensor)}
                        className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                      >
                        {t("tables.viewDetail")} &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
              <button className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-400">Previous</button>
              <span className="text-slate-400 text-[11px]">Page 1 of 3</span>
              <button className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-400">Next</button>
            </div>
          </div>

          {/* 2. Multi-Hazard Emergency Grid ("Monitoring bencana") */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider border-b border-slate-800 pb-2">
              Multi-Hazard Emergency Grid
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Hazard 1: Landslide Failure */}
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 space-y-1">
                <span className="text-[10px] font-bold text-red-400 block uppercase">TANAH LONGSOR</span>
                <h5 className="font-black text-sm text-white">Gangtok NH-10</h5>
                <span className="text-[10px] bg-red-900 text-white font-bold px-1.5 py-0.5 rounded">Fs 0.94 Critical</span>
              </div>

              {/* Hazard 2: Cloudburst Storm */}
              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-200 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 block uppercase">HUJAN LEBAT</span>
                <h5 className="font-black text-sm text-white">Sohra Ridge</h5>
                <span className="text-[10px] bg-amber-900 text-amber-200 font-bold px-1.5 py-0.5 rounded">185mm / 24h</span>
              </div>

              {/* Hazard 3: Railway Embankment Creep */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">SUBSIDENCE</span>
                <h5 className="font-black text-sm text-white">Tupul Manipur</h5>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">High Creep</span>
              </div>

              {/* Hazard 4: Deforestation Cut */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">SLOPE CUT</span>
                <h5 className="font-black text-sm text-white">Laipuitlang Aizawl</h5>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">+12° Cut</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup ("Detail Laporan") */}
      {selectedReport && (
        <DetailReportModal
          item={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};
