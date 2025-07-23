import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import React from 'react';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
