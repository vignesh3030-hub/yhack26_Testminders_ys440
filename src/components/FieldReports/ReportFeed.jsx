import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDisasterData } from "../../context/DisasterDataContext";
import { ReportSubmissionModal } from "./ReportSubmissionModal";
import {
  FileText,
  PlusCircle,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

export const ReportFeed = () => {
  const { t } = useLanguage();
  const { fieldReports, pendingOfflineCount, syncOfflineData } = useDisasterData();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <FileText className="w-5 h-5 text-purple-400" />
          <span>{t("reports.title")}</span>
        </div>

        <div className="flex items-center gap-2">
          {pendingOfflineCount > 0 && (
            <button
              onClick={syncOfflineData}
              className="flex items-center gap-1 text-xs bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync ({pendingOfflineCount})</span>
            </button>
          )}

          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition shadow-lg"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t("reports.submitNew")}</span>
          </button>
        </div>
      </div>

      {/* Reports Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fieldReports.map((report) => (
          <div
            key={report.id}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 glass-panel"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-bold block">
                  {report.id} &bull; {report.hazardType}
                </span>
                <h4 className="font-bold text-white text-sm mt-0.5">
                  {report.locationName}
                </h4>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  report.synced
                    ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                    : "bg-amber-950 text-amber-300 border border-amber-800 animate-pulse"
                }`}
              >
                {report.synced ? "VERIFIED" : "PENDING SYNC"}
              </span>
            </div>

            {report.photoUrl && (
              <div className="rounded-lg overflow-hidden h-36 border border-slate-800 bg-slate-900">
                <img
                  src={report.photoUrl}
                  alt="Hazard Evidence"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/tension_crack.png";
                  }}
                />
              </div>
            )}

            <p className="text-xs text-slate-300 line-clamp-2">
              {report.description}
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {report.lat?.toFixed(3)}°, {report.lng?.toFixed(3)}°
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                {report.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showSubmitModal && (
        <ReportSubmissionModal onClose={() => setShowSubmitModal(false)} />
      )}
    </div>
  );
};
