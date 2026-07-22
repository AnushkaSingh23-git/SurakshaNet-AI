import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import CitizenPortal from "./pages/CitizenPortal";
import PoliceDashboard from "./pages/PoliceDashboard";
import Heatmap from "./pages/Heatmap";
import Navbar from "./components/Navbar";
import NetworkGraph from "./pages/NetworkGraph";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleSelection from "./pages/RoleSelection";
import CitizenProtectedRoute from "./components/CitizenProtectedRoute";
import PoliceProtectedRoute from "./components/PoliceProtectedRoute";

import CitizenSignup from "./pages/CitizenSignup";
import CitizenLogin from "./pages/CitizenLogin";
import NotFound from "./pages/NotFound";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Navbar />}

      <div className={location.pathname !== "/login" ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/portal"
            element={
              <CitizenProtectedRoute>
                <CitizenPortal />
              </CitizenProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PoliceProtectedRoute>
                <PoliceDashboard />
              </PoliceProtectedRoute>
            }
          />

          <Route
            path="/heatmap"
            element={
              <PoliceProtectedRoute>
                <Heatmap />
              </PoliceProtectedRoute>
            }
          />

          <Route
            path="/network"
            element={
              <PoliceProtectedRoute>
                <NetworkGraph />
              </PoliceProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/role-selection" element={<RoleSelection />} />

          <Route path="/citizen-signup" element={<CitizenSignup />} />

          <Route path="/citizen-login" element={<CitizenLogin />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
