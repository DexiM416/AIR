import React from 'react';
import {
  TrendingUp,
  IndianRupee,
  MapPinned,
  Database,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

export function SparklineMini({ data = [] }) {
  if (!data || data.length === 0) return null;
  return (
    <div className="w-20 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="v"
            stroke="#2563EB"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function KPICard({
  label,
  value,
  badgeText,
  badgeType = 'positive', // positive, neutral, negative
  subText,
  footerText,
  iconType,
  sparklineData = null,
  highlight = false,
}) {
  const renderIcon = () => {
    switch (iconType) {
      case 'index':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'fare':
        return <IndianRupee className="w-5 h-5 text-emerald-600" />;
      case 'routes':
        return <MapPinned className="w-5 h-5 text-indigo-600" />;
      case 'quotes':
        return <Database className="w-5 h-5 text-cyan-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
    }
  };

  const getIconContainerClass = () => {
    switch (iconType) {
      case 'index':
        return 'bg-blue-50 border-blue-100';
      case 'fare':
        return 'bg-emerald-50 border-emerald-100';
      case 'routes':
        return 'bg-indigo-50 border-indigo-100';
      case 'quotes':
        return 'bg-cyan-50 border-cyan-100';
      default:
        return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border ${
        highlight ? 'border-blue-300 ring-2 ring-blue-500/10' : 'border-slate-200'
      } p-5 shadow-xs card-hover-effect flex flex-col justify-between relative overflow-hidden group`}
    >
      {/* Subtle top ambient indicator */}
      {highlight && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />
      )}

      <div>
        {/* Header Row: Label & Icon */}
        <div className="flex items-start justify-between mb-2">
          <span className="text-[13px] font-semibold tracking-wider text-slate-500 uppercase">
            {label}
          </span>
          <div
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${getIconContainerClass()}`}
          >
            {renderIcon()}
          </div>
        </div>

        {/* Metric Value & Trend Badge / Sparkline */}
        <div className="flex items-baseline justify-between mt-1">
          <div className="text-[30px] font-extrabold tracking-tight text-slate-900 leading-tight">
            {value}
          </div>
          {sparklineData && <SparklineMini data={sparklineData} />}
        </div>

        {/* Trend badge / small description */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {badgeText && (
            <span
              className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                badgeType === 'positive'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                  : badgeType === 'negative'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                  : 'bg-blue-50 text-blue-700 border border-blue-200/60'
              }`}
            >
              {badgeType === 'positive' ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : badgeType === 'negative' ? (
                <ArrowDownRight className="w-3 h-3" />
              ) : null}
              {badgeText}
            </span>
          )}
          {subText && (
            <span className="text-[12px] text-slate-500 font-normal">{subText}</span>
          )}
        </div>
      </div>

      {/* Footer Meta Row */}
      {footerText && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-slate-400" />
            {footerText}
          </span>
          <span className="font-mono text-[10px] text-slate-300">CONFIDENTIAL/NSO</span>
        </div>
      )}
    </div>
  );
}
