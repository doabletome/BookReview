import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export async function auth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization token is required" });
    }

    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export async function isAdmin(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Admin privilages required " });
  }
  next();
}

export async function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;
  console.log(err);
  res
    .status(statusCode)
    .json({ message: err.message || "Internal server Error" });
}
