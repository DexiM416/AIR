import React from 'react';
import {
  Target,
  Landmark,
  AlertTriangle,
  Clock,
  Network,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { impactItems } from '../data/mockData';

export default function ImpactSection() {
  const getImpactIcon = (iconName) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-5 h-5" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5" />;
      case 'Clock':
        return <Clock className="w-5 h-5" />;
      case 'Network':
        return <Network className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#EFF6FF] to-blue-50/40 rounded-2xl border border-blue-200/70 p-6 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Strategic National Value
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Impact of AirFareX
        </h2>
        <p className="text-[14px] text-slate-600 mt-1">
          Transforming airfare monitoring into high-frequency inflation intelligence
        </p>
      </div>

      {/* 5 Equal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {impactItems.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-5 border border-blue-100/90 shadow-2xs card-hover-effect flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  {getImpactIcon(item.icon)}
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-300">
                  0{idx + 1}
                </span>
              </div>

              <h3 className="text-[15px] font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-[12px] text-slate-600 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                {item.highlight}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Impact Statement */}
      <div className="mt-8 text-center bg-white/80 backdrop-blur-xs py-3.5 px-6 rounded-xl border border-blue-200/60 max-w-3xl mx-auto shadow-2xs">
        <p className="text-[13px] sm:text-[14px] font-bold text-slate-800 tracking-tight">
          "From limited manual price collection to automated, high-frequency airfare intelligence."
        </p>
      </div>
    </div>
  );
}
