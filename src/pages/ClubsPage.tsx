import React, { useState, useEffect } from 'react';
import { Users, CheckCircle2, UserPlus, ShieldCheck } from 'lucide-react';

interface ClubItem {
  id: string;
  name: string;
  category: string;
  lead: string;
  membersCount: number;
  description: string;
}

const INITIAL_CLUBS: ClubItem[] = [
  {
    id: 'coding-club',
    name: 'Coding Club',
    category: 'Technical',
    lead: 'Alex Johnson',
    membersCount: 142,
    description: 'Fostering competitive programming, hackathons, and open-source projects.',
  },
  {
    id: 'cultural-society',
    name: 'Cultural Society',
    category: 'Cultural',
    lead: 'Priya Sharma',
    membersCount: 210,
    description: 'Organizing flagship music, dance, and theatrical events across campus.',
  },
  {
    id: 'creative-guild',
    name: 'Creative Guild',
    category: 'Design',
    lead: 'Rohan Verma',
    membersCount: 88,
    description: 'A community for UI/UX designers, digital artists, and animators.',
  },
];

export function ClubsPage() {
  const [joinedClubIds, setJoinedClubIds] = useState<string[]>([]);

  // Load persistent memberships on mount
  useEffect(() => {
    const saved = localStorage.getItem('joinedClubs');
    if (saved) {
      try {
        setJoinedClubIds(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved clubs:', e);
      }
    }
  }, []);

  const toggleJoinClub = (clubId: string) => {
    let updated: string[];
    if (joinedClubIds.includes(clubId)) {
      updated = joinedClubIds.filter((id) => id !== clubId);
    } else {
      updated = [...joinedClubIds, clubId];
    }
    setJoinedClubIds(updated);
    localStorage.setItem('joinedClubs', JSON.stringify(updated));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Campus Clubs & Societies
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Discover student clubs and join communities matching your interests.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {INITIAL_CLUBS.map((club) => {
          const isJoined = joinedClubIds.includes(club.id);
          const currentMemberCount = isJoined ? club.membersCount + 1 : club.membersCount;

          return (
            <div
              key={club.id}
              className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                    {club.category}
                  </span>
                  {isJoined && (
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Member
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{club.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {club.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Lead: {club.lead}
                  </span>
                  <span>{currentMemberCount} Members</span>
                </div>

                <button
                  onClick={() => toggleJoinClub(club.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    isJoined
                      ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/30'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                  }`}
                >
                  {isJoined ? (
                    'Leave Club'
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" /> Join Club
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClubsPage;