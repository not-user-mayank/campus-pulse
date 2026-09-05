import React, { useState } from 'react';
import { Plus, Users, Calendar, CheckCircle, QrCode, BarChart2, Clock, MapPin } from 'lucide-react';

interface EventManageItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registeredCount: number;
  checkedInCount: number;
  status: 'Upcoming' | 'Live' | 'Completed';
}

const INITIAL_ORGANIZER_EVENTS: EventManageItem[] = [
  {
    id: '1',
    title: 'AI & Web3 Hackathon 2026',
    date: '2026-09-10',
    time: '10:00 AM - 05:00 PM',
    location: 'Auditorium Hall A',
    capacity: 100,
    registeredCount: 84,
    checkedInCount: 0,
    status: 'Upcoming',
  },
  {
    id: '2',
    title: 'Hands-on Web Dev Bootcamp',
    date: '2026-09-05',
    time: '02:00 PM - 05:00 PM',
    location: 'Lab 202',
    capacity: 60,
    registeredCount: 60,
    checkedInCount: 48,
    status: 'Live',
  },
];

export default function OrganizerPage() {
  const [events, setEvents] = useState<EventManageItem[]>(INITIAL_ORGANIZER_EVENTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState('');
  const [scanSuccess, setScanSuccess] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState(50);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvt: EventManageItem = {
      id: Date.now().toString(),
      title,
      date,
      time,
      location,
      capacity: Number(capacity),
      registeredCount: 0,
      checkedInCount: 0,
      status: 'Upcoming',
    };

    setEvents([newEvt, ...events]);
    setShowCreateModal(false);
    setTitle('');
    setDate('');
    setTime('');
    setLocation('');
  };

  const simulateScan = () => {
    setScanSuccess('Alex Rivers (student@srmist.edu.in) — Checked In Successfully!');
    setEvents((prev) =>
      prev.map((evt) =>
        evt.title === selectedEventTitle
          ? { ...evt, checkedInCount: Math.min(evt.checkedInCount + 1, evt.registeredCount) }
          : evt
      )
    );
    setTimeout(() => setScanSuccess(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Club Organizer Control Center</h1>
          <p className="text-slate-400 mt-1">Manage club events, publish new sessions, and process live attendance.</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm flex items-center gap-2 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create New Event
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-400" /> Managed Events
          </p>
          <p className="text-2xl font-bold text-white">{events.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-400" /> Total Registrations
          </p>
          <p className="text-2xl font-bold text-white">
            {events.reduce((acc, curr) => acc + curr.registeredCount, 0)}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-amber-400" /> Total Attended
          </p>
          <p className="text-2xl font-bold text-white">
            {events.reduce((acc, curr) => acc + curr.checkedInCount, 0)}
          </p>
        </div>
      </div>

      {/* Managed Events List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Your Club Events</h2>

        <div className="space-y-4">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-slate-950 border border-slate-800/80 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      evt.status === 'Live'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-indigo-500/10 text-indigo-400'
                    }`}
                  >
                    {evt.status}
                  </span>
                  <h3 className="text-base font-bold text-white">{evt.title}</h3>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {evt.date} ({evt.time})</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {evt.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 justify-between md:justify-end">
                <div className="text-right text-xs">
                  <p className="text-white font-semibold">{evt.registeredCount} / {evt.capacity} Seats</p>
                  <p className="text-slate-400">{evt.checkedInCount} Checked in</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedEventTitle(evt.title);
                    setShowScannerModal(true);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <QrCode className="w-3.5 h-3.5 text-indigo-400" /> Scan QR Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4">
            <h2 className="text-xl font-bold text-white">Create New Campus Event</h2>
            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Deep Learning & Neural Nets Workshop"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 text-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="10:00 AM - 01:00 PM"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Seminar Hall 2"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Scanner Simulation Modal */}
      {showScannerModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-sm w-full space-y-4 text-center">
            <h2 className="text-lg font-bold text-white">QR Attendance Scanner</h2>
            <p className="text-xs text-slate-400">{selectedEventTitle}</p>

            <div className="border-2 border-dashed border-indigo-500/50 bg-slate-950 p-6 rounded-xl flex flex-col items-center justify-center space-y-3">
              <QrCode className="w-16 h-16 text-indigo-400 animate-pulse" />
              <p className="text-xs text-slate-400">Position student's CampusPass QR code in front of camera</p>
            </div>

            {scanSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-lg text-xs font-medium">
                {scanSuccess}
              </div>
            )}

            <div className="space-y-2 pt-2">
              <button
                onClick={simulateScan}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition"
              >
                Simulate QR Check-In Scan
              </button>
              <button
                onClick={() => setShowScannerModal(false)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
              >
                Close Scanner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}