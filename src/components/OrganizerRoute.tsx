import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface OrganizerRouteProps {
  children: React.ReactNode;
}

export function OrganizerRoute({ children }: OrganizerRouteProps) {
  const location = useLocation();

  // Check saved user role from localStorage or auth state
  const userRole = localStorage.getItem('userRole') || 'student';
  const isOrganizer = userRole === 'organizer' || userRole === 'admin';

  if (!isOrganizer) {
    // Redirect non-organizers to dashboard or login
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default OrganizerRoute;