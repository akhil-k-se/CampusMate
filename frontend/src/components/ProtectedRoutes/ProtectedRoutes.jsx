import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children ,roles}) => {
  const { user } = useAuth();

  // Debugging: Log user and roles
  console.log("ProtectedRoute: User is", user);
  console.log("ProtectedRoute: Roles required", roles);

  if (!user) {
    console.warn("User not authenticated. Redirecting to login...");
    return <Navigate to="/" />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    console.warn(`User role (${user.role}) is not authorized. Redirecting to unauthorized page...`);
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
