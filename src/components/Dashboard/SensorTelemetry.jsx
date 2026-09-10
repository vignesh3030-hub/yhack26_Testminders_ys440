import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDisasterData } from "../../context/DisasterDataContext";
import {
  Activity,
  CloudRain,
  Droplets,
  ArrowDownRight,
  Compass,
  MapPin,
  Clock
} from "lucide-react";

export const SensorTelemetry = () => {
  const { t } = useLanguage();
  const { sensors } = useDisasterData();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <Activity className="w-5 h-5 text-amber-400" />
          <span>{t("gis.sensorsToggle")} - Live Telemetry Grid</span>
        </div>
        <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
          7 Active Stations (NER Axis)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sensors.map((sensor) => {
          const isCrit = sensor.riskLevel === "CRITICAL";
          const isHigh = sensor.riskLevel === "HIGH";

          return (
            <div
              key={sensor.id}
              className={`p-4 rounded-xl border glass-panel transition-all hover:border-amber-500/50 space-y-3 ${
                isCrit
                  ? "border-red-800/80 bg-red-950/20"
                  : isHigh
                  ? "border-amber-800/80 bg-amber-950/20"
                  : "border-slate-800"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">{sensor.id}</span>
                  <h4 className="font-bold text-white text-sm leading-tight mt-0.5">
                    {sensor.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{sensor.district}, {sensor.state}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isCrit
                      ? "bg-red-900 text-red-200 animate-pulse"
                      : isHigh
                      ? "bg-amber-900 text-amber-200"
                      : "bg-emerald-900 text-emerald-200"
                  }`}
                >
                  {sensor.riskLevel}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 text-[10px] block">24h Rain</span>
                  <span className="font-bold text-cyan-300 flex items-center gap-1">
                    <CloudRain className="w-3 h-3 text-cyan-400" />
                    {sensor.rainfall24h} mm
                  </span>
                </div>

                <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 text-[10px] block">Soil Sat (VWC)</span>
                  <span className="font-bold text-blue-300 flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-blue-400" />
                    {sensor.soilMoistureVWC}%
                  </span>
                </div>

                <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 text-[10px] block">Pore Water Press.</span>
                  <span className="font-bold text-amber-300">
                    {sensor.poreWaterPressure} kPa
                  </span>
                </div>

                <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 text-[10px] block">Displacement</span>
                  <span className="font-bold text-red-300 flex items-center gap-1">
                    <ArrowDownRight className="w-3 h-3 text-red-400" />
                    {sensor.inclinometerDisplacement} mm/d
                  </span>
                </div>
              </div>

              {/* Footer Safety Factor */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {sensor.lastUpdated}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Fs:</span>
                  <span className={`font-mono font-bold ${sensor.fs < 1.0 ? 'text-red-400 font-black' : 'text-emerald-400'}`}>
                    {sensor.fs}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
