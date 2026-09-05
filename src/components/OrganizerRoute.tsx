import React from 'react';
import { Navigate } from 'react-router-dom';

export const OrganizerRoute = ({ children }: { children: JSX.Element }) => {
  // Checks if user is logged in as organizer
  const userRole = localStorage.getItem('user_role') || 'student';

  if (userRole !== 'organizer') {
    // Redirects students away from organizer pages to the student dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};