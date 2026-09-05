import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Auto-detect role based on email keyword or domain
    const isOrganizerEmail =
      normalizedEmail.includes('organizer') ||
      normalizedEmail.includes('admin') ||
      normalizedEmail.endsWith('@organizer.srmap.edu.in');

    const role = isOrganizerEmail ? 'organizer' : 'student';

    // Save auth session and detected role
    localStorage.setItem('userEmail', normalizedEmail);
    localStorage.setItem('userRole', role);
    localStorage.setItem('isAuthenticated', 'true');

    // Redirect to the appropriate portal
    if (role === 'organizer') {
      navigate('/organizer');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">CampusPulse Login</h1>
          <p className="text-sm text-slate-400">
            Enter your campus credentials to sign in
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-2 text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Campus Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@srmap.edu.in"
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <span>💡 Tip: Use email with </span>
            <code className="text-blue-400 font-mono">organizer</code>
            <span> for organizer access.</span>
          </p>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;