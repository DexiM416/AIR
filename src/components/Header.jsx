import React from 'react';
import {
  Calendar,
  Bell,
  RefreshCw,
  Menu,
  ChevronRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function Header({
  onToggleSidebar,
  onRefreshData,
  isRefreshing,
  refreshSuccess,
  unreadAlertCount = 2,
  onToggleNotifications,
  activeBreadcrumb = 'Overview',
}) {
  return (
    <header className="h-[72px] bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 mb-0.5">
            <span className="hover:text-slate-600 cursor-pointer">Dashboard</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-600 font-semibold">{activeBreadcrumb}</span>
          </div>

          {/* Heading and Subtitle */}
          <div className="flex items-baseline gap-2">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-none">
              Airfare Market Intelligence
            </h1>
            <span className="hidden md:inline-block text-[12px] text-slate-500 font-normal">
              — Real-time monitoring of India's domestic airfare prices
            </span>
          </div>
        </div>
      </div>

      {/* Right: Date Selector, Notifications, Profile & Primary CTA */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Date Selector Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 text-[12px] font-medium text-slate-700">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Today, Sep 01, 2026</span>
        </div>

        {/* Notifications Button */}
        <button
          onClick={onToggleNotifications}
          className="relative p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors focus:outline-none"
          aria-label="Notifications"
          title="View Intelligence Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
              {unreadAlertCount}
            </span>
          )}
        </button>

        {/* Profile Avatar / Agency Badge */}
        <div
          className="hidden md:flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
          title="Logged in as NSO Policy Analyst"
        >
          <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-slate-900 to-blue-800 text-white flex items-center justify-center text-[11px] font-bold shadow-xs">
            NS
          </div>
          <div className="text-left text-[11px] leading-tight">
            <div className="font-bold text-slate-800 flex items-center gap-1">
              NSO Analyst
              <ShieldCheck className="w-3 h-3 text-blue-600" />
            </div>
            <div className="text-slate-400 text-[10px]">MoSPI Gov Portal</div>
          </div>
        </div>

        {/* Primary CTA: Refresh Data Button */}
        <button
          onClick={onRefreshData}
          disabled={isRefreshing}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 shadow-sm ${
            refreshSuccess
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : isRefreshing
              ? 'bg-blue-500 text-white cursor-wait'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-600/20'
          }`}
        >
          {refreshSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Data Updated</span>
              <span className="sm:hidden">Updated</span>
            </>
          ) : isRefreshing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="hidden sm:inline">Refreshing...</span>
              <span className="sm:hidden">Syncing</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh Data</span>
              <span className="sm:hidden">Refresh</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
