import React, { useState, useEffect } from 'react';
import { Bell, CheckCheck, Trash2, Info, AlertTriangle, CheckCircle } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Gate Pass Approved',
    message: 'Your hostel campus out-pass for Sept 10, 2026 has been approved by the warden.',
    time: '2 hours ago',
    type: 'success',
    read: false,
  },
  {
    id: '2',
    title: 'HackSRM 2026 Venue Update',
    message: 'Hackathon opening ceremony has been relocated to Auditorium Hall A.',
    time: '5 hours ago',
    type: 'info',
    read: false,
  },
  {
    id: '3',
    title: 'Mid-Term Exam Schedule Released',
    message: 'Academic Registrar has published the final mid-term examination timetable on the portal.',
    time: '1 day ago',
    type: 'warning',
    read: true,
  },
];

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('notificationsList');
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) {
        setNotifications(INITIAL_NOTIFICATIONS);
      }
    } else {
      setNotifications(INITIAL_NOTIFICATIONS);
    }
  }, []);

  const saveNotifications = (updated: NotificationItem[]) => {
    setNotifications(updated);
    localStorage.setItem('notificationsList', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  const clearAll = () => {
    saveNotifications([]);
  };

  const markSingleRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Notifications
            {unreadCount > 0 && (
              <span className="text-xs px-2 py-0.5 bg-blue-600 text-white rounded-full font-bold">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time updates regarding pass approvals, event alerts, and academic deadlines.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="py-2 px-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={clearAll}
            disabled={notifications.length === 0}
            className="py-2 px-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-medium hover:bg-rose-100 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <Bell className="w-10 h-10 mx-auto text-slate-400 mb-2" />
          <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
            You're all caught up!
          </p>
          <p className="text-xs text-slate-500 mt-1">No new notifications at this time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => {
            const Icon =
              item.type === 'success'
                ? CheckCircle
                : item.type === 'warning'
                ? AlertTriangle
                : Info;

            return (
              <div
                key={item.id}
                onClick={() => markSingleRead(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  item.read
                    ? 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 opacity-75'
                    : 'bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-900/50 shadow-xs ring-1 ring-blue-500/10'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    item.type === 'success'
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : item.type === 'warning'
                      ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                      : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      {item.title}
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                      )}
                    </h3>
                    <span className="text-[11px] text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default NotificationsPage;