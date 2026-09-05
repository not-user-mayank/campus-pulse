import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { OrganizerRoute } from './components/OrganizerRoute';

// Page Imports
import StudentDashboard from './pages/StudentDashboard';
import { EventsPage } from './pages/EventsPage';
import { AcademicCalendarPage } from './pages/AcademicCalendarPage';
import { CalendarPage } from './pages/CalendarPage';
import ClubsPage from './pages/ClubsPage';
import CampusPassPage from './pages/CampusPassPage';
import DemandBoardPage from './pages/DemandBoardPage';
import ProfilePage from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import OrganizerPage from './pages/OrganizerPage';
import LoginPage from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/academic-calendar" element={<AcademicCalendarPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/campus-pass" element={<CampusPassPage />} />
          <Route path="/demand-board" element={<DemandBoardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />

          <Route
            path="/organizer"
            element={
              <OrganizerRoute>
                <OrganizerPage />
              </OrganizerRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;