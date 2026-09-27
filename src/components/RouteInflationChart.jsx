import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ReferenceLine,
} from 'recharts';
import { Flame, AlertCircle, ArrowUpRight } from 'lucide-react';
import { routeInflationData } from '../data/mockData';

// Color assignment logic based on specification
export const getInflationColor = (value) => {
  if (value > 15) return '#DC2626'; // Red (> 15%)
  if (value >= 8) return '#F59E0B'; // Amber (8% - 15%)
  if (value >= 0) return '#2563EB'; // Blue (0% - 8%)
  return '#16A34A'; // Green (Negative)
};

function CustomRouteTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isPositive = data.inflation >= 0;

    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-[12px] min-w-[190px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
          <span className="font-bold text-slate-200">{data.route}</span>
          <span className="text-[10px] text-slate-400 font-mono">
            {data.dailyFlights} Daily Flights
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Fare Inflation:</span>
            <span
              className="font-extrabold text-[13px]"
              style={{ color: getInflationColor(data.inflation) }}
            >
              {isPositive ? '+' : ''}
              {data.inflation.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400">Current Avg Fare:</span>
            <span className="font-semibold text-slate-200">
              ₹{data.currentFare.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400">Base Period Fare:</span>
            <span className="font-semibold text-slate-400">
              ₹{data.baseFare.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-800">
            <span className="text-slate-400">Index Weight:</span>
            <span className="font-semibold text-blue-400">{data.weight}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function RouteInflationChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">
              Route-Wise Fare Inflation
            </h3>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Base = 100
            </span>
          </div>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Percentage change compared to the base period
          </p>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-between text-[11px] flex-wrap gap-2 text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]" />
            <span>High (&gt;15%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]" />
            <span>Moderate (8–15%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#2563EB]" />
            <span>Stable (0–8%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#16A34A]" />
            <span>Decrease (&lt;0%)</span>
          </div>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="mt-4 h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={routeInflationData}
              margin={{ top: 5, right: 30, left: 15, bottom: 5 }}
            >
              <XAxis
                type="number"
                domain={[-5, 22]}
                ticks={[-5, 0, 5, 10, 15, 20]}
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
                tickFormatter={(v) => `${v > 0 ? '+' : ''}${v}%`}
              />
              <YAxis
                type="category"
                dataKey="route"
                stroke="#475569"
                fontSize={12}
                fontWeight={600}
                tickLine={false}
                axisLine={false}
                width={85}
              />
              <Tooltip content={<CustomRouteTooltip />} cursor={{ fill: '#F8FAFC' }} />
              <ReferenceLine x={0} stroke="#94A3B8" strokeWidth={1.5} />
              
              <Bar dataKey="inflation" radius={[0, 4, 4, 0]} barSize={16}>
                {routeInflationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getInflationColor(entry.inflation)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Highest Inflation Callout */}
      <div className="mt-4 pt-4 border-t border-slate-100 bg-rose-50/50 rounded-xl p-3.5 border border-rose-100 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <Flame className="w-4 h-4" />
        </div>
        <div className="flex-1 text-[12px]">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">
              Highest Inflation: <span className="text-rose-700 font-extrabold">DEL → BOM</span>
            </span>
            <span className="font-extrabold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded text-[11px]">
              +18.0%
            </span>
          </div>
          <p className="text-slate-600 mt-0.5 leading-snug">
            Delhi–Mumbai currently shows the strongest fare inflation among monitored routes.
          </p>
        </div>
      </div>
    </div>
  );
}
