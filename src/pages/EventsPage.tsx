import React, { useState } from 'react';

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  registeredCount: number;
  organizer: string;
}

export const EventsPage = () => {
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Aloha Freshers Fest',
      category: 'Cultural',
      date: '2026-09-11',
      startTime: '17:00',
      endTime: '21:00',
      location: 'University Auditorium',
      capacity: 500,
      registeredCount: 498,
      organizer: 'Directorate of Student Affairs',
    },
    {
      id: '2',
      title: 'AI & Web3 Hackathon Briefing',
      category: 'Tech',
      date: '2026-09-11',
      startTime: '18:00',
      endTime: '20:00',
      location: 'ALC Lab 3',
      capacity: 60,
      registeredCount: 60,
      organizer: 'Dept of CSE',
    },
    {
      id: '3',
      title: 'PhySpark Physics Workshop',
      category: 'Academic',
      date: '2026-09-19',
      startTime: '10:00',
      endTime: '13:00',
      location: 'Science Block Hall B',
      capacity: 100,
      registeredCount: 42,
      organizer: 'Department of Physics',
    },
  ]);

  const handleRegister = (targetEvent: Event) => {
    // Check if already registered
    if (registeredEventIds.includes(targetEvent.id)) return;

    // Time Clash Detection: Same date & overlapping time window
    const registeredEvents = events.filter((e) => registeredEventIds.includes(e.id));
    const hasClash = registeredEvents.some((e) => {
      if (e.date !== targetEvent.date) return false;
      return targetEvent.startTime < e.endTime && targetEvent.endTime > e.startTime;
    });

    if (hasClash) {
      alert(`⚠️ Time Clash Warning: You are already registered for another event on ${targetEvent.date} during this time slot! Double booking is not allowed.`);
      return;
    }

    // Capacity & Waitlist Check
    if (targetEvent.registeredCount >= targetEvent.capacity) {
      alert(`Joined Waitlist for "${targetEvent.title}"! You will receive a notification if a seat opens up.`);
      return;
    }

    // Success Registration
    setRegisteredEventIds([...registeredEventIds, targetEvent.id]);
    setEvents(events.map((e) => (e.id === targetEvent.id ? { ...e, registeredCount: e.registeredCount + 1 } : e)));
    alert(`Successfully registered for "${targetEvent.title}"!`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Campus Events</h1>
        <p className="text-gray-400 text-sm">Discover and register for upcoming university events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const isRegistered = registeredEventIds.includes(event.id);
          const isFull = event.registeredCount >= event.capacity;

          return (
            <div key={event.id} className="p-5 bg-gray-800/90 border border-gray-700 rounded-xl space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {event.category}
                  </span>
                  <span className="text-xs text-gray-400">{event.organizer}</span>
                </div>
                <h2 className="text-lg font-bold text-white">{event.title}</h2>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>📅 {event.date}</p>
                  <p>⏰ {event.startTime} - {event.endTime}</p>
                  <p>📍 {event.location}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Seats: <span className="font-semibold text-white">{event.registeredCount} / {event.capacity}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleRegister(event)}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition ${
                  isRegistered
                    ? 'bg-green-600/20 text-green-400 border border-green-500/30 cursor-default'
                    : isFull
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRegistered ? '✓ Registered' : isFull ? 'Join Waitlist' : 'Register Now'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};