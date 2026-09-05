import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, CheckCircle, Plus, Search } from 'lucide-react';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
}

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'AI & ML Workshop',
    date: 'Sept 15, 2026',
    time: '10:00 AM - 01:00 PM',
    location: 'ALC Lab 3, SRM AP',
    type: 'Technical',
    description: 'Hands-on session covering foundation models and neural networks.',
  },
  {
    id: '2',
    title: 'HackSRM 2026',
    date: 'Sept 20, 2026',
    time: '02:00 PM - 04:00 PM',
    location: 'Auditorium Block',
    type: 'Technical',
    description: 'The annual 24-hour flagship hackathon at SRM University AP.',
  },
  {
    id: '3',
    title: 'Cultural Night & Band Performance',
    date: 'Sept 28, 2026',
    time: '06:00 PM - 09:00 PM',
    location: 'Open Air Theatre',
    type: 'Cultural',
    description: 'Live musical performances and battle of the campus bands.',
  },
];

export function EventsPage() {
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const saved = localStorage.getItem('registeredEvents');
    if (saved) {
      try {
        setRegisteredIds(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleRegister = (event: EventItem) => {
    let updated: string[];
    if (registeredIds.includes(event.id)) {
      updated = registeredIds.filter((id) => id !== event.id);
    } else {
      updated = [...registeredIds, event.id];
    }
    setRegisteredIds(updated);
    localStorage.setItem('registeredEvents', JSON.stringify(updated));
  };

  const filteredEvents = INITIAL_EVENTS.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || evt.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Campus Events</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Browse, filter, and register for active campus events.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events or workshops..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {['All', 'Technical', 'Cultural'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((evt) => {
          const isRegistered = registeredIds.includes(evt.id);
          return (
            <div
              key={evt.id}
              className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                    {evt.type}
                  </span>
                  {isRegistered && (
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Registered
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{evt.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleRegister(evt)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    isRegistered
                      ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                  }`}
                >
                  {isRegistered ? 'Unregister' : <><Plus className="w-3.5 h-3.5" /> Register Now</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EventsPage;