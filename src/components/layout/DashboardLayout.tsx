import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Ticket,
  Lightbulb,
  Bell,
  User,
  LogOut,
  ShieldAlert
} from 'lucide-react';

export function DashboardLayout() {
  const location = useLocation();

  // Navigation Links matching paths in App.tsx
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Clubs', path: '/clubs', icon: Users },
    { name: 'Campus Pass', path: '/campus-pass', icon: Ticket },
    { name: 'Demand Board', path: '/demand-board', icon: Lightbulb },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Organizer', path: '/organizer', icon: ShieldAlert },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">CampusPulse</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Page Render Area */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;