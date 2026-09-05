import ProfilePage from './pages/ProfilePage';
import OrganizerPage from './pages/OrganizerPage';
import ClubsPage from './pages/ClubsPage';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import EventsPage from './pages/EventsPage';
import CampusPassPage from './pages/CampusPassPage';
import AcademicCalendarPage from './pages/AcademicCalendarPage';
import DemandBoardPage from './pages/DemandBoardPage';

const PagePlaceholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
    <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
    <p className="text-slate-400">This module is connected and ready for content.</p>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthenticated / Login Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Student Portal Routes inside Sidebar Layout */}
        <Route
          path="/student/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="clubs" element={<ClubsPage />} />
                <Route path="organizer" element={<OrganizerPage />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="academic-calendar" element={<AcademicCalendarPage />} />
                <Route path="campus-pass" element={<CampusPassPage />} />
                <Route path="demand-board" element={<DemandBoardPage />} />
                <Route path="clubs" element={<PagePlaceholder title="Campus Clubs" />} />
                <Route path="notifications" element={<PagePlaceholder title="Notifications" />} />
                <Route path="profile" element={<PagePlaceholder title="User Profile" />} />
              </Routes>
            </DashboardLayout>
          }
        />

        {/* Organizer Portal Placeholder Route */}
        <Route
          path="/organizer/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<PagePlaceholder title="Organizer Intelligence Dashboard" />} />
              </Routes>
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
