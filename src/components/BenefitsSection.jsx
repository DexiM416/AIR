import React from 'react';
import {
  Zap,
  Layers,
  Timer,
  ShieldCheck,
  Code2,
  CheckCircle,
} from 'lucide-react';
import { benefitItems } from '../data/mockData';

export default function BenefitsSection() {
  const getBenefitIcon = (iconName) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-blue-500" />;
      case 'Timer':
        return <Timer className="w-5 h-5 text-cyan-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-indigo-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Key Operational Benefits
          </h2>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Designed for institutional statistical agencies, economic regulators, and policy researchers
          </p>
        </div>
        <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full w-fit">
          5 Core Capabilities
        </span>
      </div>

      {/* 5 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {benefitItems.map((ben) => (
          <div
            key={ben.id}
            className="p-5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-blue-200 transition-all duration-200 shadow-2xs card-hover-effect flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-xs mb-3.5">
                {getBenefitIcon(ben.icon)}
              </div>
              <h4 className="text-[14px] font-bold text-slate-900 leading-snug">
                {ben.title}
              </h4>
              <p className="text-[12px] text-slate-600 mt-2 leading-relaxed">
                {ben.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Production Validated</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
