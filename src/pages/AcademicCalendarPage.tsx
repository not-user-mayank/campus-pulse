import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface RegisteredEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
}

export function AcademicCalendarPage() {
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);

  useEffect(() => {
    // Sync with localStorage key used by EventsPage.tsx
    const saved = localStorage.getItem('registeredEvents');
    if (saved) {
      try {
        setRegisteredEvents(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse registered events', e);
      }
    }
  }, []);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-blue-500" />
          Academic Calendar & Student Schedule
        </h1>
        <p className="text-sm text-slate-400">
          Official institutional schedule alongside your registered campus events.
        </p>
      </div>

      {/* SECTION 1: ALWAYS-VISIBLE REGISTERED EVENTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            My Registered Events ({registeredEvents.length})
          </h2>
        </div>

        {registeredEvents.length === 0 ? (
          <div className="p-6 bg-slate-800/50 border border-dashed border-slate-700 rounded-2xl text-center space-y-1">
            <p className="text-sm font-medium text-slate-300">No registered events found</p>
            <p className="text-xs text-slate-500">Go to the Events tab and click "Register Now" to add workshops here.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {registeredEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-5 bg-slate-800/90 border border-blue-500/30 rounded-2xl space-y-3 relative overflow-hidden"
              >
                <div className="w-1 h-full bg-blue-500 absolute left-0 top-0" />
                <div className="flex justify-between items-center pl-2">
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 rounded-md">
                    Registered
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-400" /> {evt.date}
                  </span>
                </div>
                <div className="pl-2 space-y-1">
                  <h3 className="font-bold text-white text-base">{evt.title}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {evt.location}
                  </p>
                  <p className="text-xs text-slate-500 pt-1">{evt.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: INSTITUTIONAL MONTHLY CALENDAR */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h2 className="text-lg font-bold text-white">Institutional Milestones</h2>
        <div className="p-5 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-blue-900/40 text-blue-400 text-xs font-semibold rounded-lg">
              Academic
            </span>
            <span className="text-xs text-slate-400">Office of Academic Affairs</span>
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Commencement of Classes (Odd Sem AY 2026-27)</h3>
            <p className="text-xs text-slate-400 mt-1">Scheduled Window: 2026-08-31</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicCalendarPage;