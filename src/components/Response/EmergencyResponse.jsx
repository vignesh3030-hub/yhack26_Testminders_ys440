import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDisasterData } from "../../context/DisasterDataContext";
import {
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  Shield,
  MapPin,
  ArrowRight
} from "lucide-react";

export const EmergencyResponse = () => {
  const { t } = useLanguage();
  const { villages, dispatchNDRFUnit } = useDisasterData();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <Truck className="w-5 h-5 text-red-400" />
          <span>{t("response.title")}</span>
        </div>
        <span className="text-xs text-red-300 font-mono bg-red-950 px-3 py-1 rounded-full border border-red-800">
          Ranked by Vulnerability Index
        </span>
      </div>

      {/* Priority Village Dispatch Cards */}
      <div className="space-y-3">
        {villages.map((village, idx) => {
          const isCrit = village.riskLevel === "CRITICAL";

          return (
            <div
              key={village.id}
              className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
                isCrit ? "bg-red-950/40 border-red-800/80" : "bg-slate-950 border-slate-800"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">
                  #{idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base">{village.name}</h4>
                    <span className="text-xs text-slate-400">({village.state})</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isCrit ? "bg-red-900 text-red-200" : "bg-amber-900 text-amber-200"
                      }`}
                    >
                      {village.riskLevel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      At-Risk Population: <strong className="text-white">{village.population.toLocaleString()}</strong>
                    </span>
                    <span className="text-amber-400 font-semibold">
                      Shelter: {village.designatedShelter}
                    </span>
                  </p>

                  <p className="text-[11px] text-red-300/90 mt-1 italic">
                    Threat: {village.threatReason}
                  </p>
                </div>
              </div>

              {/* Dispatch Action Button */}
              <div className="flex items-center gap-2 self-end md:self-center">
                {village.evacuationStatus === "NDRF_DISPATCHED" ? (
                  <span className="flex items-center gap-1 text-xs bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold px-4 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    NDRF Deployed ({village.unitsAssigned || 1} Team)
                  </span>
                ) : (
                  <button
                    onClick={() => dispatchNDRFUnit(village.id)}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg transition"
                  >
                    <Truck className="w-4 h-4" />
                    <span>{t("response.deployUnit")}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
