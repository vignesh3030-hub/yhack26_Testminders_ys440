import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useDisasterData } from "../context/DisasterDataContext";
import { Triangle, AlertTriangle } from "lucide-react";

export const RiskTierCounterBar = () => {
  const { t } = useLanguage();
  const { sensors } = useDisasterData();

  const countLevel4 = sensors.filter((s) => s.riskLevel === "CRITICAL").length;
  const countLevel3 = sensors.filter((s) => s.riskLevel === "HIGH").length;
  const countLevel2 = sensors.filter((s) => s.riskLevel === "MEDIUM").length;
  const countLevel1 = sensors.filter((s) => s.riskLevel === "LOW").length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* Level IV - Critical / Awas */}
      <div className="bg-slate-900/90 border border-red-900/60 p-3.5 rounded-2xl flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-950/80 border border-red-800 text-red-500 flex items-center justify-center">
            <Triangle className="w-4 h-4 fill-red-500 rotate-0" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block leading-tight">
              {t("riskTiers.level4")}
            </span>
            <span className="text-2xl font-black text-white">{countLevel4}</span>
          </div>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
      </div>

      {/* Level III - High / Siaga */}
      <div className="bg-slate-900/90 border border-amber-900/60 p-3.5 rounded-2xl flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-950/80 border border-amber-800 text-amber-500 flex items-center justify-center">
            <Triangle className="w-4 h-4 fill-amber-500 rotate-0" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block leading-tight">
              {t("riskTiers.level3")}
            </span>
            <span className="text-2xl font-black text-white">{countLevel3}</span>
          </div>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
      </div>

      {/* Level II - Watch / Waspada */}
      <div className="bg-slate-900/90 border border-yellow-900/60 p-3.5 rounded-2xl flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-yellow-950/80 border border-yellow-800 text-yellow-500 flex items-center justify-center">
            <Triangle className="w-4 h-4 fill-yellow-500 rotate-0" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block leading-tight">
              {t("riskTiers.level2")}
            </span>
            <span className="text-2xl font-black text-white">{countLevel2}</span>
          </div>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
      </div>

      {/* Level I - Normal */}
      <div className="bg-slate-900/90 border border-emerald-900/60 p-3.5 rounded-2xl flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-500 flex items-center justify-center">
            <Triangle className="w-4 h-4 fill-emerald-500 rotate-0" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block leading-tight">
              {t("riskTiers.level1")}
            </span>
            <span className="text-2xl font-black text-white">{countLevel1}</span>
          </div>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
      </div>
    </div>
  );
};
