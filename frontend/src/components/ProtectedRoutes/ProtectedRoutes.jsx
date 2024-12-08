import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async() => {
      try {
        setLoading(true);
        const response = await axios.get("https://campus-mate.onrender.com/getUserRole", { withCredentials: true });
        const role = response?.data?.role;
        console.log("Fetched user role:", role);
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole(null); // Handle error scenario (e.g., unauthorized access)
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  // Wait until the user role is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if user role is not fetched or unauthorized
  if (!userRole) {
    console.warn("User role not found or not authenticated. Redirecting to login...");
    return <Navigate to="/" />;
  }

  // Check if the role is not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    console.warn(`User role (${userRole}) is not authorized. Redirecting to unauthorized page...`);
    return <Navigate to="/" />;
  }

  // Render the protected component if role is authorized
  return children;
};

export default ProtectedRoute;
