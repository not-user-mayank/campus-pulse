import React, { useState } from 'react';
import { Calendar, BookOpen, Clock, MapPin, AlertCircle } from 'lucide-react';
import { AcademicCalendarPage } from './AcademicCalendarPage';

export function CalendarPage() {
  const [activeTab, setActiveTab] = useState<'personal' | 'academic'>('personal');

  const personalEvents = [
    {
      id: 1,
      title: 'AI & ML Workshop',
      date: 'Sept 15, 2026',
      time: '10:00 AM - 01:00 PM',
      location: 'ALC Lab 3, SRM AP',
      type: 'Workshop',
      status: 'Confirmed',
    },
    {
      id: 2,
      title: 'HackSRM 2026 Briefing',
      date: 'Sept 20, 2026',
      time: '02:00 PM - 04:00 PM',
      location: 'Auditorium Block',
      type: 'Competition',
      status: 'Confirmed',
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Campus Calendars</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Switch between your personal schedule and the official academic timeline.
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'personal'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            My Schedule
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'academic'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Academic Calendar
          </button>
        </div>
      </div>

      {activeTab === 'personal' ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Upcoming Registered Events
          </h2>
          {personalEvents.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <AlertCircle className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-slate-600 dark:text-slate-400 font-medium">No upcoming events</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {personalEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                      {evt.type}
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">
                      {evt.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{evt.title}</h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.date} • {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <AcademicCalendarPage />
      )}
    </div>
  );
}