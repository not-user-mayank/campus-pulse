import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  type?: string;
  description?: string;
}

const INSTITUTIONAL_EVENTS = [
  {
    id: 'inst-1',
    title: 'Commencement of Classes (Odd Sem AY 2026-27)',
    date: '2026-08-31',
    type: 'Academic',
    organizer: 'Office of Academic Affairs',
  },
  {
    id: 'inst-2',
    title: 'Midterm Examinations / Assessments',
    date: '2026-10-05',
    type: 'Exam',
    organizer: 'Controller of Examinations',
  },
  {
    id: 'inst-3',
    title: 'Mahatma Gandhi Jayanthi',
    date: '2026-10-02',
    type: 'Holiday',
    organizer: 'State Government / SRM-AP',
  },
];

export function AcademicCalendarPage() {
  const [registeredEvents, setRegisteredEvents] = useState<EventItem[]>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    const saved = localStorage.getItem('registeredEvents');
    if (saved) {
      try {
        setRegisteredEvents(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse registered events', e);
      }
    }
  }, []);

  const allCalendarItems = [
    ...registeredEvents.map((e) => ({
      ...e,
      isRegisteredStudentEvent: true,
      organizer: 'Registered Student Event',
    })),
    ...INSTITUTIONAL_EVENTS.map((e) => ({
      ...e,
      isRegisteredStudentEvent: false,
    })),
  ];

  const filteredItems = allCalendarItems.filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'Registered') return item.isRegisteredStudentEvent;
    if (filter === 'Academic') return item.type === 'Academic';
    if (filter === 'Exam') return item.type === 'Exam';
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Academic Calendar & My Schedule
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Official institutional schedule, examination dates, and your registered campus events.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl w-fit">
        {['All', 'Registered', 'Academic', 'Exam'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === tab
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab === 'Registered' ? `My Events (${registeredEvents.length})` : tab}
          </button>
        ))}
      </div>

      {/* Schedule Items List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400">No events match the selected filter.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-5 bg-white dark:bg-slate-800 rounded-2xl border transition-all ${
                item.isRegisteredStudentEvent
                  ? 'border-blue-500/50 dark:border-blue-500/40 bg-blue-50/10'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-md ${
                      item.isRegisteredStudentEvent
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}
                  >
                    {item.isRegisteredStudentEvent ? 'My Event' : item.type}
                  </span>
                  <span className="text-xs text-slate-400">{item.organizer}</span>
                </div>

                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-500" /> {item.date}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-base">{item.title}</h3>

              {(item.location || item.time) && (
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-4">
                  {item.time && <span>Time: {item.time}</span>}
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {item.location}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AcademicCalendarPage;