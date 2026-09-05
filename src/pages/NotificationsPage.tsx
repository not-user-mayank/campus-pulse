import React from 'react';

export const NotificationsPage = () => {
  const notifications = [
    {
      id: '1',
      title: '⏰ Upcoming Event Reminder (Within 24 Hours)',
      message: 'Aloha Freshers Fest is starting tomorrow! Make sure to have your CampusPass QR ready for smooth entry at the Auditorium.',
      type: 'urgent',
      time: '2 hours ago',
    },
    {
      id: '2',
      title: '⚠️ Schedule Conflict Alert',
      message: 'You have two events scheduled on the same date. Please review your registration to avoid missing out.',
      type: 'warning',
      time: '5 hours ago',
    },
    {
      id: '3',
      title: '✅ Registration Confirmed',
      message: 'Your registration for PhySpark Physics Workshop has been confirmed.',
      type: 'info',
      time: '1 day ago',
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        <p className="text-gray-400 text-sm">Event reminders, schedule warnings, and campus updates</p>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl border ${
              n.type === 'urgent'
                ? 'border-amber-500/50 bg-amber-500/10'
                : n.type === 'warning'
                ? 'border-red-500/50 bg-red-500/10'
                : 'border-gray-700 bg-gray-800/90'
            }`}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-white text-base">{n.title}</h3>
              <span className="text-xs text-gray-400">{n.time}</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};