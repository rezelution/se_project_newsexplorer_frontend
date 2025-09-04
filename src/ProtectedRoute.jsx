import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "./contexts/AppContext";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isLoggedIn, userLoading } = useContext(AppContext);

  if (userLoading) {
    return null; // or a spinner component while loading auth state
  }

  if (!isLoggedIn) {
    // Redirect to homepage if not logged in
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
