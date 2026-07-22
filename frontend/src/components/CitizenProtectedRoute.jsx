import { Navigate } from "react-router-dom";

function CitizenProtectedRoute({ children }) {
  const isCitizenLoggedIn = localStorage.getItem("citizenLoggedIn") === "true";

  if (!isCitizenLoggedIn) {
    return <Navigate to="/citizen-login" replace />;
  }

  return children;
}

export default CitizenProtectedRoute;
