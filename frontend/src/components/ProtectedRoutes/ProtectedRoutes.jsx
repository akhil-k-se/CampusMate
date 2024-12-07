import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children ,allowedRoles=[]}) => {
  const { user } = useAuth();

  // Debugging: Log user and roles
  console.log("ProtectedRoute: User is", user);
  console.log("ProtectedRoute: Roles required", allowedRoles);

  if (!user) {
    console.warn("User not authenticated. Redirecting to login...");
    return <Navigate to="/" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.warn(`User role (${user.role}) is not authorized. Redirecting to unauthorized page...`);
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
