import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  Layers,
  Activity,
  Navigation,
  Home,
  Shield,
  FileText,
  Flame
} from "lucide-react";

export const MapControls = ({ layers, setLayers }) => {
  const { t } = useLanguage();

  const toggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="absolute top-4 right-4 z-[400] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-2xl text-xs space-y-2 max-w-xs">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-slate-300 font-bold">
        <Layers className="w-4 h-4 text-amber-400" />
        <span>GIS Map Layers</span>
      </div>

      <div className="space-y-1.5">
        {/* Heatmap Toggle */}
        <button
          onClick={() => toggleLayer("heatmap")}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition font-medium ${
            layers.heatmap
              ? "bg-red-950/60 border-red-800 text-red-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>{t("gis.heatmapToggle")}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${layers.heatmap ? 'bg-red-500' : 'bg-slate-600'}`} />
        </button>

        {/* Sensors Toggle */}
        <button
          onClick={() => toggleLayer("sensors")}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition font-medium ${
            layers.sensors
              ? "bg-blue-950/60 border-blue-800 text-blue-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>{t("gis.sensorsToggle")}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${layers.sensors ? 'bg-blue-500' : 'bg-slate-600'}`} />
        </button>

        {/* Highways Toggle */}
        <button
          onClick={() => toggleLayer("highways")}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition font-medium ${
            layers.highways
              ? "bg-amber-950/60 border-amber-800 text-amber-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>{t("gis.highwaysToggle")}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${layers.highways ? 'bg-amber-500' : 'bg-slate-600'}`} />
        </button>

        {/* Villages Toggle */}
        <button
          onClick={() => toggleLayer("villages")}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition font-medium ${
            layers.villages
              ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t("gis.villagesToggle")}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${layers.villages ? 'bg-emerald-500' : 'bg-slate-600'}`} />
        </button>

        {/* Shelters Toggle */}
        <button
          onClick={() => toggleLayer("shelters")}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition font-medium ${
            layers.shelters
              ? "bg-cyan-950/60 border-cyan-800 text-cyan-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t("gis.sheltersToggle")}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${layers.shelters ? 'bg-cyan-500' : 'bg-slate-600'}`} />
        </button>

        {/* Field Reports Toggle */}
        <button
          onClick={() => toggleLayer("fieldReports")}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition font-medium ${
            layers.fieldReports
              ? "bg-purple-950/60 border-purple-800 text-purple-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>{t("gis.fieldReportsToggle")}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${layers.fieldReports ? 'bg-purple-500' : 'bg-slate-600'}`} />
        </button>
      </div>
    </div>
  );
};
