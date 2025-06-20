import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-700"
          >
            BookReview
          </Link>
          <Link to="/books" className="text-slate-700 hover:text-indigo-600">
            Books
          </Link>
          {user?.isAdmin && (
            <Link
              to="/admin/books/new"
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              + Add Book
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-slate-100 transition"
              >
                <img
                  src={user.avatarUrl || "/placeholder-avatar.png"}
                  alt="avatar"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-slate-800">{user.name}</span>
              </button>
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded hover:bg-slate-100 transition text-slate-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
