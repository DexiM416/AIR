import React from 'react';
import {
  X,
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function NotificationDrawer({ isOpen, onClose, onClearAlerts }) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: 'spike',
      title: 'High Fare Anomaly Detected',
      message: 'DEL → BOM short booking window (T+1) jumped to ₹7,450 (+46.1%).',
      time: '12 mins ago',
      icon: AlertTriangle,
      color: 'bg-rose-50 border-rose-200 text-rose-700',
      iconColor: 'bg-rose-500 text-white',
    },
    {
      id: 2,
      type: 'pipeline',
      title: 'Batch Collection Synchronized',
      message: '1,248 quotes processed across IndiGo, Air India, and Akasa with 97.9% completeness.',
      time: '34 mins ago',
      icon: CheckCircle2,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      iconColor: 'bg-blue-600 text-white',
    },
    {
      id: 3,
      type: 'system',
      title: 'Cleartrip Gateway Status',
      message: 'Cleartrip node is in scheduled maintenance window (failover active).',
      time: '1 hour ago',
      icon: Info,
      color: 'bg-slate-50 border-slate-200 text-slate-700',
      iconColor: 'bg-slate-500 text-white',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-slate-900">
                  Intelligence Alerts
                </h3>
                <p className="text-[11px] text-slate-400">Live surveillance feed</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="p-4 space-y-3 flex-1 overflow-y-auto">
            {notifications.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border ${item.color} shadow-2xs`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg ${item.iconColor} flex items-center justify-center shrink-0 shadow-xs mt-0.5`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[13px] text-slate-900">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-600 mt-1 leading-snug">
                        {item.message}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                        <Clock className="w-3 h-3" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/80">
            <button
              onClick={onClearAlerts}
              className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              Mark All Alerts as Read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
