import { Navigate } from "react-router-dom";
import { auth } from "../services/api";
const ProtectedRoute = ({ children, type = null }) => {
  if (!auth.isAuthenticated()) return <Navigate to="/login" />;
  // If a type is provided, enforce authorization; otherwise allow any authenticated user
  if (type && !auth.isAuthorized(type)) {
    console.log(auth.isAuthorized(type), "not authorized");
    return <Navigate to="/forbidden" />;
  }
  return children;
};

export default ProtectedRoute;
