import React, { useState } from 'react';
import {
  PlaneTakeoff,
  Bot,
  Filter,
  Database,
  Calculator,
  BarChart3,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { pipelineSteps } from '../data/mockData';

export default function DataPipeline() {
  const [selectedStep, setSelectedStep] = useState(null);

  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'PlaneTakeoff':
        return <PlaneTakeoff className="w-5 h-5" />;
      case 'Bot':
        return <Bot className="w-5 h-5" />;
      case 'Filter':
        return <Filter className="w-5 h-5" />;
      case 'Database':
        return <Database className="w-5 h-5" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-xs">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-2">
          <Layers className="w-3.5 h-3.5" />
          End-to-End Architecture
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How AirFareX Works
        </h2>
        <p className="text-[14px] text-slate-500 mt-1">
          From raw multi-source airfare quotations to actionable inflation intelligence
        </p>
      </div>

      {/* 6-Step Flow Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 relative">
        {pipelineSteps.map((step, idx) => {
          const isSelected = selectedStep === step.step;
          const isLast = idx === pipelineSteps.length - 1;

          return (
            <div key={step.step} className="flex flex-col relative group">
              {/* Step Card */}
              <div
                onClick={() => setSelectedStep(isSelected ? null : step.step)}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-full ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-sm'
                    : 'bg-slate-50/60 hover:bg-white hover:border-slate-300 border-slate-200/80 shadow-2xs'
                }`}
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-[11px] font-bold flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      {getStepIcon(step.icon)}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
                    {step.title}
                  </h4>
                  <div className="text-[11px] font-semibold text-blue-600 mt-0.5">
                    {step.subtitle}
                  </div>

                  {/* Details Bullet Points */}
                  <ul className="mt-2.5 space-y-1 text-[11px] text-slate-600">
                    {step.details.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-tight">
                        <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Badge at Bottom */}
                <div className="mt-4 pt-2.5 border-t border-slate-200/60">
                  <span className="inline-block w-full text-center text-[10px] font-bold text-slate-700 bg-white border border-slate-200 py-0.5 rounded shadow-2xs font-mono">
                    {step.badge}
                  </span>
                </div>
              </div>

              {/* Connecting Desktop Arrow */}
              {!isLast && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-slate-100 border border-slate-300 items-center justify-center text-slate-500 shadow-2xs">
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Workflow Banner Summary */}
      <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[13px] font-bold">
              Automated Microservices Pipeline • High-Cadence Engine
            </div>
            <div className="text-[11px] text-slate-400">
              Multi-Source Airfare → Cleansing & Deduplication → Laspeyres/Jevons Weighting → Policy Intelligence
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded">
            99.9% Uptime SLA
          </span>
        </div>
      </div>
    </div>
  );
}
