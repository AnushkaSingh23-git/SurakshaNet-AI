import { Navigate } from "react-router-dom";

function PoliceProtectedRoute({ children }) {
  const isPoliceLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isPoliceLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PoliceProtectedRoute;
