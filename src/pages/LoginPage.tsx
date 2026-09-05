import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Lock } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'student' | 'organizer'>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save selected role to local storage for persistent access
    localStorage.setItem('userRole', role);
    localStorage.setItem('isAuthenticated', 'true');

    if (role === 'organizer') {
      navigate('/organizer');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full space-y-6 shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">CampusPulse Login</h1>
          <p className="text-sm text-slate-400">Select your account type to proceed</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-3 p-1 bg-slate-900 rounded-xl">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              role === 'student'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('organizer')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              role === 'organizer'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Organizer
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Campus Email</label>
            <input
              type="email"
              required
              placeholder={role === 'organizer' ? 'organizer@srmap.edu.in' : 'student@srmap.edu.in'}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20"
          >
            Login as {role === 'organizer' ? 'Organizer' : 'Student'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;