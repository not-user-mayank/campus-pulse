import React, { useState, useEffect } from 'react';
import { User, Mail, Award, BookOpen, Phone, Hash, Save, CheckCircle2 } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  phone: string;
  bio: string;
}

const DEFAULT_PROFILE: ProfileData = {
  name: 'Pallipamu Mayank',
  email: 'pallipamu.mayank@srmap.edu.in',
  rollNumber: 'AP26110130043',
  department: 'Computer Science & Engineering',
  phone: '+91 1234567890',
  bio: 'CSE Undergraduate passionate about Full-Stack Web Development, AI, and competitive programming.',
};

export function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [isSaved, setIsSaved] = useState(false);

  // Load persistent profile data on mount
  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    const userEmail = localStorage.getItem('userEmail');

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile((prev) => ({
          ...parsed,
          email: userEmail || parsed.email || prev.email,
        }));
      } catch (e) {
        console.error('Failed to parse saved profile:', e);
      }
    } else if (userEmail) {
      setProfile((prev) => ({ ...prev, email: userEmail }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Student Profile
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your personal details and campus identification info.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6 shadow-xs">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center gap-5 border-b pb-6 border-slate-100 dark:border-slate-700">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{profile.name}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <Mail className="w-3.5 h-3.5" />
              {profile.email}
            </p>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Roll / Register Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="rollNumber"
                value={profile.rollNumber}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Department / Branch
            </label>
            <div className="relative">
              <input
                type="text"
                name="department"
                value={profile.department}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>
        </div>

        {/* Bio Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            About / Bio
          </label>
          <textarea
            name="bio"
            rows={3}
            value={profile.bio}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm transition-colors shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;