import React from 'react';
import {
  Calculator,
  BookOpen,
  X,
  PieChart,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

export default function MethodologyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 relative flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold text-slate-900">
                  AirFareX Indexing Methodology (APIx)
                </h3>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                  MoSPI Standard
                </span>
              </div>
              <p className="text-[12px] text-slate-500">
                Mathematical formulation, route weighting, and lead-time normalization
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="mt-4 space-y-4 flex-1 overflow-y-auto pr-1 text-[13px] text-slate-700">
          {/* Section 1: Mathematical Formula */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-[14px]">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              1. Weighted Laspeyres-type Price Index Formula
            </h4>
            <p className="text-slate-600 mt-1 leading-relaxed text-[12px]">
              The Real-Time Airfare Price Index (APIx) at time <em>t</em> is computed as a weighted geometric mean across monitored route sectors <em>r</em> and booking windows <em>w</em>:
            </p>
            <div className="my-3 p-3 bg-white rounded-lg border border-slate-200 text-center font-mono font-bold text-[14px] text-slate-900 shadow-2xs">
              APIx<sub>t</sub> = 100 × ∏<sub>r</sub> [ ( P<sub>r,t</sub> / P<sub>r,0</sub> )<sup>w<sub>r</sub></sup> ]
            </div>
            <p className="text-[11px] text-slate-500">
              Where <strong>P<sub>r,t</sub></strong> is the normalized geometric average airfare on route <em>r</em> at time <em>t</em>, <strong>P<sub>r,0</sub></strong> is the base period price benchmark (Base = 100), and <strong>w<sub>r</sub></strong> is the DGCA passenger traffic weight.
            </p>
          </div>

          {/* Section 2: Weighting Breakdown */}
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-[14px]">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              2. DGCA Route Sector Weights (w<sub>r</sub>)
            </h4>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[12px]">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-800">DEL → BOM:</span>{' '}
                <span className="font-mono text-blue-600 font-bold">28.4%</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-800">DEL → BLR:</span>{' '}
                <span className="font-mono text-blue-600 font-bold">22.1%</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-800">BOM → BLR:</span>{' '}
                <span className="font-mono text-blue-600 font-bold">18.5%</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-800">DEL → CCU:</span>{' '}
                <span className="font-mono text-blue-600 font-bold">12.3%</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-800">MAA → DEL:</span>{' '}
                <span className="font-mono text-blue-600 font-bold">11.2%</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-800">BLR → HYD:</span>{' '}
                <span className="font-mono text-blue-600 font-bold">7.5%</span>
              </div>
            </div>
          </div>

          {/* Section 3: Lead-Time Window Sampling */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-[14px]">
              <span className="w-2 h-2 rounded-full bg-cyan-600" />
              3. Lead-Time Window Sampling Strategy
            </h4>
            <p className="text-[12px] text-slate-600 mt-1">
              To capture yield management dynamics without introducing booking date bias, observation baskets are fixed at 5 uniform departure intervals:
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-mono font-semibold">
              <span className="px-2.5 py-1 bg-white rounded border border-slate-200">
                T+1 (Immediate / Urgent)
              </span>
              <span className="px-2.5 py-1 bg-white rounded border border-slate-200">
                T+7 (Weekly Business)
              </span>
              <span className="px-2.5 py-1 bg-white rounded border border-slate-200">
                T+15 (Mid-term)
              </span>
              <span className="px-2.5 py-1 bg-white rounded border border-slate-200">
                T+30 (Planned Leisure)
              </span>
              <span className="px-2.5 py-1 bg-white rounded border border-slate-200">
                T+45 (Advance Baseline)
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px]">
          <span className="text-slate-500">Document Reference: AFX-METHOD-2026-V1</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
