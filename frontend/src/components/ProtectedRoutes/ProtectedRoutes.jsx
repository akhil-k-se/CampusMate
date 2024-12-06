import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the auth hook

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  // If still loading, show a loading spinner or nothing
  if (loading) return <div>Loading...</div>;

  // If the user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/student-signup" />;
  }

  // If the user does not have the correct role, redirect to a different page
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" />; // Redirect to homepage or any unauthorized page
  }

  return children;
};

export default ProtectedRoute;
