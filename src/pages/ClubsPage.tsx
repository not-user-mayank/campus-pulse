import React, { useState } from 'react';
import { Search, Users, Calendar, CheckCircle, Plus } from 'lucide-react';

interface Club {
  id: string;
  name: string;
  category: string;
  membersCount: number;
  upcomingEventsCount: number;
  description: string;
  isFollowing?: boolean;
}

const INITIAL_CLUBS: Club[] = [
  {
    id: '1',
    name: 'Coding Club',
    category: 'Technical',
    membersCount: 1240,
    upcomingEventsCount: 3,
    description: 'A community of developers building software, hosting hackathons, and learning web3 and AI.',
  },
  {
    id: '2',
    name: 'Cultural Society',
    category: 'Cultural',
    membersCount: 2100,
    upcomingEventsCount: 2,
    description: 'Organizing annual campus cultural fests, music performances, and performing arts showcases.',
  },
  {
    id: '3',
    name: 'Creative Guild',
    category: 'Design & Arts',
    membersCount: 850,
    upcomingEventsCount: 1,
    description: 'Bringing together UI/UX designers, visual artists, and animators across campus.',
  },
];

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clubs, setClubs] = useState<Club[]>(INITIAL_CLUBS);

  const toggleFollow = (id: string) => {
    setClubs((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              isFollowing: !c.isFollowing,
              membersCount: c.isFollowing ? c.membersCount - 1 : c.membersCount + 1,
            }
          : c
      )
    );
  };

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Campus Clubs & Communities</h1>
        <p className="text-slate-400 mt-1">Explore campus organizations and follow them for event updates.</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search clubs by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400">
                  {club.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {club.membersCount}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{club.name}</h3>
              <p className="text-xs text-slate-400 mb-4">{club.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800/60">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{club.upcomingEventsCount} Upcoming Events</span>
              </div>

              <button
                onClick={() => toggleFollow(club.id)}
                className={`w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  club.isFollowing
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {club.isFollowing ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" /> Following
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" /> Join Club
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}