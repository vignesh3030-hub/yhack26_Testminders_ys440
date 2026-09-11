import React, { useState } from "react";
import { useDisasterData } from "../../context/DisasterDataContext";
import {
  tnVulnerableZones
} from "../../data/nerLandslideData";
import {
  BookOpen,
  Search,
  Filter,
  AlertTriangle,
  MapPin,
  Calendar,
  CloudRain,
  Activity,
  Users,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Database,
  Layers,
  Flame,
  Info,
  Building,
  CheckCircle2,
  Cpu
} from "lucide-react";

export const HistoricalCasesView = ({ onSelectSimulate }) => {
  const { historicalRecords, updateSimulator } = useDisasterData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStateFilter, setSelectedStateFilter] = useState("ALL");
  const [selectedIncidentModal, setSelectedIncidentModal] = useState(null);
  const [activeTab, setActiveTab] = useState("incidents"); // "incidents" | "tnZones"

  // Filter historical records
  const filteredRecords = historicalRecords.filter((record) => {
    const matchesSearch =
      record.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.cause.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesState =
      selectedStateFilter === "ALL" ||
      (selectedStateFilter === "TN" && record.state === "Tamil Nadu") ||
      (selectedStateFilter === "AS" && record.state.includes("Assam")) ||
      (selectedStateFilter === "BH" && record.state.includes("Bihar")) ||
      (selectedStateFilter === "KL" && record.state.includes("Kerala")) ||
      (selectedStateFilter === "TS" && record.state.includes("Telangana"));

    return matchesSearch && matchesState;
  });

  // Trigger loading case parameters into AI Simulator
  const handleSimulateCase = (record) => {
    const rainfallVal = parseFloat(record.rainfall24h) || 220;
    const fsVal = parseFloat(record.factorOfSafety) || 0.85;

    // Estimate parameters based on record
    updateSimulator({
      rainfall24h: Math.min(350, Math.max(80, rainfallVal)),
      soilMoistureVWC: Math.min(98, Math.max(70, Math.round((1 - fsVal) * 100 + 40))),
      slopeAngle: record.state === "Tamil Nadu" ? 44 : 38,
      slopeCutAngle: 12,
      deforestationPct: 30
    });

    if (onSelectSimulate) {
      onSelectSimulate();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header Stats */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-red-950/60 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
                <Database className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Historical Disaster Case Intelligence
              </h1>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold px-2.5 py-0.5 rounded-full">
                Real Case Studies
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-3xl">
              Repository of major Tamil Nadu landslide catastrophes (1978–2024) and 2020 ECHO/OCHA Southwest Monsoon disaster bulletins across India. Filter, analyze, and test parameters against the AI Physics simulator.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("incidents")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "incidents"
                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-950/50"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Landmark Incidents ({historicalRecords.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("tnZones")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "tnZones"
                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-950/50"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>TN Vulnerable Zones (4)</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Documented Cases
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-white font-mono">{historicalRecords.length}</span>
              <span className="text-[10px] text-amber-400">Events</span>
            </div>
            <span className="text-[10px] text-slate-500">1978 – 2024 Timeline</span>
          </div>

          <div className="p-3 rounded-xl bg-red-950/40 border border-red-900/40">
            <span className="text-[10px] text-red-300 font-bold uppercase tracking-wider block">
              Total Fatalities Logged
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-red-400 font-mono">3,480+</span>
              <span className="text-[10px] text-red-300">Lives Lost</span>
            </div>
            <span className="text-[10px] text-red-400/80">Across 12 States</span>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-900/40">
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
              Displaced Population
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-amber-400 font-mono">1.85M+</span>
              <span className="text-[10px] text-amber-300">Evacuees</span>
            </div>
            <span className="text-[10px] text-amber-400/80">In Relief Camps</span>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-900/40">
            <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider block">
              Max 24h Rainfall Peak
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-cyan-300 font-mono">323.0 mm</span>
              <span className="text-[10px] text-cyan-400">Nilgiris Peak</span>
            </div>
            <span className="text-[10px] text-cyan-400/80">Triggering 1,150 slides</span>
          </div>
        </div>
      </div>

      {/* VIEW 1: LANDMARK INCIDENTS LIST & FILTER */}
      {activeTab === "incidents" && (
        <div className="space-y-5">
          {/* Search & Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
            {/* Search input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by location, year, or cause..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/80 transition"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
              <span className="text-xs text-slate-400 font-bold mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                State:
              </span>
              {[
                { id: "ALL", label: "All Regions" },
                { id: "TN", label: "Tamil Nadu (5)" },
                { id: "AS", label: "Assam" },
                { id: "BH", label: "Bihar" },
                { id: "KL", label: "Kerala (Idukki)" },
                { id: "TS", label: "Telangana" }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedStateFilter(filter.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition border ${
                    selectedStateFilter === filter.id
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Incident Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecords.map((record) => {
              const isTN = record.state === "Tamil Nadu";

              return (
                <div
                  key={record.id}
                  className={`bg-slate-900 border rounded-2xl p-5 shadow-xl transition flex flex-col justify-between relative group hover:border-amber-500/50 ${
                    isTN
                      ? "border-amber-500/30 bg-gradient-to-b from-slate-900 to-amber-950/10"
                      : "border-slate-800"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                              isTN
                                ? "bg-amber-950 text-amber-300 border-amber-700/60"
                                : "bg-red-950 text-red-300 border-red-800/60"
                            }`}
                          >
                            {record.state}
                          </span>
                          <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">
                            {record.disasterType || "Landslide / Flood"}
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-base leading-snug group-hover:text-amber-300 transition">
                          {record.event}
                        </h3>
                      </div>
                    </div>

                    {/* Meta location & date */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium border-y border-slate-800/60 py-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{record.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        <span className="line-clamp-1">{record.location}</span>
                      </div>
                    </div>

                    {/* Key Metrics Chips */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-500 uppercase font-bold block">Fatalities</span>
                        <span className="font-mono font-bold text-red-400 text-xs">{record.casualties} Dead</span>
                      </div>

                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-500 uppercase font-bold block">24h Rainfall</span>
                        <span className="font-mono font-bold text-cyan-300 text-xs">
                          {record.rainfall24h || "210.0 mm"}
                        </span>
                      </div>

                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-500 uppercase font-bold block">Displaced</span>
                        <span className="font-mono font-bold text-amber-300 text-xs">
                          {record.displaced || record.affectedPeople || "Multiple"}
                        </span>
                      </div>
                    </div>

                    {/* Impact snippet */}
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {record.impact}
                    </p>

                    {/* Cause & Reference */}
                    <div className="text-[11px] bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-slate-400 space-y-1">
                      <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Trigger Cause:</span>
                      </div>
                      <p className="text-slate-300 line-clamp-2">{record.cause}</p>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-800/80 gap-2">
                    <button
                      onClick={() => setSelectedIncidentModal(record)}
                      className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full Dossier</span>
                    </button>

                    <button
                      onClick={() => handleSimulateCase(record)}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-red-950/40 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Simulate in AI Engine</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: TAMIL NADU HIGHLY VULNERABLE ZONES */}
      {activeTab === "tnZones" && (
        <div className="space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              State Disaster Management Authority: Tamil Nadu High-Risk Monitoring Zones
            </h2>
            <p className="text-xs text-slate-400 max-w-4xl">
              Tamil Nadu features specialized geotechnical vulnerable sectors across the Western and Eastern Ghats. State Disaster Management Authorities heavily monitor four high-vulnerability corridors using satellite InSAR radar, piezometers, and IoT inclinometers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tnVulnerableZones.map((zone) => (
              <div
                key={zone.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 relative overflow-hidden"
              >
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-700/50 px-2.5 py-0.5 rounded-full uppercase">
                      {zone.state} Vulnerable Zone
                    </span>
                    <h3 className="font-black text-white text-lg">{zone.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>{zone.subLocations}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${
                      zone.hazardRating === "EXTREME"
                        ? "bg-red-950 text-red-300 border-red-700 animate-pulse"
                        : "bg-amber-950 text-amber-300 border-amber-700"
                    }`}
                  >
                    {zone.hazardRating} RISK
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 block uppercase">
                      Geological Profile & Slope Mechanics
                    </span>
                    <p className="text-slate-300 leading-relaxed">{zone.geology}</p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-red-400 block uppercase">
                      Primary Meteorological Trigger Factor
                    </span>
                    <p className="text-slate-300 leading-relaxed">{zone.triggerFactor}</p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-cyan-400 block uppercase">
                      Active Monitoring Protocol & Early Warning
                    </span>
                    <p className="text-slate-300 leading-relaxed">{zone.monitoringProtocol}</p>
                  </div>
                </div>

                {/* Key Disaster Cases */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Documented Catastrophic Disasters:
                  </span>
                  <div className="space-y-1">
                    {zone.keyDisasterCases.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs bg-slate-950/60 border border-slate-800/80 px-2.5 py-1.5 rounded-lg text-slate-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL INCIDENT DOSSIER MODAL */}
      {selectedIncidentModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5 relative">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-700/50 px-2.5 py-0.5 rounded-full uppercase">
                  {selectedIncidentModal.state} Forensic Case Study
                </span>
                <h2 className="text-lg font-black text-white">{selectedIncidentModal.event}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {selectedIncidentModal.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    {selectedIncidentModal.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedIncidentModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold transition"
              >
                ✕
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Fatalities</span>
                  <span className="text-base font-black text-red-400 font-mono">
                    {selectedIncidentModal.casualties}
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Displaced</span>
                  <span className="text-base font-black text-amber-400 font-mono">
                    {selectedIncidentModal.displaced || "N/A"}
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">24h Precip</span>
                  <span className="text-base font-black text-cyan-300 font-mono">
                    {selectedIncidentModal.rainfall24h || "N/A"}
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Safety Factor (Fs)</span>
                  <span className="text-base font-black text-purple-400 font-mono">
                    {selectedIncidentModal.factorOfSafety || "Critical"}
                  </span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white uppercase text-[11px] text-amber-400">
                  Full Situation & Impact Overview
                </h4>
                <p className="text-slate-300 leading-relaxed">{selectedIncidentModal.impact}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white uppercase text-[11px] text-red-400">
                  Geotechnical & Meteorological Root Cause Analysis
                </h4>
                <p className="text-slate-300 leading-relaxed">{selectedIncidentModal.cause}</p>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-slate-400">
                <span>Official Documentation Source:</span>
                <span className="font-mono text-amber-400 font-bold">{selectedIncidentModal.keySource || "NDMI / ECHO Bulletin"}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedIncidentModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSimulateCase(selectedIncidentModal);
                  setSelectedIncidentModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-red-950/50 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Cpu className="w-4 h-4" />
                <span>Simulate in AI Engine</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
