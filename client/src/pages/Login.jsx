import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate(from, { replace: true });
    } catch {}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-slate-100 p-6 rounded-lg shadow-lg space-y-5"
    >
      <h1 className="text-3xl font-extrabold text-indigo-600 text-center">
        Log In
      </h1>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
      >
        {status === "loading" ? "Logging in…" : "Log In"}
      </button>
      <p className="text-center text-slate-600">
        Don’t have an account?{" "}
        <Link to="/register" className="text-indigo-600 underline">
          Register
        </Link>
      </p>
    </form>
  );
}
