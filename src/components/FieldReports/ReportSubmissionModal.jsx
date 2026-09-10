import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDisasterData } from "../../context/DisasterDataContext";
import {
  X,
  MapPin,
  Camera,
  Send,
  WifiOff,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export const ReportSubmissionModal = ({ onClose }) => {
  const { t } = useLanguage();
  const { addReport, isOffline } = useDisasterData();

  const [author, setAuthor] = useState("");
  const [hazardType, setHazardType] = useState("Tension Crack");
  const [locationName, setLocationName] = useState("");
  const [lat, setLat] = useState("27.3350");
  const [lng, setLng] = useState("88.6100");
  const [severity, setSeverity] = useState("HIGH");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const handleUseGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude.toFixed(4));
          setLng(pos.coords.longitude.toFixed(4));
          setLocationName(`GPS Position (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`);
        },
        (err) => {
          console.warn("GPS error:", err);
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reportData = {
      author: author || "Anonymous Field Reporter",
      hazardType,
      locationName: locationName || "Gangtok Axis",
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      severity,
      description,
      photoUrl: photoUrl || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80"
    };

    addReport(reportData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              {t("reports.submitNew")}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offline Warning Banner if offline */}
        {isOffline && (
          <div className="bg-amber-950/90 border-b border-amber-800 p-2.5 px-4 text-xs text-amber-200 flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{t("reports.offlineNote")}</span>
          </div>
        )}

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-emerald-200">
                {isOffline ? "Saved Offline!" : "Report Submitted!"}
              </h4>
              <p className="text-slate-400">
                {isOffline ? "Will automatically sync when online." : "Integrated into live GIS map."}
              </p>
            </div>
          ) : (
            <>
              {/* Reporter Name */}
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Reporter Name / Designation:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Officer T. Dorjee (Civil Defense)"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Hazard Category */}
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  {t("reports.hazardType")}:
                </label>
                <select
                  value={hazardType}
                  onChange={(e) => setHazardType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-500 font-semibold"
                >
                  <option value="Tension Crack">{t("reports.tensionCrack")}</option>
                  <option value="Rockfall">{t("reports.rockfall")}</option>
                  <option value="Mudslide">{t("reports.mudslide")}</option>
                  <option value="Road Subsidence">{t("reports.roadSubsidence")}</option>
                </select>
              </div>

              {/* Location & GPS */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-slate-300 block">
                    Location Name & Coordinates:
                  </label>
                  <button
                    type="button"
                    onClick={handleUseGPS}
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-bold"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{t("reports.useGPS")}</span>
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Location Name (e.g. NH-10 Km 42 Slope Crest)"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="Latitude (e.g. 27.3389)"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  />
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="Longitude (e.g. 88.6065)"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Observation Details:
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe crack length, seepage rate, boulder movement, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl shadow-lg transition"
                >
                  <Send className="w-4 h-4" />
                  <span>{t("reports.submitBtn")}</span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
