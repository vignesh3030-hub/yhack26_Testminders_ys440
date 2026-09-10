import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDisasterData } from "../../context/DisasterDataContext";
import {
  X,
  AlertTriangle,
  Activity,
  Droplets,
  CloudRain,
  Compass,
  ArrowDownRight,
  Shield,
  Truck,
  MapPin,
  ExternalLink
} from "lucide-react";

export const FeatureDetailsModal = ({ item, type, onClose }) => {
  const { t } = useLanguage();
  const { dispatchNDRFUnit } = useDisasterData();

  if (!item) return null;

  const isSensor = type === "sensor";
  const isVillage = type === "village";
  const isHighway = type === "highway";
  const isReport = type === "report";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className={`p-4 flex items-center justify-between border-b ${
          item.riskLevel === "CRITICAL"
            ? "bg-red-950/80 border-red-800"
            : item.riskLevel === "HIGH"
            ? "bg-amber-950/80 border-amber-800"
            : "bg-slate-800 border-slate-700"
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-700">
              <AlertTriangle className={`w-6 h-6 ${
                item.riskLevel === "CRITICAL" ? "text-red-400 animate-bounce" : "text-amber-400"
              }`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {type.toUpperCase()}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  item.riskLevel === "CRITICAL"
                    ? "bg-red-900 text-red-200"
                    : item.riskLevel === "HIGH"
                    ? "bg-amber-900 text-amber-200"
                    : "bg-emerald-900 text-emerald-200"
                }`}>
                  {item.riskLevel || "INFO"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {item.name || item.locationName || item.connectedHighway}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Geolocation Tag */}
          <div className="flex items-center justify-between text-xs bg-slate-950/50 p-2.5 rounded-lg border border-slate-800 text-slate-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Location: {item.lat?.toFixed(4)}° N, {item.lng?.toFixed(4)}° E</span>
            </div>
            {item.state && (
              <span className="font-semibold text-slate-300">{item.district ? `${item.district}, ` : ''}{item.state}</span>
            )}
          </div>

          {/* SENSOR TELEMETRY METRICS */}
          {isSensor && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <CloudRain className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">24h Rain</span>
                  <span className="text-sm font-bold text-cyan-300">{item.rainfall24h} mm</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <Droplets className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Soil Sat (VWC)</span>
                  <span className="text-sm font-bold text-blue-300">{item.soilMoistureVWC}%</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <Compass className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Slope Angle</span>
                  <span className="text-sm font-bold text-amber-300">{item.slopeAngle}°</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <ArrowDownRight className="w-4 h-4 text-red-400 mx-auto mb-1" />
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Fs (Safety)</span>
                  <span className={`text-sm font-bold ${item.fs < 1.0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {item.fs}
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Pore Water Pressure:</span>
                  <span className="font-bold text-slate-200">{item.poreWaterPressure} kPa</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Inclinometer Displacement:</span>
                  <span className="font-bold text-slate-200">{item.inclinometerDisplacement} mm/day</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Connected Highway:</span>
                  <span className="font-bold text-amber-400">{item.connectedHighway}</span>
                </div>
              </div>
            </div>
          )}

          {/* VILLAGE DETAILS */}
          {isVillage && (
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">At Risk Population:</span>
                  <span className="font-bold text-white text-base">{item.population.toLocaleString()} Residents</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Evacuation Status:</span>
                  <span className="font-bold text-amber-400">{item.evacuationStatus}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Designated Shelter:</span>
                  <span className="font-bold text-cyan-300">{item.designatedShelter}</span>
                </div>
              </div>

              <div className="bg-red-950/40 border border-red-900/60 p-3 rounded-xl text-xs text-red-200">
                <span className="font-bold block mb-1">Primary Hazard Threat:</span>
                {item.threatReason}
              </div>

              <button
                onClick={() => dispatchNDRFUnit(item.id)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg transition"
              >
                <Truck className="w-4 h-4" />
                <span>Dispatch NDRF/SDRF Rescue Unit</span>
              </button>
            </div>
          )}

          {/* HIGHWAY DETAILS */}
          {isHighway && (
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Highway Length:</span>
                  <span className="font-bold text-slate-200">{item.lengthKm} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Critical Failure Corridor:</span>
                  <span className="font-bold text-amber-400">{item.criticalSegment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Traffic Status:</span>
                  <span className="font-bold text-red-400">{item.status}</span>
                </div>
              </div>

              <div className="bg-amber-950/40 border border-amber-800/60 p-3.5 rounded-xl text-xs text-amber-200">
                <span className="font-bold block mb-1">Travel Advisory:</span>
                {item.advisory}
              </div>
            </div>
          )}

          {/* FIELD REPORT DETAILS */}
          {isReport && (
            <div className="space-y-3">
              {item.photoUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-800 max-h-56">
                  <img
                    src={item.photoUrl}
                    alt="Hazard Evidence"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Reported By:</span>
                  <span className="font-bold text-slate-200">{item.author}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Hazard Category:</span>
                  <span className="font-bold text-amber-400">{item.hazardType}</span>
                </div>
                <p className="text-slate-300 pt-1 text-sm">{item.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
