import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import {
  Lightbulb,
  TrendingUp,
  Calendar,
  ChevronDown,
  Info,
} from 'lucide-react';
import {
  indexTrendDaily,
  indexTrendWeekly,
  indexTrendMonthly,
} from '../data/mockData';

// Custom Tooltip component
function CustomTrendTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isPositive = data.dailyChange >= 0;

    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-[12px] min-w-[170px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
          <span className="font-bold text-slate-200">{data.date}</span>
          <span className="text-[10px] text-slate-400 font-mono">2026</span>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Airfare Index (APIx):</span>
            <span className="font-extrabold text-blue-400 text-[14px]">
              {data.apix.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">Period Change:</span>
            <span
              className={`font-semibold flex items-center gap-0.5 ${
                isPositive ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {isPositive ? '↑ +' : '↓ '}
              {data.dailyChange}%
            </span>
          </div>

          {data.avgFare && (
            <div className="flex justify-between items-center pt-1 border-t border-slate-800 text-[11px]">
              <span className="text-slate-400">Avg Sector Fare:</span>
              <span className="font-semibold text-slate-200">
                ₹{data.avgFare.toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}

export default function IndexTrendChart() {
  const [cadence, setCadence] = useState('daily');
  const [timeRange, setTimeRange] = useState('30');

  // Select dataset based on cadence
  const getChartData = () => {
    if (cadence === 'weekly') return indexTrendWeekly;
    if (cadence === 'monthly') return indexTrendMonthly;

    if (timeRange === '7') return indexTrendDaily.slice(-7);
    if (timeRange === '14') return indexTrendDaily.slice(-14);
    return indexTrendDaily;
  };

  const chartData = getChartData();
  const latestDataPoint = chartData[chartData.length - 1];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      {/* Header Row: Title, Subtitle, and Cadence / Range Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[19px] font-bold text-slate-900 tracking-tight">
              Airfare Price Index Trend
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200/60">
              <TrendingUp className="w-3 h-3" />
              APIx Real-Time
            </span>
          </div>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Daily movement of India's representative domestic airfare prices
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Cadence Pills */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center border border-slate-200/60">
            {['daily', 'weekly', 'monthly'].map((tab) => (
              <button
                key={tab}
                onClick={() => setCadence(tab)}
                className={`px-3 py-1 text-[12px] font-semibold rounded-md capitalize transition-all ${
                  cadence === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Time range dropdown */}
          {cadence === 'daily' && (
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-[12px] pl-3 pr-7 py-1.5 rounded-lg border border-slate-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option value="30">Last 30 Days</option>
                <option value="14">Last 14 Days</option>
                <option value="7">Last 7 Days</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          )}
        </div>
      </div>

      {/* Main Interactive Line/Area Chart */}
      <div className="mt-6 h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="apixGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.00} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />

            <XAxis
              dataKey="date"
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              dy={8}
            />

            <YAxis
              domain={[98, 112]}
              ticks={[98, 100, 102, 104, 106, 108, 110, 112]}
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v.toFixed(0)}`}
            />

            <Tooltip content={<CustomTrendTooltip />} />

            {/* Dotted horizontal baseline at APIx = 100 */}
            <ReferenceLine
              y={100}
              stroke="#94A3B8"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'Baseline Period = 100.0',
                position: 'insideBottomLeft',
                fill: '#64748B',
                fontSize: 11,
                fontWeight: 600,
                offset: 10,
              }}
            />

            <Area
              type="monotone"
              dataKey="apix"
              stroke="#2563EB"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#apixGradient)"
              activeDot={{
                r: 6,
                fill: '#2563EB',
                stroke: '#FFFFFF',
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend / Latest Point highlight */}
      <div className="mt-3 flex items-center justify-between text-[12px] text-slate-500 pt-2 border-t border-slate-100 flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-blue-600 rounded-full" />
            <span className="font-medium text-slate-700">APIx Index Value</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-b border-dashed border-slate-400" />
            <span className="font-medium text-slate-500">Base Period (100.0)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Latest Recorded APIx:</span>
          <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            {latestDataPoint?.apix?.toFixed(2)}
          </span>
          <span className="text-rose-600 font-bold">
            (+{((latestDataPoint?.apix - 100) || 8.72).toFixed(2)}% vs Base)
          </span>
        </div>
      </div>

      {/* Market Insight Box */}
      <div className="mt-5 bg-gradient-to-r from-blue-50/90 to-cyan-50/60 rounded-xl p-4 border border-blue-100 flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="text-[13px] text-slate-700 leading-relaxed">
          <span className="font-bold text-slate-900 mr-1.5">Market Insight:</span>
          Airfare prices have increased by <strong className="text-blue-900 font-bold">8.72%</strong> compared to the base period. The recent upward movement is primarily concentrated in high-demand routes and shorter booking windows.
        </div>
      </div>
    </div>
  );
}
