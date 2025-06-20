import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import PrivateRoute from "./PrivateRoute";
import RequireAdmin from "./RequireAdmin.jsx";
import Home from "../pages/Home";
import BookList from "../pages/BookList";
import BookDetail from "../pages/BookDetail";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddBook from "../pages/AddBook";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Top‑level nav */}
      <Navbar />

      {/* Page container */}
      <div className="container mx-auto px-4 py-6 flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected route */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/books/new"
            element={
              <PrivateRoute>
                <RequireAdmin>
                  <AddBook />
                </RequireAdmin>
              </PrivateRoute>
            }
          />

          {/* Catch‑all → redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
