import React, { useState, useEffect } from 'react';
import { Clock, MapPin, CheckCircle, Plus, Search } from 'lucide-react';

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO format (YYYY-MM-DD) for calendar compatibility
  time: string;
  location: string;
  type: string;
  description: string;
}

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'AI & Web3 Hackathon 2026',
    date: '2026-09-10',
    time: '10:00 AM - 05:00 PM',
    location: 'Auditorium Hall A',
    type: 'Technical',
    description: 'Build futuristic decentralised apps and AI agents in a 24-hour hackathon.',
  },
  {
    id: 'evt-2',
    title: 'Annual Cultural Fest Briefing',
    date: '2026-09-12',
    time: '02:00 PM - 04:00 PM',
    location: 'Main Amphitheatre',
    type: 'Cultural',
    description: 'Information session and team registration for upcoming annual fest.',
  },
  {
    id: 'evt-3',
    title: 'Design Thinking & UI/UX Workshop',
    date: '2026-09-18',
    time: '11:00 AM - 01:00 PM',
    location: 'Design Lab 204',
    type: 'Technical',
    description: 'Learn rapid wireframing and interactive prototyping using modern UI tools.',
  },
];

export function EventsPage() {
  const [registeredEvents, setRegisteredEvents] = useState<EventItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const toggleRegister = (event: EventItem) => {
    const isAlreadyRegistered = registeredEvents.some((e) => e.id === event.id);
    let updatedEvents: EventItem[];

    if (isAlreadyRegistered) {
      updatedEvents = registeredEvents.filter((e) => e.id !== event.id);
    } else {
      updatedEvents = [...registeredEvents, event];
    }

    setRegisteredEvents(updatedEvents);
    localStorage.setItem('registeredEvents', JSON.stringify(updatedEvents));
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
          Discover, register, and join active campus events.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events or clubs..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
          {['All', 'Technical', 'Cultural'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((evt) => {
          const isRegistered = registeredEvents.some((e) => e.id === evt.id);
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
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
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
                      ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/30'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                  }`}
                >
                  {isRegistered ? 'Cancel Registration' : <><Plus className="w-3.5 h-3.5" /> Register Now</>}
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