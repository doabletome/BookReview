import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password, avatarUrl })).unwrap();
      navigate("/login");
    } catch {}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-slate-100 p-6 rounded-lg shadow-lg space-y-5"
    >
      <h1 className="text-3xl font-extrabold text-indigo-600 text-center">
        Register
      </h1>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <input
        type="url"
        placeholder="Avatar URL (optional)"
        className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
      >
        {status === "loading" ? "Registering…" : "Register"}
      </button>
      <p className="text-center text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 underline">
          Log In
        </Link>
      </p>
    </form>
  );
}
