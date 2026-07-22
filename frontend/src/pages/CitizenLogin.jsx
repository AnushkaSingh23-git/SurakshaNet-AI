import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function CitizenLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("citizen"));

    if (user && user.email === email && user.password === password) {
      localStorage.setItem("citizenLoggedIn", "true");

      alert("Login Successful");

      navigate("/portal");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex justify-center items-center p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center">👤 Citizen Login</h1>

        <p className="text-center text-gray-500 mt-2">
          Login to access Citizen Portal
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full mt-8 border rounded-xl p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 border rounded-xl p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
          Login
        </button>

        <p className="text-center mt-6">
          Don't have an account?
          <Link
            to="/citizen-signup"
            className="text-blue-600 font-semibold ml-2"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default CitizenLogin;
