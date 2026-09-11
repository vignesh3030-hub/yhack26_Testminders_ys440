import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDisasterData } from "../../context/DisasterDataContext";
import { predictLocationImpactTime } from "../../utils/aiPredictorEngine";
import { BroadcastModal } from "./BroadcastModal";
import { AISatelliteMonitorCard } from "../AIModel/AISatelliteMonitorCard";
import {
  ShieldAlert,
  AlertTriangle,
  Radio,
  Navigation,
  Clock
} from "lucide-react";

export const EarlyWarningCenter = () => {
  const { t } = useLanguage();
  const { sensors, highways } = useDisasterData();
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  const criticalSensors = sensors.filter((s) => s.riskLevel === "CRITICAL");

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-5">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-950 border border-red-800 text-red-400">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              {t("alerts.title")}
            </h2>
            <p className="text-xs text-slate-400">
              Real-time threat feeds & multi-channel warning dissemination
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowBroadcastModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg transition"
        >
          <Radio className="w-4 h-4 animate-spin" />
          <span>{t("alerts.broadcastBtn")}</span>
        </button>
      </div>

      {/* Emergency SMS Mobile Target Info Banner */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-400 font-semibold">SMS Broadcast Dispatch Mobile:</span>
          <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/80">+91 8667653030</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
          <span className="text-amber-400 font-bold">&bull; Status: Active</span>
          <span>&bull; Carrier: Emergency Gateway</span>
        </div>
      </div>

      {/* Live AI Satellite Weather Risk Monitoring Engine */}
      <AISatelliteMonitorCard />

      {/* Warnings & Advisories Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Critical Red Alerts Column */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Active Red Warnings ({criticalSensors.length})</span>
          </h3>

          {criticalSensors.map((s) => {
            const pred = predictLocationImpactTime(s);
            return (
              <div
                key={s.id}
                className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 space-y-2.5 text-xs text-red-200"
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-white text-sm">{s.name}</span>
                  <span className="bg-red-900 text-white font-bold px-2 py-0.5 rounded text-[10px] animate-bounce">
                    EVACUATE NOW
                  </span>
                </div>

                <p className="text-slate-300">
                  24h Rain: <strong className="text-cyan-300">{s.rainfall24h}mm</strong> | Soil Sat: <strong className="text-blue-300">{s.soilMoistureVWC}%</strong>
                </p>

                {/* AI Predicted Location Reach Banner */}
                <div className="bg-slate-950 p-2.5 rounded-lg border border-red-800/60 space-y-1 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-amber-300 font-bold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                      AI Predicted Reach at {pred.targetName}:
                    </span>
                    <span className="text-white bg-red-950 px-2 py-0.5 rounded border border-red-800 font-black">
                      {pred.timeStr} ({pred.mins}m)
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Flow Speed: <strong className="text-cyan-300">{pred.velocity}</strong></span>
                    <span>Runout Dist: <strong className="text-emerald-400">{pred.runout}</strong></span>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-2 rounded-lg text-amber-300 font-mono text-[11px]">
                  Fs = {s.fs} (Imminent Failure Threshold Exceeded)
                </div>
              </div>
            );
          })}
        </div>

        {/* Highway Corridor Blockages Column */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <Navigation className="w-4 h-4" />
            <span>Vulnerable Highway Advisories ({highways.length})</span>
          </h3>

          {highways.map((hw) => (
            <div
              key={hw.id}
              className={`p-3.5 rounded-xl border space-y-1.5 text-xs ${
                hw.riskLevel === "CRITICAL"
                  ? "bg-amber-950/40 border-amber-800 text-amber-200"
                  : "bg-slate-950/60 border-slate-800 text-slate-300"
              }`}
            >
              <div className="flex justify-between font-bold">
                <span className="text-amber-400">{hw.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  hw.status === "PARTIALLY_BLOCKED" ? "bg-red-900 text-red-200" : "bg-amber-900 text-amber-200"
                }`}>
                  {hw.status}
                </span>
              </div>
              <p className="text-slate-300 text-[11px]">
                <strong className="text-white">Segment:</strong> {hw.criticalSegment}
              </p>
              <p className="text-slate-400 italic text-[11px]">{hw.advisory}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Broadcast Modal Popup */}
      {showBroadcastModal && (
        <BroadcastModal onClose={() => setShowBroadcastModal(false)} />
      )}
    </div>
  );
};
