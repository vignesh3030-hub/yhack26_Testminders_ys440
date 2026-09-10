import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDisasterData } from "../../context/DisasterDataContext";
import { Shield, Users, Stethoscope, Phone, AlertCircle } from "lucide-react";

export const ShelterTracker = () => {
  const { t } = useLanguage();
  const { shelters } = useDisasterData();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <Shield className="w-5 h-5 text-cyan-400" />
          <span>Evacuation & Relief Shelter Management</span>
        </div>
        <span className="text-xs text-cyan-400 font-mono bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
          4 Regional Hub Shelters
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shelters.map((shelter) => {
          const occPct = Math.round((shelter.occupied / shelter.capacity) * 100);

          return (
            <div
              key={shelter.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 glass-panel"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white text-sm">{shelter.name}</h4>
                  <span className="text-xs text-slate-400">{shelter.location}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {shelter.state}
                </span>
              </div>

              {/* Occupancy Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Occupancy</span>
                  <span className="text-cyan-300 font-mono">
                    {shelter.occupied} / {shelter.capacity} ({occPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all rounded-full ${
                      occPct > 80 ? "bg-red-500" : occPct > 50 ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                    style={{ width: `${occPct}%` }}
                  />
                </div>
              </div>

              {/* Staff & Supplies */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Medical Personnel</span>
                  <span className="font-semibold text-slate-200 flex items-center gap-1">
                    <Stethoscope className="w-3 h-3 text-cyan-400" />
                    {shelter.medicalStaff}
                  </span>
                </div>

                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Ration Supplies</span>
                  <span className={`font-semibold ${
                    shelter.suppliesStatus === "ADEQUATE" ? "text-emerald-400" : "text-red-400 font-bold animate-pulse"
                  }`}>
                    {shelter.suppliesStatus}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                <Phone className="w-3 h-3 text-amber-400" />
                <span>Contact: {shelter.contactPerson}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
