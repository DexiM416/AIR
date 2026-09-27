import React from 'react';
import { Radio, Info, Sparkles, ShieldCheck } from 'lucide-react';
import KPICard from '../components/KPICard';
import IndexTrendChart from '../components/IndexTrendChart';
import RouteInflationChart from '../components/RouteInflationChart';
import LeadTimeChart from '../components/LeadTimeChart';
import FareSpikeAlert from '../components/FareSpikeAlert';
import DataQualityCard from '../components/DataQualityCard';
import AirfareTable from '../components/AirfareTable';
import DataPipeline from '../components/DataPipeline';
import ImpactSection from '../components/ImpactSection';
import BenefitsSection from '../components/BenefitsSection';
import { kpiSummary, kpiSparkline } from '../data/mockData';

export default function Dashboard({
  observations,
  onOpenDataSources,
  onOpenMethodology,
}) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* =========================================================================
          SECTION 1 — OVERVIEW HEADER
          ========================================================================= */}
      <section id="overview-section" className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good Morning, Analyst
            </h2>
            <p className="text-[14px] text-slate-500 mt-0.5">
              Here's what's happening with India's domestic airfare market today.
            </p>
          </div>

          {/* Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[12px] font-bold w-fit shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>LIVE MONITORING</span>
          </div>
        </div>

        {/* Information Banner with very light blue background */}
        <div className="bg-[#EFF6FF] border border-blue-200/80 rounded-xl p-4 flex items-start gap-3 shadow-2xs">
          <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <Info className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 text-[13px] text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-semibold">AirFareX</strong> tracks dynamic airfare prices across major domestic routes and booking windows to generate a high-frequency{' '}
            <strong className="text-blue-900 font-bold">Airfare Price Index (APIx)</strong>.
          </div>
          <button
            onClick={onOpenMethodology}
            className="hidden md:inline-flex text-[11px] font-bold text-blue-700 hover:text-blue-900 underline underline-offset-2 shrink-0"
          >
            Learn Methodology
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — KPI CARDS (4 Columns)
          ========================================================================= */}
      <section id="kpi-section">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: CURRENT APIx */}
          <KPICard
            label="CURRENT AIRFARE INDEX"
            value={kpiSummary.currentApix.toFixed(2)}
            badgeText={`↑ ${kpiSummary.indexChange}%`}
            badgeType="positive"
            subText="vs previous period"
            footerText="Base Period = 100"
            iconType="index"
            sparklineData={kpiSparkline}
            highlight={true}
          />

          {/* Card 2: AVERAGE DOMESTIC FARE */}
          <KPICard
            label="AVERAGE DOMESTIC FARE"
            value={`₹${kpiSummary.averageDomesticFare.toLocaleString('en-IN')}`}
            badgeText={`↑ ₹${kpiSummary.fareChange}`}
            badgeType="positive"
            subText="from last period"
            footerText="Across monitored routes"
            iconType="fare"
          />

          {/* Card 3: ROUTES MONITORED */}
          <KPICard
            label="ROUTES MONITORED"
            value={kpiSummary.routesMonitored}
            subText="Major domestic sectors"
            footerText="Coverage expanding"
            iconType="routes"
          />

          {/* Card 4: PRICE QUOTES PROCESSED */}
          <KPICard
            label="PRICE QUOTES PROCESSED"
            value={kpiSummary.priceQuotesProcessed.toLocaleString('en-IN')}
            subText="Multi-source observations"
            footerText={`${kpiSummary.dataCompleteness}% data completeness`}
            iconType="quotes"
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — AIRFARE PRICE INDEX TREND (Full Width)
          ========================================================================= */}
      <section id="trends-section">
        <IndexTrendChart />
      </section>

      {/* =========================================================================
          SECTION 4 — TWO COLUMN ANALYTICS (Route Inflation + Lead-Time)
          ========================================================================= */}
      <section id="routes-section" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RouteInflationChart />
        <LeadTimeChart />
      </section>

      {/* =========================================================================
          SECTION 5 — ALERT + DATA QUALITY (Two Columns)
          ========================================================================= */}
      <section id="quality-section" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FareSpikeAlert />
        <DataQualityCard onOpenDataSources={onOpenDataSources} />
      </section>

      {/* =========================================================================
          SECTION 6 — LATEST AIRFARE OBSERVATIONS (Full Width Table)
          ========================================================================= */}
      <section id="observations-section">
        <AirfareTable observations={observations} />
      </section>

      {/* =========================================================================
          SECTION 7 — AIRFARE DATA PIPELINE ARCHITECTURE
          ========================================================================= */}
      <section id="pipeline-section">
        <DataPipeline />
      </section>

      {/* =========================================================================
          SECTION 8 — IMPACT OF AIRFAREX
          ========================================================================= */}
      <section id="impact-section">
        <ImpactSection />
      </section>

      {/* =========================================================================
          SECTION 9 — KEY BENEFITS
          ========================================================================= */}
      <section id="benefits-section">
        <BenefitsSection />
      </section>
    </div>
  );
}
