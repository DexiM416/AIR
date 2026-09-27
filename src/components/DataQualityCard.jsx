import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Database,
  Filter,
  AlertOctagon,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { dataQualityData } from '../data/mockData';

export default function DataQualityCard({ onOpenDataSources }) {
  const {
    sourcesActive,
    quotesCollected,
    duplicatesRemoved,
    outliersFlagged,
    completeness,
    status,
    statusDescription,
  } = dataQualityData;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">
                Data Quality Monitor
              </h3>
              <p className="text-[12px] text-slate-500 mt-0.5">
                Multi-source pipeline ingestion integrity
              </p>
            </div>
          </div>
          <button
            onClick={onOpenDataSources}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
          >
            <span>View Sources</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* 5 Quality Metrics Grid */}
        <div className="mt-4 space-y-3.5">
          {/* Metric 1: Sources Active */}
          <div>
            <div className="flex justify-between items-center text-[12px] mb-1">
              <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-slate-400" />
                Sources Active
              </span>
              <span className="font-extrabold text-slate-800 font-mono">
                {sourcesActive.current} / {sourcesActive.total} ({sourcesActive.percentage.toFixed(0)}%)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${sourcesActive.percentage}%` }}
              />
            </div>
          </div>

          {/* Metric 2 & 3 & 4: Sub-metrics row */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Quotes Collected
              </div>
              <div className="text-[16px] font-extrabold text-slate-800 mt-0.5">
                {quotesCollected.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Duplicates Removed
              </div>
              <div className="text-[16px] font-extrabold text-amber-600 mt-0.5">
                {duplicatesRemoved}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Outliers Flagged
              </div>
              <div className="text-[16px] font-extrabold text-rose-600 mt-0.5">
                {outliersFlagged}
              </div>
            </div>
          </div>

          {/* Metric 5: Data Completeness */}
          <div className="pt-1">
            <div className="flex justify-between items-center text-[12px] mb-1">
              <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Data Completeness
              </span>
              <span className="font-extrabold text-emerald-700 font-mono">
                {completeness}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Banner */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/70">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-[12px] font-bold text-emerald-900">
            Status: Data Quality: {status}
          </span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
          NSO Compliant
        </span>
      </div>
    </div>
  );
}
