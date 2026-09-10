import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDisasterData } from "../../context/DisasterDataContext";
import { X, Printer, ShieldAlert, FileText, Download } from "lucide-react";

export const SituationReportModal = ({ onClose }) => {
  const { t } = useLanguage();
  const { sensors, highways, villages, shelters, unitsDeployed, fieldReports } = useDisasterData();

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const criticalSensors = sensors.filter((s) => s.riskLevel === "CRITICAL");

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh] relative z-[10000]">
        {/* Modal Action Header */}
        <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Official Disaster Situation Report (SitRep)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-1.5 px-3 rounded-lg transition shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable SitRep Content */}
        <div className="p-6 overflow-y-auto space-y-6 bg-slate-950 text-slate-100 font-sans print:bg-white print:text-black">
          {/* Document Header */}
          <div className="border-b-2 border-amber-500 pb-4 text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-red-400 print:text-red-700">
              <ShieldAlert className="w-6 h-6" />
              <span className="text-xs font-black tracking-widest uppercase">
                CONFIDENTIAL &bull; EMERGENCY DISASTER BULLETIN
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white print:text-black">
              NORTH EASTERN REGION (NER) LANDSLIDE DISASTER SITREP
            </h1>
            <p className="text-xs text-slate-400 print:text-gray-600 font-mono">
              Report Generated: {currentDate} | Time: {new Date().toLocaleTimeString()}
            </p>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-amber-400 print:text-amber-700 uppercase tracking-wider text-sm">
              1. Executive Operational Summary
            </h3>
            <p className="text-slate-300 print:text-gray-800 leading-relaxed">
              Monsoon cloudburst activity across North East India and West Bengal has triggered elevated slope pore water pressure along critical mountain corridors. Official NDMI & ASDMA telemetry reports <strong className="text-red-400 print:text-red-700">active alarms at {criticalSensors.length} IoT Station locations</strong> (Gangtok NH-10, Sohra Ridge, Tupul Manipur Axis). Over <strong className="text-amber-400 print:text-amber-700">568,000 evacuees hosted across 1,007 relief centers</strong> with Factor of Safety ($F_s$) dropping below 1.0 at primary highway chokepoints.
            </p>
          </div>

          {/* Critical Hazard Table */}
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-amber-400 print:text-amber-700 uppercase tracking-wider text-sm">
              2. Critical Slope Station Telemetry
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-800 print:border-gray-300">
                <thead>
                  <tr className="bg-slate-900 print:bg-gray-100 text-slate-300 print:text-black border-b border-slate-800 print:border-gray-300">
                    <th className="p-2 border border-slate-800 print:border-gray-300">Station ID</th>
                    <th className="p-2 border border-slate-800 print:border-gray-300">Location</th>
                    <th className="p-2 border border-slate-800 print:border-gray-300">24h Rain</th>
                    <th className="p-2 border border-slate-800 print:border-gray-300">Soil Sat (VWC)</th>
                    <th className="p-2 border border-slate-800 print:border-gray-300">Fs (Safety Factor)</th>
                    <th className="p-2 border border-slate-800 print:border-gray-300">Risk Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-gray-300">
                  {sensors.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-900/50 print:hover:bg-gray-50">
                      <td className="p-2 font-mono font-bold">{s.id}</td>
                      <td className="p-2">{s.name}</td>
                      <td className="p-2 font-bold">{s.rainfall24h} mm</td>
                      <td className="p-2">{s.soilMoistureVWC}%</td>
                      <td className={`p-2 font-mono font-bold ${s.fs < 1.0 ? 'text-red-400 print:text-red-700' : 'text-emerald-400 print:text-emerald-700'}`}>{s.fs}</td>
                      <td className="p-2 font-bold">{s.riskLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Highway & Response Summary */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200 print:text-black border-b border-slate-800 pb-1">
                Active Highway Closures
              </h4>
              {highways.map((hw) => (
                <div key={hw.id} className="flex justify-between text-slate-300 print:text-gray-800">
                  <span>{hw.name}</span>
                  <span className="font-bold text-red-400 print:text-red-700">{hw.status}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200 print:text-black border-b border-slate-800 pb-1">
                Emergency Resource Deployment
              </h4>
              <p className="text-slate-300 print:text-gray-800">
                NDRF/SDRF Active Teams: <strong className="text-amber-400 print:text-amber-700">{unitsDeployed} Units</strong>
              </p>
              <p className="text-slate-300 print:text-gray-800">
                Active Evacuation Shelters: <strong className="text-cyan-400 print:text-cyan-700">4 Operational Hubs</strong>
              </p>
            </div>
          </div>

          {/* Signoff */}
          <div className="pt-4 border-t border-slate-800 print:border-gray-300 flex justify-between text-[10px] text-slate-400 print:text-gray-500 font-mono">
            <span>ISSUED BY: NER AI DISASTER MONITORING CELL</span>
            <span>END OF SITUATION REPORT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
