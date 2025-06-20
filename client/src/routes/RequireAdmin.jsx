import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const user = useSelector((state) => state.auth.user);
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}
