import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";
import { useDisasterData } from "../../context/DisasterDataContext";
import { BarChart3, TrendingUp, PieChart as PieIcon } from "lucide-react";

const trendData = [
  { time: "00:00", rainfall: 12, displacement: 1.2, riskScore: 28 },
  { time: "04:00", rainfall: 28, displacement: 2.1, riskScore: 42 },
  { time: "08:00", rainfall: 65, displacement: 4.8, riskScore: 65 },
  { time: "12:00", rainfall: 110, displacement: 9.4, riskScore: 82 },
  { time: "16:00", rainfall: 145, displacement: 14.8, riskScore: 92 },
  { time: "20:00", rainfall: 185, displacement: 19.5, riskScore: 95 }
];

export const AnalyticsCharts = () => {
  const { t } = useLanguage();
  const { sensors } = useDisasterData();

  const riskCounts = {
    CRITICAL: sensors.filter((s) => s.riskLevel === "CRITICAL").length,
    HIGH: sensors.filter((s) => s.riskLevel === "HIGH").length,
    MEDIUM: sensors.filter((s) => s.riskLevel === "MEDIUM").length,
    LOW: sensors.filter((s) => s.riskLevel === "LOW").length
  };

  const pieData = [
    { name: "Critical (Red)", value: riskCounts.CRITICAL, color: "#EF4444" },
    { name: "High (Orange)", value: riskCounts.HIGH, color: "#F97316" },
    { name: "Medium (Yellow)", value: riskCounts.MEDIUM, color: "#EAB308" },
    { name: "Low (Green)", value: riskCounts.LOW, color: "#10B981" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. Rainfall vs Displacement 24h Trend Chart */}
      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span>24-Hour Cumulative Rainfall vs Inclinometer Slope Displacement</span>
          </div>
          <span className="text-xs text-cyan-400 font-mono font-semibold">
            Correlation r = 0.94
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorDisp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94A3B8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#334155",
                  borderRadius: "0.5rem",
                  color: "#F8FAFC"
                }}
              />
              <Area
                type="monotone"
                dataKey="rainfall"
                name="Rainfall (mm)"
                stroke="#06B6D4"
                fillOpacity={1}
                fill="url(#colorRain)"
              />
              <Area
                type="monotone"
                dataKey="displacement"
                name="Displacement (mm/day)"
                stroke="#EF4444"
                fillOpacity={1}
                fill="url(#colorDisp)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Risk Level Distribution Pie Chart */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <PieIcon className="w-5 h-5 text-amber-400" />
            <span>Hazard Risk Distribution</span>
          </div>
        </div>

        <div className="h-64 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#334155",
                  borderRadius: "0.5rem"
                }}
              />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
