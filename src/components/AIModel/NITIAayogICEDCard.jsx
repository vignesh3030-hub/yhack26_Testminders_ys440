import React, { useState } from "react";
import { NITI_AAYOG_STATE_DISASTER_INDEX, getNitiAayogDisasterOverview } from "../../utils/nitiAayogIcedBackend";
import {
  Building2,
  ExternalLink,
  ShieldAlert,
  BarChart3,
  Award,
  Layers,
  Sparkles,
  TrendingUp,
  FileCheck
} from "lucide-react";

export const NITIAayogICEDCard = () => {
  const overview = getNitiAayogDisasterOverview();
  const [selectedState, setSelectedState] = useState("Sikkim");

  const stateData = NITI_AAYOG_STATE_DISASTER_INDEX[selectedState] || NITI_AAYOG_STATE_DISASTER_INDEX["Sikkim"];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3.5 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                NITI AAYOG ICED DISASTER & CLIMATE INTELLIGENCE
              </h3>
              <span className="text-[10px] font-mono font-bold bg-emerald-950 border border-emerald-800 text-emerald-300 px-2 py-0.5 rounded">
                AI CVI DATASET FUSED
              </span>
            </div>
            <p className="text-xs text-slate-400">
              India Climate & Energy Dashboard (ICED) state disaster vulnerability & risk ratings
            </p>
          </div>
        </div>

        <a
          href="https://iced.niti.gov.in/climate-and-environment/environment/natural-disaster"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition shadow cursor-pointer self-start sm:self-auto"
        >
          <span>NITI Aayog ICED Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* State Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mr-1 flex items-center gap-1 flex-shrink-0">
          <Award className="w-3.5 h-3.5 text-emerald-400" />
          CVI State Benchmark:
        </span>
        {Object.keys(NITI_AAYOG_STATE_DISASTER_INDEX).map((stName) => (
          <button
            key={stName}
            onClick={() => setSelectedState(stName)}
            className={`px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer flex-shrink-0 border ${
              selectedState === stName
                ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md"
                : "bg-slate-950 border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            {stName}
          </button>
        ))}
      </div>

      {/* Main NITI Aayog Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: NITI CVI Score */}
        <div className="p-3.5 rounded-xl border border-emerald-900/60 bg-emerald-950/30 space-y-1">
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
            Climate Vulnerability Index (CVI)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">{stateData.cviScore}</span>
            <span className="text-xs text-emerald-300 font-semibold">/ 100 Score</span>
          </div>
          <span className="text-[10px] text-slate-400 block truncate">
            {stateData.riskRating} Disaster Vulnerability
          </span>
        </div>

        {/* Metric 2: Landslide Frequency Rank */}
        <div className="p-3.5 rounded-xl border border-amber-900/60 bg-amber-950/30 space-y-1">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
            Landslide Hazard Frequency
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-200 font-mono">Rank #{stateData.landslideFrequencyRank}</span>
            <span className="text-xs text-amber-300 font-semibold">in India</span>
          </div>
          <span className="text-[10px] text-slate-400 block">
            Slope Fragility Index: {stateData.slopeFragilityPct}%
          </span>
        </div>

        {/* Metric 3: Annual Economic Damage Est. */}
        <div className="p-3.5 rounded-xl border border-cyan-900/60 bg-cyan-950/30 space-y-1">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
            Annual Damage Exposure
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-cyan-200 font-mono">₹{stateData.annualDamageEstCrores}</span>
            <span className="text-xs text-cyan-300 font-semibold">Crores</span>
          </div>
          <span className="text-[10px] text-slate-400 block">
            Infrastructure & Settlement Risk
          </span>
        </div>

        {/* Metric 4: Primary Triggers */}
        <div className="p-3.5 rounded-xl border border-purple-900/60 bg-purple-950/30 space-y-1">
          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">
            Primary Hazard Drivers
          </span>
          <div className="text-xs font-bold text-white line-clamp-1 mt-1">
            {stateData.primaryTriggers[0]}
          </div>
          <span className="text-[10px] text-purple-300 block truncate">
            + {stateData.primaryTriggers.length - 1} secondary factors
          </span>
        </div>
      </div>

      {/* Official NITI Aayog Advisory & AI Fusion Note */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>NITI Aayog Policy Advisory & AI Model Fusion ({selectedState})</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Source: iced.niti.gov.in
          </span>
        </div>
        <p className="text-slate-200 font-medium leading-relaxed">
          {stateData.nitiAdvisory}
        </p>
      </div>
    </div>
  );
};
