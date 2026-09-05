import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Tag } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
}

export function AcademicCalendarPage() {
  const [registeredEvents, setRegisteredEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('registeredEvents');
    if (saved) {
      try {
        setRegisteredEvents(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Campus Schedule & Registered Events
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          View all your registered workshops, hackathons, and upcoming campus sessions.
        </p>
      </div>

      {registeredEvents.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 space-y-2">
          <CalendarIcon className="w-10 h-10 mx-auto text-slate-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white text-base">No Registered Events Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Head over to the <strong>Events</strong> page and click "Register Now" on any workshop or hackathon to populate your calendar.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {registeredEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-blue-900/50 shadow-xs space-y-3 relative overflow-hidden"
            >
              <div className="w-1.5 h-full bg-blue-600 absolute left-0 top-0" />
              
              <div className="flex items-center justify-between pl-2">
                <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-md">
                  {evt.type}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {evt.date}
                </span>
              </div>

              <div className="pl-2 space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{evt.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" /> {evt.location}
                </p>
                <p className="text-xs text-slate-400 pt-1">{evt.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AcademicCalendarPage;