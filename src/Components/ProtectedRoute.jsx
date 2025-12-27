import { Navigate } from "react-router-dom";
import { auth } from "../services/api";
const ProtectedRoute = ({ children, type = "customer" }) => {
  // return children;
  if (!auth.isAuthenticated()) return <Navigate to="/login" />;
  else if (!auth.isAuthorized(type)) {
    console.log(auth.isAuthorized(type),"not authorized");
    return <Navigate to="/forbidden" />;
  } else return children;
};

export default ProtectedRoute;
