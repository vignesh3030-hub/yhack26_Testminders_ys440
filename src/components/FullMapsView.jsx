import React from "react";
import { RiskMap } from "./GISMap/RiskMap";
import { useLanguage } from "../context/LanguageContext";
import { Globe, Maximize2, Layers } from "lucide-react";

export const FullMapsView = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3 w-full h-[calc(100vh-100px)] flex flex-col">
      {/* Top Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 text-white shadow-lg">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>{t("gis.mapTitle")}</span>
              <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 font-bold px-2.5 py-0.5 rounded-full">
                LIVE NER GIS STREAM
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Interactive high-resolution landslide hazard heatmaps, sensor nodes, and vulnerable highway corridors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-slate-950 border border-slate-800 text-slate-300 font-mono px-3 py-1.5 rounded-xl hidden sm:inline">
            Center: 26.2° N, 92.5° E
          </span>
        </div>
      </div>

      {/* Full Map Container */}
      <div className="flex-1 w-full rounded-xl overflow-hidden border border-slate-800 relative">
        <RiskMap />
      </div>
    </div>
  );
};
