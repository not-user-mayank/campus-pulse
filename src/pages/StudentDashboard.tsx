import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Flame, 
  ArrowRight, 
  MapPin, 
  Tag 
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface EventItem {
  id: string;
  title: string;
  category: string;
  location: string;
  start_time: string;
}

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    registered: 3,
    attended: 12,
    waitlisted: 1,
    points: 450,
  });

  // Mock featured events fallback (will sync with Supabase events table next)
  const [featuredEvents, setFeaturedEvents] = useState<EventItem[]>([
    {
      id: '1',
      title: 'AI & Web3 Hackathon 2026',
      category: 'Technical',
      location: 'Auditorium Hall A',
      start_time: '2026-09-10T10:00:00Z',
    },
    {
      id: '2',
      title: 'Annual Cultural Fest Briefing',
      category: 'Cultural',
      location: 'Main Amphitheatre',
      start_time: '2026-09-12T14:00:00Z',
    },
  ]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        // Placeholders for real Supabase queries
        // const { data: events } = await supabase.from('events').select('*').limit(2);
        // if (events) setFeaturedEvents(events);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          Welcome back, Student! 👋
        </h1>
        <p className="text-slate-400 mt-1">Here is what's happening around campus today.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-lg">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{stats.registered}</p>
            <p className="text-xs text-slate-400">Registered Events</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{stats.attended}</p>
            <p className="text-xs text-slate-400">Attended Events</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{stats.waitlisted}</p>
            <p className="text-xs text-slate-400">Waitlisted Event</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-lg">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{stats.points} pts</p>
            <p className="text-xs text-slate-400">Activity Score</p>
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            Featured Upcoming Events
          </h2>
          <Link
            to="/student/events"
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 transition"
            >
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 mb-3">
                {event.category}
              </span>
              <h3 className="font-semibold text-lg text-white mb-2">{event.title}</h3>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(event.start_time).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}