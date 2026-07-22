import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const citizenLoggedIn = localStorage.getItem("citizenLoggedIn") === "true";

  const policeLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("citizenLoggedIn");
    localStorage.removeItem("isLoggedIn");

    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md shadow-lg text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-3 py-3">
        {/* Logo */}

        <Link
          to={policeLoggedIn ? "/dashboard" : citizenLoggedIn ? "/portal" : "/"}
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="SurakshaNet AI"
            className="h-18 w-auto scale-150 origin-left mr-10"
          />

          <div className="leading-tight">
            <h1 className="text-2xl font-bold">SurakshaNet AI</h1>

            <p className="text-sm text-cyan-300">Cyber Crime Intelligence</p>
          </div>
        </Link>

        {/* Menu */}

        <div className="flex items-center gap-8">
          {!citizenLoggedIn && !policeLoggedIn && (
            <>
              <Link to="/" className="hover:text-cyan-300 transition">
                Home
              </Link>

              <Link
                to="/role-selection"
                className="hover:text-cyan-300 transition"
              >
                Get Started
              </Link>
            </>
          )}

          {citizenLoggedIn && (
            <>
              <Link to="/portal" className="hover:text-cyan-300 transition">
                👤 Citizen Portal
              </Link>
            </>
          )}

          {policeLoggedIn && (
            <>
              <div className="bg-cyan-600 px-4 py-2 rounded-full text-sm font-semibold">
                👮 Police Officer
              </div>

              <Link to="/dashboard" className="hover:text-cyan-300 transition">
                Dashboard
              </Link>

              <Link to="/heatmap" className="hover:text-cyan-300 transition">
                Heatmap
              </Link>

              <Link to="/network" className="hover:text-cyan-300 transition">
                Network Graph
              </Link>
            </>
          )}

          {(citizenLoggedIn || policeLoggedIn) && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
            >
              🚪 Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
