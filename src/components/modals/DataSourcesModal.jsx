import React from 'react';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  Clock,
  Radio,
  Server,
  X,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { dataQualityData } from '../../data/mockData';

export default function DataSourcesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 relative flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold text-slate-900">
                  Connected Airfare Data Gateways
                </h3>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  5/6 Active
                </span>
              </div>
              <p className="text-[12px] text-slate-500">
                Direct airline portal scrapers and online travel aggregator (OTA) telemetry
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

        {/* Sources Breakdown */}
        <div className="mt-4 space-y-2.5 flex-1 overflow-y-auto pr-1">
          {dataQualityData.sourcesBreakdown.map((src, i) => {
            const isActive = src.status === 'Active';
            return (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-center justify-between hover:bg-white transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-300 text-slate-600'
                    }`}
                  >
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-800">
                      {src.name}
                    </h4>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>Latency: {src.latency}</span>
                      <span>•</span>
                      <span>Extraction: Every 15 min</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <span
                      className={`text-[12px] font-bold ${
                        isActive ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {src.status}
                    </span>
                  </div>
                  {isActive && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      Health: {src.health}%
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-4 p-3 bg-blue-50/80 rounded-xl border border-blue-200/60 text-[12px] text-slate-700 flex items-start gap-2">
          <Database className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p>
            AirFareX maintains redundant multi-hop proxies and distributed headless browser nodes to prevent bot-detection throttles and ensure 100% data authenticity.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px]">
          <span className="text-slate-500">Next Scheduled Cron: in 8 minutes</span>
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
