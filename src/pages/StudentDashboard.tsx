import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';

export function StudentDashboard() {
  const featuredEvents = [
    {
      id: '1',
      title: 'HackSRM 2026',
      category: 'Hackathon',
      date: 'Sept 20, 2026',
      location: 'Auditorium Block',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '2',
      title: 'AI & ML Masterclass',
      category: 'Workshop',
      date: 'Sept 15, 2026',
      location: 'ALC Lab 3',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 text-blue-200 text-sm font-medium mb-2">
          <Sparkles className="w-4 h-4" /> Welcome back, Student!
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Discover Campus Events</h1>
        <p className="text-blue-100 text-sm mt-1">Stay tuned with upcoming tech talks, fests, and workshops.</p>
      </div>

      {/* Featured Events Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Featured & Upcoming Events</h2>
          <Link
            to="/events"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featuredEvents.map((evt) => (
            <Link
              key={evt.id}
              to="/events"
              className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row"
            >
              <img
                src={evt.image}
                alt={evt.title}
                className="w-full sm:w-48 h-36 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-md">
                    {evt.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {evt.title}
                  </h3>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 mt-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;