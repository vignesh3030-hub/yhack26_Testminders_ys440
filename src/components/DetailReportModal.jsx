import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { X, ShieldAlert, MapPin, CloudRain, Clock, AlertTriangle, ChevronRight } from "lucide-react";

export const DetailReportModal = ({ item, onClose }) => {
  const { t } = useLanguage();

  if (!item) return null;

  const isCrit = item.riskLevel === "CRITICAL" || item.fs < 1.0;
  const isHigh = item.riskLevel === "HIGH" || (item.fs >= 1.0 && item.fs < 1.25);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white text-sm">{t("modal.detailReport")}</span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition"
          >
            <X className="w-4 h-4" />
            <span>{t("modal.close")}</span>
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Mini Map Header Banner */}
          <div className="h-32 w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
              alt="Satellite Terrain Map"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-3">
              <div className="flex items-center gap-2">
                <span className="bg-slate-900/90 text-amber-300 border border-slate-700 px-2.5 py-1 rounded-lg font-mono font-bold">
                  {item.id || "SN-SKM-01"}
                </span>
                <span className="text-white font-bold text-sm drop-shadow">{item.name}</span>
              </div>
            </div>
          </div>

          {/* Slope Header & Status Pill */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{item.name}</h3>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    isCrit
                      ? "bg-red-900 text-red-200 border border-red-700"
                      : isHigh
                      ? "bg-amber-900 text-amber-200 border border-amber-700"
                      : "bg-emerald-900 text-emerald-200 border border-emerald-700"
                  }`}
                >
                  {item.riskLevel || "Level III (Siaga)"}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{item.district ? `${item.district}, ` : ""}{item.state || "North East India"}</span>
                <span>&bull; Lat: {item.lat || 27.3389}° N, Lng: {item.lng || 88.6065}° E</span>
              </p>
            </div>
          </div>

          {/* Photo & Telemetry Summary Box */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="sm:col-span-5 h-36 rounded-lg overflow-hidden border border-slate-800">
              <img
                src={item.photoUrl || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80"}
                alt="Slope Evidence"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="sm:col-span-7 space-y-2 flex flex-col justify-center text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Recorded 24h Rain:</span>
                <span className="font-bold text-cyan-300">{item.rainfall24h || 142.5} mm</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Soil Moisture VWC:</span>
                <span className="font-bold text-blue-300">{item.soilMoistureVWC || 88.4}%</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Pore Water Pressure:</span>
                <span className="font-bold text-amber-300">{item.poreWaterPressure || 45.2} kPa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Factor of Safety (Fs):</span>
                <span className={`font-mono font-black ${isCrit ? "text-red-400" : "text-emerald-400"}`}>
                  {item.fs || 0.94}
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Geotechnical Observation */}
          <div className="space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{t("modal.observation")}</span>
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs">
              {item.threatReason || item.description || "Accumulated antecedent precipitation exceeding 140mm has caused saturation of shale-sandstone overburden, reducing effective shear strength."}
            </p>
          </div>

          {/* Section 2: Visual Observation */}
          <div className="space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-[11px]">
              {t("modal.visualObs")}
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs">
              Tension cracks of 12-15cm aperture observed along shoulder slope. Mud seepage and rock spall visible near highway drainage ditch.
            </p>
          </div>

          {/* Section 3: Safety Recommendations */}
          <div className="space-y-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
              {t("modal.recommendations")}
            </h4>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&bull;</span>
                <span>Issue Level III / IV alert to regional disaster management authorities.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&bull;</span>
                <span>Restrict heavy goods transportation along highway chokepoints.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&bull;</span>
                <span>Pre-station emergency earthmovers and SDRF search teams.</span>
              </li>
            </ul>
          </div>

          {/* Risk Index Gradient Gauge */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300 uppercase">{t("gis.legend")} (Failure Index)</span>
              <span className="font-mono font-bold text-amber-400">
                Score: {item.riskScore || 89}%
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-500 via-amber-500 to-red-600 relative overflow-hidden shadow-inner">
              <div
                className="absolute top-0 bottom-0 w-1.5 bg-white border border-slate-950 shadow-md transform -translate-x-1/2"
                style={{ left: `${item.riskScore || 89}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0.0 (Normal)</span>
              <span>0.3 (Watch)</span>
              <span>0.6 (High)</span>
              <span>1.0 (Critical)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
