import React, { useState, useEffect } from 'react';
import { User, Mail, GraduationCap, Award, Flame, Save, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: 'Alex Rivers',
    email: 'alex.rivers@srmist.edu.in',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    role: 'student',
    points: 450,
    badgesCount: 4,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Profile details updated successfully!');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">User Profile</h1>
        <p className="text-slate-400 mt-1">Manage your account information and view your campus achievements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-indigo-600/20 border-2 border-indigo-500 flex items-center justify-center text-3xl font-bold text-indigo-400">
            {profile.full_name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{profile.full_name}</h2>
            <p className="text-xs text-slate-400">{profile.email}</p>
          </div>

          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold capitalize flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> {profile.role}
          </span>

          <div className="w-full pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-center">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
                <Flame className="w-3.5 h-3.5 text-rose-400" /> Score
              </p>
              <p className="text-base font-bold text-white">{profile.points} pts</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Badges
              </p>
              <p className="text-base font-bold text-white">{profile.badgesCount}</p>
            </div>
          </div>
        </div>

        {/* Profile Details Form */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Account Information</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  disabled
                  value={profile.email}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950/50 border border-slate-800/50 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Department</label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Year of Study</label>
                <select
                  value={profile.year}
                  onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}