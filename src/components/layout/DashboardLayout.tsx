import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  CalendarDays,
  Users, 
  QrCode, 
  Vote, 
  Bell, 
  User, 
  LogOut 
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Events', path: '/student/events', icon: Calendar },
    { label: 'Academic Calendar', path: '/student/academic-calendar', icon: CalendarDays },
    { label: 'Clubs', path: '/student/clubs', icon: Users },
    { label: 'CampusPass', path: '/student/campus-pass', icon: QrCode },
    { label: 'Demand Board', path: '/student/demand-board', icon: Vote },
    { label: 'Notifications', path: '/student/notifications', icon: Bell },
    { label: 'Profile', path: '/student/profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
              CP
            </div>
            <span className="text-xl font-bold tracking-tight text-white">CampusPulse</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-8 bg-slate-950">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
