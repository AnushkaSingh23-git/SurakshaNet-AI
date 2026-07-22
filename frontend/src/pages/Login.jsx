import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", "true");

    if (email.includes("@") && email.includes(".") && password.length >= 6) {
      navigate("/police-dashboard");
    } else {
      alert("Enter a valid email and password");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-black flex items-center justify-center p-6">
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>

        <div className="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-2xl border border-cyan-400/30 rounded-3xl shadow-2xl p-12 w-full max-w-lg">
        <p className="text-center text-cyan-300 text-xs mt-4">
          Powered by AI Fraud Detection Engine v2.0
        </p>
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-cyan-300 tracking-wide drop-shadow-lg">
            🛡 SurakshaNet AI
          </h1>

          <p className="text-cyan-100 mt-3 text-sm tracking-widest uppercase">
            National Cyber Crime Intelligence Platform
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Police Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800/70 border border-cyan-400/40 text-white placeholder-gray-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-500 outline-none transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800/70 border border-cyan-400/40 text-white placeholder-gray-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-500 outline-none transition"
          />

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 transition duration-300"
          >
            Secure Login
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6 text-sm">
          🔒 Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}

export default Login;
