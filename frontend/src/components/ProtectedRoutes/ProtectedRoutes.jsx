import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loader/Loading";

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
        setTimeout(2000,setUserRole(role));
      } catch (error) {
        console.error("Error fetching user role:", error);
        setTimeout(2000,setUserRole(null)); // Handle error scenario (e.g., unauthorized access)
      } finally {
        setTimeout(3000,setLoading(false));
      }
    };

    fetchUserRole();
  }, []);

  // Wait until the user role is fetched
  if (loading) {
    return <div><Loading loadingTime={2000}/></div>;
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
