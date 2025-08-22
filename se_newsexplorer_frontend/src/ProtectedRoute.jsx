import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "./contexts/AppContext";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isLoggedIn } = useContext(AppContext);

  if (!isLoggedIn) {
    // Redirect to homepage if not logged in
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
