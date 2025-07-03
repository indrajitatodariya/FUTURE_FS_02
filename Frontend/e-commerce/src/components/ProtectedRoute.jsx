import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
