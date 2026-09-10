import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDisasterData } from "../../context/DisasterDataContext";
import {
  ShieldAlert,
  AlertTriangle,
  CloudRain,
  Activity,
  Truck,
  Building,
  Radio,
  FileCheck
} from "lucide-react";

export const DisasterOverview = () => {
  const { t } = useLanguage();
  const { sensors, highways, villages, shelters, unitsDeployed, fieldReports } = useDisasterData();

  const criticalSensors = sensors.filter((s) => s.riskLevel === "CRITICAL").length;
  const highSensors = sensors.filter((s) => s.riskLevel === "HIGH").length;
  const blockedHighways = highways.filter((h) => h.status !== "OPEN").length;
  const maxRainfall = Math.max(...sensors.map((s) => s.rainfall24h));
  const totalShelterCap = shelters.reduce((acc, s) => acc + s.capacity, 0);
  const totalShelterOcc = shelters.reduce((acc, s) => acc + s.occupied, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Critical Zones KPI */}
      <div className="bg-gradient-to-br from-red-950/80 to-slate-900 border border-red-800/80 rounded-2xl p-4 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-red-400 uppercase tracking-wider block">
            Critical Risk Slopes
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-white">{criticalSensors}</span>
            <span className="text-xs text-red-300 font-semibold">+ {highSensors} High Watch</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Sikkim, Meghalaya, Manipur Axis</span>
        </div>
        <div className="p-3 bg-red-900/40 rounded-xl border border-red-700/60 text-red-400">
          <AlertTriangle className="w-6 h-6 animate-bounce" />
        </div>
      </div>

      {/* 2. 24h Rainfall Peak KPI */}
      <div className="bg-gradient-to-br from-cyan-950/80 to-slate-900 border border-cyan-800/80 rounded-2xl p-4 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
            Peak 24h Rainfall
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-cyan-200">{maxRainfall}</span>
            <span className="text-xs text-cyan-400 font-bold">mm</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Recorded at Sohra / Mawsynram</span>
        </div>
        <div className="p-3 bg-cyan-900/40 rounded-xl border border-cyan-700/60 text-cyan-400">
          <CloudRain className="w-6 h-6" />
        </div>
      </div>

      {/* 3. Highway Blockages KPI */}
      <div className="bg-gradient-to-br from-amber-950/80 to-slate-900 border border-amber-800/80 rounded-2xl p-4 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
            Highway Blockages
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-amber-200">{blockedHighways}</span>
            <span className="text-xs text-amber-300 font-semibold">Corridors Affected</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">NH-10 & NH-37 Chokepoints</span>
        </div>
        <div className="p-3 bg-amber-900/40 rounded-xl border border-amber-700/60 text-amber-400">
          <Radio className="w-6 h-6" />
        </div>
      </div>

      {/* 4. NDRF Rescue & Shelter Capacity KPI */}
      <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-800/80 rounded-2xl p-4 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
            NDRF Units & Shelters
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-white">{unitsDeployed}</span>
            <span className="text-xs text-emerald-300 font-semibold">Deployed</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Shelters: {totalShelterOcc}/{totalShelterCap} Occupied
          </span>
        </div>
        <div className="p-3 bg-emerald-900/40 rounded-xl border border-emerald-700/60 text-emerald-400">
          <Truck className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
