import React from 'react';
import {
  CheckCircle2,
  Loader2,
  RefreshCw,
  Database,
  Filter,
  ShieldAlert,
  Calculator,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';

export default function RefreshSimulationModal({
  isOpen,
  currentStepIndex,
  currentStepMessage,
  isComplete,
  onClose,
}) {
  if (!isOpen) return null;

  const pipelineStages = [
    { id: 1, title: 'Connecting to data sources', icon: Database },
    { id: 2, title: 'Processing airfare observations', icon: Layers },
    { id: 3, title: 'Removing duplicates & normalizing taxes', icon: Filter },
    { id: 4, title: 'Detecting anomalies (Z-Score)', icon: ShieldAlert },
    { id: 5, title: 'Calculating Airfare Price Index (APIx)', icon: Calculator },
    { id: 6, title: 'Dashboard updated & verified', icon: Sparkles },
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500" />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              {isComplete ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <RefreshCw className="w-5 h-5 animate-spin" />
              )}
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-slate-900">
                {isComplete ? 'Data Pipeline Refreshed' : 'Running Ingestion Pipeline'}
              </h3>
              <p className="text-[12px] text-slate-500">
                {isComplete
                  ? 'All stages completed successfully'
                  : 'Automated data collection and index computation'}
              </p>
            </div>
          </div>
          {isComplete && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Steps List */}
        <div className="space-y-2.5 my-5">
          {pipelineStages.map((stage) => {
            const Icon = stage.icon;
            const isStageComplete = currentStepIndex > stage.id || isComplete;
            const isStageActive = currentStepIndex === stage.id && !isComplete;

            return (
              <div
                key={stage.id}
                className={`p-2.5 rounded-xl border text-[13px] flex items-center justify-between transition-all duration-200 ${
                  isStageComplete
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 font-medium'
                    : isStageActive
                    ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold ring-1 ring-blue-500/20'
                    : 'bg-slate-50/50 border-slate-200 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] ${
                      isStageComplete
                        ? 'bg-emerald-600 text-white'
                        : isStageActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span>{stage.title}</span>
                </div>

                <div>
                  {isStageComplete ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isStageActive ? (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Current status description */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[12px] text-slate-600 flex items-center justify-between">
          <span className="truncate pr-2 font-mono text-[11px]">
            {currentStepMessage || 'Initializing microservices...'}
          </span>
          <span className="font-bold text-blue-600 shrink-0">
            {isComplete ? '100%' : `${Math.round((currentStepIndex / 6) * 100)}%`}
          </span>
        </div>

        {/* Complete CTA button */}
        {isComplete && (
          <button
            onClick={onClose}
            className="mt-4 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[13px] transition-colors shadow-sm"
          >
            Done & View Dashboard
          </button>
        )}
      </div>
    </div>
  );
}
