import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDisasterData } from "../../context/DisasterDataContext";
import {
  X,
  Radio,
  Send,
  CheckCircle2,
  Phone,
  MessageSquare,
  Volume2,
  AlertTriangle
} from "lucide-react";

export const BroadcastModal = ({ onClose }) => {
  const { t, lang } = useLanguage();
  const { sensors, villages } = useDisasterData();

  const [channelSMS, setChannelSMS] = useState(true);
  const [channelWhatsApp, setChannelWhatsApp] = useState(true);
  const [channelSiren, setChannelSiren] = useState(true);
  const [channelRadio, setChannelRadio] = useState(false);

  const [selectedTarget, setSelectedTarget] = useState("Gangtok & Martam Axis (NH-10)");
  const [customMsg, setCustomMsg] = useState(
    "RED ALERT: Imminent landslide threat along NH-10 Km 42 & Rongli village slopes. Evacuate immediately to Paljor Stadium Shelter. Follow SDRF instructions."
  );

  const [sentSuccess, setSentSuccess] = useState(false);

  const handleBroadcast = (e) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-4 bg-red-950/90 border-b border-red-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-900 border border-red-700 text-red-200">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {t("alerts.broadcastBtn")}
              </h3>
              <p className="text-xs text-red-200">
                {t("alerts.channels")}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleBroadcast} className="p-5 space-y-4 text-xs">
          {sentSuccess ? (
            <div className="p-6 bg-emerald-950/80 border border-emerald-700 rounded-xl text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-emerald-200">
                Broadcast Sent Successfully!
              </h4>
              <p className="text-slate-300">
                Warning transmitted via SMS, WhatsApp & Local Siren Towers to {selectedTarget}.
              </p>
            </div>
          ) : (
            <>
              {/* Target Zone Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">
                  Select Target Vulnerable Corridor / Zone:
                </label>
                <select
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-red-500 font-semibold"
                >
                  <option value="Gangtok & Martam Axis (NH-10)">Sikkim - Gangtok & Martam Axis (NH-10)</option>
                  <option value="Shillong & Sohra Ridge (NH-206)">Meghalaya - Sohra & Mawsynram Ridge</option>
                  <option value="Imphal - Noney Corridor (NH-37)">Manipur - Noney & Tupul Railway Axis</option>
                  <option value="Haflong & Dima Hasao Corridor (NH-27)">Assam - Dima Hasao & Haflong Corridor</option>
                </select>
              </div>

              {/* Broadcast Channel Toggles */}
              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">
                  Select Emergency Transmission Channels:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setChannelSMS(!channelSMS)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition text-left ${
                      channelSMS ? "bg-red-950/70 border-red-700 text-red-300" : "bg-slate-950 border-slate-800 text-slate-500"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-red-400" />
                    <span>Emergency SMS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setChannelWhatsApp(!channelWhatsApp)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition text-left ${
                      channelWhatsApp ? "bg-emerald-950/70 border-emerald-700 text-emerald-300" : "bg-slate-950 border-slate-800 text-slate-500"
                    }`}
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Alert</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setChannelSiren(!channelSiren)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition text-left ${
                      channelSiren ? "bg-amber-950/70 border-amber-700 text-amber-300" : "bg-slate-950 border-slate-800 text-slate-500"
                    }`}
                  >
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Local Siren Tower</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setChannelRadio(!channelRadio)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition text-left ${
                      channelRadio ? "bg-cyan-950/70 border-cyan-700 text-cyan-300" : "bg-slate-950 border-slate-800 text-slate-500"
                    }`}
                  >
                    <Radio className="w-4 h-4 text-cyan-400" />
                    <span>Regional Radio</span>
                  </button>
                </div>
              </div>

              {/* Custom Warning Message Textarea */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">
                  Broadcast Advisory Message:
                </label>
                <textarea
                  rows={4}
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-red-500 font-sans"
                />
              </div>

              {/* Submit Action */}
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
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Alert Now</span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
