import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';
import { fareSpikeAlertData } from '../data/mockData';

export default function FareSpikeAlert() {
  const {
    route,
    routeName,
    normalAvgFare,
    currentAvgFare,
    percentageIncrease,
    spikeHistory,
    contributingFactors,
    disclaimer,
  } = fareSpikeAlertData;

  return (
    <div className="bg-gradient-to-b from-amber-50/40 via-white to-white rounded-2xl border border-amber-200/80 p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
      {/* Ambient Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500" />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">
                  Fare Spike Detected
                </h3>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full border border-rose-200 animate-pulse">
                  High Anomaly
                </span>
              </div>
              <p className="text-[12px] text-slate-500 font-medium mt-0.5">
                Target Sector: <strong className="text-slate-800">{route}</strong> ({routeName})
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Trigger: Z &gt; 3.2</span>
        </div>

        {/* Fare Price Comparison Block */}
        <div className="mt-4 bg-white rounded-xl p-4 border border-amber-200/60 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-center sm:text-left">
            {/* Normal Fare */}
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Normal Average Fare
              </div>
              <div className="text-[20px] font-extrabold text-slate-700 mt-0.5">
                ₹{normalAvgFare.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Arrow & Percentage */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5 text-rose-600 font-extrabold text-[15px]">
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
                <span>+{percentageIncrease}%</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Unusual Surge</span>
            </div>

            {/* Current Spike Fare */}
            <div className="bg-rose-50/80 p-2.5 rounded-lg border border-rose-200/80">
              <div className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">
                Current Average Fare
              </div>
              <div className="text-[20px] font-extrabold text-rose-700 mt-0.5">
                ₹{currentAvgFare.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Mini Line Chart of Spike */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span>7-Day Progression Curve</span>
              <span className="font-mono text-rose-600 font-bold">Spike at T+1</span>
            </div>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spikeHistory}>
                  <XAxis dataKey="time" hide />
                  <Tooltip
                    formatter={(val) => [`₹${val}`, 'Average Fare']}
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      color: '#FFF',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="fare"
                    stroke="#DC2626"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#DC2626' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Contributing Factors */}
        <div className="mt-4">
          <div className="text-[12px] font-bold text-slate-800 mb-1.5 flex items-center gap-1">
            <span>Possible Contributing Factors:</span>
          </div>
          <ul className="space-y-1 text-[12px] text-slate-600">
            {contributingFactors.map((factor, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-400 italic">
        <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span>{disclaimer}</span>
      </div>
    </div>
  );
}
