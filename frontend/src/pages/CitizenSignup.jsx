import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function CitizenSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem(
      "citizen",
      JSON.stringify(form)
    );

    alert("Account Created Successfully");

    navigate("/citizen-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex justify-center items-center p-6">

      <form
        onSubmit={handleSignup}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center">
          👤 Citizen Sign Up
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Create your SurakshaNet account
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mt-8 border rounded-xl p-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mt-4 border rounded-xl p-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mt-4 border rounded-xl p-3"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full mt-4 border rounded-xl p-3"
          required
        />

        <button
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          Create Account
        </button>

        <p className="text-center mt-6">
          Already have an account?
          <Link
            to="/citizen-login"
            className="text-blue-600 font-semibold ml-2"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default CitizenSignup;