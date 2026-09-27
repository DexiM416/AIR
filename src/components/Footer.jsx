import React from 'react';
import { Plane, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer({
  onOpenMethodology,
  onOpenApiModal,
  onOpenDataSources,
}) {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Branding */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <Plane className="w-4 h-4 text-blue-400 transform -rotate-12" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-extrabold text-[16px] text-slate-900">
                AirFare<span className="text-blue-600">X</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 border-l border-slate-300 pl-2">
                India's Real-Time Airfare Price Index
              </span>
            </div>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Prototype developed for Smart India Hackathon / MoSPI & NSO Econometric Innovation
            </p>
          </div>
        </div>

        {/* Right Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[12px] text-slate-600">
          <div className="flex items-center gap-4 font-medium">
            <button
              onClick={onOpenMethodology}
              className="hover:text-blue-600 transition-colors"
            >
              Methodology
            </button>
            <button
              onClick={onOpenApiModal}
              className="hover:text-blue-600 transition-colors"
            >
              API Explorer
            </button>
            <button
              onClick={onOpenDataSources}
              className="hover:text-blue-600 transition-colors"
            >
              Data Sources
            </button>
            <button
              onClick={onOpenMethodology}
              className="hover:text-blue-600 transition-colors"
            >
              Documentation
            </button>
          </div>

          <div className="text-slate-400 text-[11px] font-mono border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4">
            © 2026 AirFareX • All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
