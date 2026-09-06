import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Keep the dashboard routes grouped even when no external layout module is present.
function DashboardLayout() {
  return <Outlet />;
}

// Pages
import EventsPage from './pages/EventsPage';
import CalendarPage from './pages/CalendarPage';
import ClubsPage from './pages/ClubsPage';
import CampusPassPage from './pages/CampusPassPage';
import DemandBoardPage from './pages/DemandBoardPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

function DashboardPage() {
  return <div>Dashboard</div>;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/campus-pass" element={<CampusPassPage />} />
          <Route path="/demand-board" element={<DemandBoardPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Organizer Sub-routes */}
          <Route path="/organizer/board" element={<DemandBoardPage />} />
          <Route path="/organizer/events" element={<EventsPage />} />
          <Route path="/organizer/passes" element={<CampusPassPage />} />
        </Route>

        {/* Redirect Root and Fallback */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;