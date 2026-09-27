import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
} from 'recharts';
import { CalendarClock, TrendingUp, Info } from 'lucide-react';
import { leadTimeData } from '../data/mockData';

function CustomLeadTimeTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-[12px] min-w-[170px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
          <span className="font-bold text-slate-200">{data.window} Departure</span>
          <span className="text-[10px] text-cyan-400 font-mono">{data.label}</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Average Fare:</span>
            <span className="font-extrabold text-cyan-400 text-[13px]">
              ₹{data.avgFare.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400">Premium vs T+45:</span>
            <span className="font-semibold text-rose-400">{data.premium}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function LeadTimeChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">
              Booking Window Analysis
            </h3>
            <p className="text-[13px] text-slate-500 mt-0.5">
              How airfare changes as departure approaches
            </p>
          </div>
          <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-50 border border-cyan-200/60 px-2 py-0.5 rounded">
            Lead-Time Sensitivity
          </span>
        </div>

        {/* Lead-Time Curve Line Chart */}
        <div className="mt-4 h-[250px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={leadTimeData}
              margin={{ top: 25, right: 35, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              
              <XAxis
                dataKey="window"
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              
              <YAxis
                domain={[3500, 7800]}
                ticks={[3500, 4500, 5500, 6500, 7500]}
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${v}`}
              />

              <Tooltip content={<CustomLeadTimeTooltip />} />

              <Line
                type="monotone"
                dataKey="avgFare"
                stroke="#06B6D4"
                strokeWidth={3.5}
                dot={{
                  r: 5,
                  fill: '#0891B2',
                  stroke: '#FFFFFF',
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 7,
                  fill: '#0E7490',
                  stroke: '#FFFFFF',
                  strokeWidth: 3,
                }}
              />

              {/* T+1 Spike Annotation Dot */}
              <ReferenceDot
                x="T+1"
                y={7200}
                r={8}
                fill="#DC2626"
                stroke="#FFFFFF"
                strokeWidth={2}
                label={{
                  value: '84.6% higher than T+45',
                  position: 'top',
                  fill: '#DC2626',
                  fontSize: 11,
                  fontWeight: 700,
                  offset: 12,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insight Footer */}
      <div className="mt-4 pt-4 border-t border-slate-100 bg-cyan-50/40 rounded-xl p-3.5 border border-cyan-100 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <CalendarClock className="w-4 h-4" />
        </div>
        <div className="flex-1 text-[12px] text-slate-700 leading-snug">
          <span className="font-bold text-slate-900 mr-1">Lead-Time Dynamic:</span>
          Flights booked closer to departure show significantly higher prices, demonstrating strong lead-time sensitivity in airline dynamic pricing.
        </div>
      </div>
    </div>
  );
}
