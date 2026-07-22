import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-6">
      <div className="max-w-5xl w-full">
        <h1 className="text-5xl font-bold text-white text-center">
          🛡 SurakshaNet AI
        </h1>

        <p className="text-center text-gray-300 mt-4 text-lg">
          AI Powered Cyber Fraud Detection & Investigation Platform
        </p>

        <h2 className="text-center text-white text-2xl font-semibold mt-16">
          Choose Your Role
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div
            onClick={() => navigate("/citizen-signup")}
            className="cursor-pointer rounded-3xl bg-white p-8 shadow-xl hover:scale-105 transition"
          >
            <div className="text-6xl">👤</div>

            <h3 className="text-3xl font-bold mt-6">Citizen</h3>

            <p className="text-gray-600 mt-4">
              Analyze suspicious messages, upload screenshots, generate AI
              reports and report cyber fraud.
            </p>

            <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
              Continue as Citizen
            </button>
          </div>

          <div
            onClick={() => navigate("/login")}
            className="cursor-pointer rounded-3xl bg-white p-8 shadow-xl hover:scale-105 transition"
          >
            <div className="text-6xl">👮</div>

            <h3 className="text-3xl font-bold mt-6">Police Officer</h3>

            <p className="text-gray-600 mt-4">
              Access investigation dashboard, heatmaps, fraud networks and
              analytics.
            </p>

            <button className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold">
              Continue as Police
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
