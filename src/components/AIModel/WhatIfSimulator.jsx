import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDisasterData } from "../../context/DisasterDataContext";
import {
  Sliders,
  CloudRain,
  Droplets,
  Compass,
  Trees,
  Cpu,
  AlertOctagon,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Play,
  Pause,
  Activity,
  RefreshCw
} from "lucide-react";

export const WhatIfSimulator = () => {
  const { t } = useLanguage();
  const {
    simulatorParams,
    simulatorResult,
    updateSimulator,
    isAutoSimulating,
    setIsAutoSimulating
  } = useDisasterData();

  const handleSliderChange = (key, value) => {
    // If user manually adjusts slider, pause auto-sim so manual value holds
    setIsAutoSimulating(false);
    updateSimulator({ [key]: Number(value) });
  };

  const handlePresetClick = (params) => {
    setIsAutoSimulating(false);
    updateSimulator(params);
  };

  const isCritical = simulatorResult.riskLevel === "CRITICAL";
  const isHigh = simulatorResult.riskLevel === "HIGH";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-6">
      {/* Title & Auto-Simulation Mode Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              {t("simulator.title")}
              <span className="text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                AI / ML Powered
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Automatic physics-based Infinite Slope Fs & ML risk simulation engine
            </p>
          </div>
        </div>

        {/* Automatic Simulation Mode Toggle & Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoSimulating((prev) => !prev)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-lg cursor-pointer border ${
              isAutoSimulating
                ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white border-emerald-400 animate-pulse"
                : "bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800"
            }`}
          >
            {isAutoSimulating ? (
              <>
                <Pause className="w-3.5 h-3.5 text-white" />
                <span>⚡ Live Auto-Sim Active</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span>Start Live Auto-Sim</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Auto-Simulation Status Banner */}
      {isAutoSimulating && (
        <div className="bg-slate-950/90 border border-cyan-800/80 rounded-xl p-2.5 flex items-center justify-between gap-3 text-xs shadow-inner animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              Automated AI Risk Simulation Sweeping Live Satellite & IoT Feeds
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
            INTERVAL: 3.5s LIVE AI ENGINE
          </span>
        </div>
      )}

      {/* Historic Presets Bar */}
      <div className="flex items-center gap-1.5 flex-wrap bg-slate-950 p-2.5 rounded-xl border border-slate-800">
        <span className="text-[11px] text-amber-400 font-bold mr-1">Historic Presets:</span>
        {[
          { label: "🌋 1978 Nilgiris (323mm)", params: { rainfall24h: 250, soilMoistureVWC: 96, slopeAngle: 44, slopeCutAngle: 15, deforestationPct: 50 } },
          { label: "💥 1990 Geddhai (210mm)", params: { rainfall24h: 210, soilMoistureVWC: 94, slopeAngle: 46, slopeCutAngle: 18, deforestationPct: 60 } },
          { label: "🌊 2009 Mass Slip (315mm)", params: { rainfall24h: 250, soilMoistureVWC: 98, slopeAngle: 42, slopeCutAngle: 12, deforestationPct: 45 } },
          { label: "🌀 2024 Tiruvannamalai (295mm)", params: { rainfall24h: 245, soilMoistureVWC: 94, slopeAngle: 36, slopeCutAngle: 10, deforestationPct: 35 } },
          { label: "☕ 2020 Idukki (310mm)", params: { rainfall24h: 250, soilMoistureVWC: 95, slopeAngle: 42, slopeCutAngle: 20, deforestationPct: 55 } },
          { label: "🌊 2020 Assam Surge", params: { rainfall24h: 185, soilMoistureVWC: 90, slopeAngle: 34, slopeCutAngle: 8, deforestationPct: 40 } }
        ].map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handlePresetClick(preset.params)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 text-[11px] text-slate-300 font-semibold transition cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Input Column */}
        <div className="lg:col-span-6 space-y-5 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Simulated Environmental Parameters</span>
            </div>
            {isAutoSimulating && (
              <span className="text-[10px] text-emerald-400 font-mono font-bold animate-pulse">
                • Auto-Updating
              </span>
            )}
          </div>

          {/* 1. Rainfall Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-cyan-300 flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-cyan-400" />
                {t("simulator.rainfallSlider")}
              </span>
              <span className="text-white font-mono bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded">
                {simulatorParams.rainfall24h} mm
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="250"
              step="5"
              value={simulatorParams.rainfall24h}
              onChange={(e) => handleSliderChange("rainfall24h", e.target.value)}
              className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0mm (Dry)</span>
              <span>100mm (Heavy)</span>
              <span>250mm (Cloudburst)</span>
            </div>
          </div>

          {/* 2. Soil Moisture Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-blue-300 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-400" />
                {t("simulator.soilMoistureSlider")}
              </span>
              <span className="text-white font-mono bg-blue-950 border border-blue-800 px-2 py-0.5 rounded">
                {simulatorParams.soilMoistureVWC}% VWC
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="2"
              value={simulatorParams.soilMoistureVWC}
              onChange={(e) => handleSliderChange("soilMoistureVWC", e.target.value)}
              className="w-full accent-blue-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10% (Low)</span>
              <span>60% (Normal)</span>
              <span>100% (Saturated)</span>
            </div>
          </div>

          {/* 3. Unplanned Slope Cut Angle Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-amber-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400" />
                {t("simulator.slopeCutSlider")}
              </span>
              <span className="text-white font-mono bg-amber-950 border border-amber-800 px-2 py-0.5 rounded">
                +{simulatorParams.slopeCutAngle}° (Base {simulatorParams.slopeAngle}°)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={simulatorParams.slopeCutAngle}
              onChange={(e) => handleSliderChange("slopeCutAngle", e.target.value)}
              className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0° (Natural)</span>
              <span>12° (Road Cut)</span>
              <span>25° (Steep Cut)</span>
            </div>
          </div>

          {/* 4. Deforestation Index Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-emerald-300 flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-emerald-400" />
                {t("simulator.deforestationSlider")}
              </span>
              <span className="text-white font-mono bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                {simulatorParams.deforestationPct}% Loss
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={simulatorParams.deforestationPct}
              onChange={(e) => handleSliderChange("deforestationPct", e.target.value)}
              className="w-full accent-emerald-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Intact Canopy)</span>
              <span>50% (Partial)</span>
              <span>100% (Cleared)</span>
            </div>
          </div>
        </div>

        {/* Output Metrics Column */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          {/* Main Risk Gauge Display */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isCritical
              ? "bg-red-950/70 border-red-800 shadow-xl shadow-red-950/50"
              : isHigh
              ? "bg-amber-950/70 border-amber-800 shadow-xl shadow-amber-950/50"
              : "bg-emerald-950/70 border-emerald-800"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCritical ? (
                  <AlertOctagon className="w-7 h-7 text-red-400 animate-bounce" />
                ) : (
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                )}
                <div>
                  <span className="text-xs text-slate-300 uppercase tracking-wider font-bold block">
                    Predicted Risk Level
                  </span>
                  <h3 className="text-2xl font-black tracking-tight" style={{ color: simulatorResult.color }}>
                    {simulatorResult.riskLevel} ({simulatorResult.riskScore}%)
                  </h3>
                </div>
              </div>

              {/* Factor of Safety Pill */}
              <div className="text-right bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Factor of Safety (Fs)</span>
                <span className={`text-xl font-mono font-black ${
                  simulatorResult.fs < 1.0 ? "text-red-400" : "text-emerald-400"
                }`}>
                  {simulatorResult.fs}
                </span>
                <span className="text-[9px] text-slate-400 block">
                  {simulatorResult.fs < 1.0 ? "Fs < 1.0 (Unstable)" : "Fs > 1.0 (Stable)"}
                </span>
              </div>
            </div>

            {/* Time to Failure Estimate */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-amber-400" />
                  AI Predicted Failure Time:
                </span>
                <span className="font-bold text-white font-mono">
                  {simulatorResult.timeToFailure}
                </span>
              </div>

              {/* Specific AI ML Location Reach Prediction Box */}
              <div className="bg-slate-950 p-3 rounded-xl border border-red-900/60 space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between text-red-300 font-bold">
                  <span className="flex items-center gap-1">
                    <span>🎯</span> AI Predicted Location Reach Time:
                  </span>
                  <span className="bg-red-950 px-2 py-0.5 rounded border border-red-800 text-white font-black animate-pulse">
                    {simulatorResult.predictedReachTime ? `${simulatorResult.predictedReachTime} (${simulatorResult.predictedImpactMinutes}m)` : "NO FAILURE"}
                  </span>
                </div>
                <div className="text-slate-300 flex justify-between text-[10px]">
                  <span>Target Zone: <strong className="text-amber-300">{simulatorResult.impactLocation || "NH-10 Corridor"}</strong></span>
                  <span>Speed: <strong className="text-cyan-300">{simulatorResult.debrisVelocityMps || "12.5"} m/s</strong></span>
                </div>
                <div className="text-slate-400 text-[10px] flex justify-between">
                  <span>Runout Distance: <strong className="text-emerald-400">{simulatorResult.runoutDistanceMeters || "520"}m downhill</strong></span>
                  <span className="text-amber-400 font-bold">&bull; AI Confidence: 94%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Physics Stress Breakdown */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Driving Shear Stress (&tau;<sub>d</sub>)</span>
              <span className="text-base font-mono font-bold text-red-400">
                {simulatorResult.drivingShear} kPa
              </span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Resisting Shear Strength (&tau;<sub>r</sub>)</span>
              <span className="text-base font-mono font-bold text-emerald-400">
                {simulatorResult.resistingShear} kPa
              </span>
            </div>
          </div>

          {/* AI Mitigative Recommendations */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase">
              <Zap className="w-4 h-4" />
              <span>{t("simulator.aiRecommendation")}</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              {simulatorResult.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">&bull;</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
