import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Ticket,
  Compass,
  Bell,
  User,
  Shield,
  LogOut,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export function DashboardLayout() {
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
  const navigate = useNavigate();

  const mainLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Clubs', path: '/clubs', icon: Users },
    { name: 'Campus Pass', path: '/campus-pass', icon: Ticket },
    { name: 'Demand Board', path: '/demand-board', icon: Compass },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] text-slate-300 min-h-screen p-4 flex flex-col justify-between border-r border-slate-800 shrink-0 sticky top-0 h-screen">
        <div className="space-y-6 overflow-y-auto">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 px-3 py-2">
            <h1 className="text-xl font-bold text-blue-500 tracking-tight">CampusPulse</h1>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {mainLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}

            {/* Organizer Section Header & Accordion */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsOrganizerOpen(!isOrganizerOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 shrink-0 text-indigo-400" />
                  <span>Organizer</span>
                </div>
                {isOrganizerOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {/* Sub-links */}
              {isOrganizerOpen && (
                <div className="ml-7 mt-1 space-y-1 border-l-2 border-slate-800 pl-3">
                  <NavLink
                    to="/organizer/board"
                    className={({ isActive }) =>
                      `block py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'text-blue-400 font-bold bg-blue-500/10'
                          : 'text-slate-400 hover:text-white'
                      }`
                    }
                  >
                    Demand Board
                  </NavLink>
                  <NavLink
                    to="/organizer/events"
                    className={({ isActive }) =>
                      `block py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'text-blue-400 font-bold bg-blue-500/10'
                          : 'text-slate-400 hover:text-white'
                      }`
                    }
                  >
                    Manage Events
                  </NavLink>
                  <NavLink
                    to="/organizer/passes"
                    className={({ isActive }) =>
                      `block py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'text-blue-400 font-bold bg-blue-500/10'
                          : 'text-slate-400 hover:text-white'
                      }`
                    }
                  >
                    Approve Passes
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-slate-800 shrink-0">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;