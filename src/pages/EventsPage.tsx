import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Users, AlertCircle } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  club: string;
  category: string;
  location: string;
  date: string;
  time: string;
  capacity: number;
  registeredCount: number;
  description: string;
}

const MOCK_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'AI & Web3 Hackathon 2026',
    club: 'Coding Club',
    category: 'Technical',
    location: 'Auditorium Hall A',
    date: '2026-09-10',
    time: '10:00 AM - 05:00 PM',
    capacity: 100,
    registeredCount: 84,
    description: 'Build futuristic decentralised apps and AI agents in a 24-hour hackathon session.',
  },
  {
    id: '2',
    title: 'Annual Cultural Fest Briefing',
    club: 'Cultural Society',
    category: 'Cultural',
    location: 'Main Amphitheatre',
    date: '2026-09-12',
    time: '02:00 PM - 04:00 PM',
    capacity: 200,
    registeredCount: 200,
    description: 'Information session and team registration for upcoming annual campus cultural events.',
  },
  {
    id: '3',
    title: 'Design Thinking & UI/UX Workshop',
    club: 'Creative Guild',
    category: 'Design',
    location: 'Lab 304',
    date: '2026-09-15',
    time: '11:00 AM - 01:00 PM',
    capacity: 50,
    registeredCount: 32,
    description: 'Learn rapid wireframing and interactive prototyping using modern tools.',
  },
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = MOCK_EVENTS.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Campus Events</h1>
        <p className="text-slate-400 mt-1">Discover, register, and join active campus events.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search events or clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {['All', 'Technical', 'Cultural', 'Design'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const isFull = event.registeredCount >= event.capacity;
          return (
            <div
              key={event.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400">
                    {event.category}
                  </span>
                  <span className="text-xs text-slate-400">{event.club}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2">{event.description}</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {event.registeredCount} / {event.capacity} Registered
                    </span>
                  </div>
                </div>

                <button
                  className={`w-full py-2 rounded-lg text-xs font-semibold transition ${
                    isFull
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isFull ? 'Join Waitlist' : 'Register Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}