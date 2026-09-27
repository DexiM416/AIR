import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Map,
  CalendarDays,
  Database,
  Code2,
  Settings,
  Plane,
  Radio,
  X,
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
  lastSyncTime = 'Today, 10:42 AM',
  onOpenDataSources,
  onOpenApiModal,
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'trends', label: 'Airfare Trends', icon: TrendingUp },
    { id: 'routes', label: 'Route Analysis', icon: Map },
    { id: 'leadtime', label: 'Lead-Time Analysis', icon: CalendarDays },
    { id: 'sources', label: 'Data Sources', icon: Database, action: onOpenDataSources },
    { id: 'api', label: 'API Access', icon: Code2, action: onOpenApiModal },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleItemClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      setActiveTab(item.id);
    }
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Fixed Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[250px] bg-white border-r border-slate-200 z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Section: Logo & Branding */}
        <div>
          <div className="h-[72px] px-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-blue-900 flex items-center justify-center shadow-md shadow-blue-900/20 text-white relative overflow-hidden group">
                <Plane className="w-5 h-5 text-blue-400 transform -rotate-12 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-slate-900 animate-ping" />
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-[20px] tracking-tight text-slate-900">
                    AirFare<span className="text-blue-600">X</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200/60 tracking-wider">
                    APIx
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 tracking-tight">
                  India's Airfare Intelligence
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 text-left ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                  {item.id === 'api' && (
                    <span className="ml-auto text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      v1.2
                    </span>
                  )}
                  {item.id === 'sources' && (
                    <span className="ml-auto text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      5/6
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: System Status */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            SYSTEM STATUS
          </div>
          
          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[12px] font-semibold text-slate-800">
              Live Data Pipeline
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Last Sync</span>
            <span className="font-medium text-slate-700">{lastSyncTime}</span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>NSO / MoSPI Node</span>
            <span className="text-blue-600 font-semibold">ONLINE</span>
          </div>
        </div>
      </aside>
    </>
  );
}
