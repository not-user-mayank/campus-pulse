import React, { useState } from 'react';
import { Bell, CheckCircle2, Clock, Info, AlertTriangle, Trash2 } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'HackSRM 2026 Registration Open',
      message: 'Registrations are now live for HackSRM 2026. Secure your team spot early!',
      timestamp: '10 mins ago',
      type: 'info',
      read: false,
    },
    {
      id: '2',
      title: 'Mid-Semester Exam Timetable',
      message: 'The official mid-semester timetable has been published on the Academic Portal.',
      timestamp: '2 hours ago',
      type: 'warning',
      read: false,
    },
    {
      id: '3',
      title: 'Campus Pass Approved',
      message: 'Your gate pass request for weekend exit has been approved by the warden.',
      timestamp: '1 day ago',
      type: 'success',
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getTypeIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Notifications
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Stay updated with campus alerts, event updates, and pass approvals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Mark all as read
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button
            onClick={clearAll}
            className="text-xs font-medium text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear all
          </button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <Bell className="w-10 h-10 mx-auto text-slate-400 mb-3 opacity-50" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">All caught up!</p>
          <p className="text-xs text-slate-500 mt-1">You have no unread notifications right now.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                item.read
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-75'
                  : 'bg-blue-50/40 dark:bg-slate-800/80 border-blue-200 dark:border-slate-700 shadow-sm'
              }`}
            >
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-slate-100 dark:border-slate-700">
                {getTypeIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {item.title}
                  </h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1 whitespace-nowrap">
                    <Clock className="w-3 h-3" />
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}