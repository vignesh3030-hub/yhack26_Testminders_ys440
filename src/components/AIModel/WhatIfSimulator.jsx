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
  Zap
} from "lucide-react";

export const WhatIfSimulator = () => {
  const { t } = useLanguage();
  const { simulatorParams, simulatorResult, updateSimulator } = useDisasterData();

  const handleSliderChange = (key, value) => {
    updateSimulator({ [key]: Number(value) });
  };

  const isCritical = simulatorResult.riskLevel === "CRITICAL";
  const isHigh = simulatorResult.riskLevel === "HIGH";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
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
              {t("simulator.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Input Column */}
        <div className="lg:col-span-6 space-y-5 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Simulated Environmental Parameters</span>
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
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Estimated Time to Failure:
              </span>
              <span className="font-bold text-white font-mono">
                {simulatorResult.timeToFailure}
              </span>
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
