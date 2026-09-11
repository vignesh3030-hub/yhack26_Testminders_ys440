import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  Layers,
  Activity,
  Navigation,
  Home,
  Shield,
  FileText,
  Flame,
  Minimize2,
  ChevronDown,
  SlidersHorizontal,
  Globe
} from "lucide-react";

export const MapControls = ({
  layers,
  setLayers,
  onSelectSector,
  tileStyle,
  setTileStyle
}) => {
  const { t } = useLanguage();
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Minimized state - renders a compact trigger pill
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="absolute top-4 right-4 z-[400] bg-slate-900/95 backdrop-blur-md border border-slate-700/90 rounded-xl px-3.5 py-2 shadow-2xl text-xs flex items-center gap-2 text-white hover:border-amber-500/80 transition-all cursor-pointer group"
        title="Expand Map Controls & Zoom"
      >
        <SlidersHorizontal className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform" />
        <span className="font-bold">{t("gisControls.layersTitle") || "Map Controls & Zoom"}</span>
        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
      </button>
    );
  }

  // Expanded state - renders full controls with a minimize button header
  return (
    <div className="absolute top-4 right-4 z-[400] bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-2xl text-xs space-y-2.5 max-w-xs animate-fadeIn">
      {/* Header with Minimize Button */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-slate-200 font-bold">
          <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          <span>MAP CONTROLS & ZOOM</span>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-300 transition cursor-pointer flex items-center gap-1 text-[11px]"
          title="Minimize Panel"
        >
          <Minimize2 className="w-3.5 h-3.5" />
          <span className="font-semibold text-[10px]">Minimize</span>
        </button>
      </div>


      {/* Map Base Layer Style Selector */}
      <div className="space-y-1 border-b border-slate-800 pb-2.5">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Base Map Layer</span>
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => setTileStyle && setTileStyle("street")}
            className={`px-1.5 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
              tileStyle === "street"
                ? "bg-amber-500 text-slate-950 border border-amber-400"
                : "bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300"
            }`}
          >
            Street
          </button>
          <button
            onClick={() => setTileStyle && setTileStyle("dark")}
            className={`px-1.5 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
              tileStyle === "dark"
                ? "bg-amber-500 text-slate-950 border border-amber-400"
                : "bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300"
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => setTileStyle && setTileStyle("satellite")}
            className={`px-1.5 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
              tileStyle === "satellite"
                ? "bg-amber-500 text-slate-950 border border-amber-400"
                : "bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300"
            }`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Sector View Selection Buttons */}
      <div className="space-y-1 border-b border-slate-800 pb-2.5">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Sector Quick Zoom</span>
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => onSelectSector && onSelectSector("ALL")}
            className="px-2 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] font-bold text-slate-300 transition cursor-pointer"
          >
            {t("gisControls.allIndia") || "All India"}
          </button>
          <button
            onClick={() => onSelectSector && onSelectSector("TN")}
            className="px-2 py-1 rounded bg-amber-950/60 hover:bg-amber-900/80 border border-amber-800/80 text-[10px] font-bold text-amber-300 transition cursor-pointer"
          >
            {t("gisControls.tnSector") || "Tamil Nadu"}
          </button>
          <button
            onClick={() => onSelectSector && onSelectSector("NER")}
            className="px-2 py-1 rounded bg-red-950/60 hover:bg-red-900/80 border border-red-800/80 text-[10px] font-bold text-red-300 transition cursor-pointer"
          >
            {t("gisControls.nerSector") || "NER Sector"}
          </button>
        </div>
      </div>

      {/* GIS Layers Title */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-1.5 text-slate-300 font-bold">
        <Layers className="w-4 h-4 text-amber-400" />
        <span>{t("gisControls.layersTitle") || "GIS Map Layers"}</span>
      </div>

      <div className="space-y-1.5">
        {/* Heatmap Toggle */}
        <button
          onClick={() => toggleLayer("heatmap")}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition font-medium cursor-pointer ${
            layers.heatmap
              ? "bg-red-950/60 border-red-800 text-red-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>{t("gisControls.heatmap") || "Risk Heatmap"}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${layers.heatmap ? 'bg-red-500' : 'bg-slate-600'}`} />
        </button>

        {/* Sensors Toggle */}
        <button
          onClick={() => toggleLayer("sensors")}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition font-medium cursor-pointer ${
            layers.sensors
              ? "bg-blue-950/60 border-blue-800 text-blue-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>{t("gisControls.sensors") || "IoT Sensors"}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${layers.sensors ? 'bg-blue-500' : 'bg-slate-600'}`} />
        </button>

        {/* Highways Toggle */}
        <button
          onClick={() => toggleLayer("highways")}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition font-medium cursor-pointer ${
            layers.highways
              ? "bg-amber-950/60 border-amber-800 text-amber-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>{t("gisControls.highways") || "Vulnerable Highways"}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${layers.highways ? 'bg-amber-500' : 'bg-slate-600'}`} />
        </button>

        {/* Villages Toggle */}
        <button
          onClick={() => toggleLayer("villages")}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition font-medium cursor-pointer ${
            layers.villages
              ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t("gisControls.villages") || "Mountain Villages"}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${layers.villages ? 'bg-emerald-500' : 'bg-slate-600'}`} />
        </button>

        {/* Shelters Toggle */}
        <button
          onClick={() => toggleLayer("shelters")}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition font-medium cursor-pointer ${
            layers.shelters
              ? "bg-cyan-950/60 border-cyan-800 text-cyan-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t("gisControls.shelters") || "Relief Shelters"}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${layers.shelters ? 'bg-cyan-500' : 'bg-slate-600'}`} />
        </button>

        {/* Field Reports Toggle */}
        <button
          onClick={() => toggleLayer("fieldReports")}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition font-medium cursor-pointer ${
            layers.fieldReports
              ? "bg-purple-950/60 border-purple-800 text-purple-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>{t("gisControls.fieldReports") || "Field Reports"}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${layers.fieldReports ? 'bg-purple-500' : 'bg-slate-600'}`} />
        </button>
      </div>
    </div>
  );
};
