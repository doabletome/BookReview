import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    // 1. Find user & validate password
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // 2. Sign JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // 3. Return token + user
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function register(req, res) {
  try {
    const { name, email, password, avatarUrl } = req.body;

    // 1. Check if email is already in use
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // 2. Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // 3. Create the user with optional avatar
    const user = await User.create({
      name,
      email,
      password: hashed,
      avatarUrl: avatarUrl || "", // fallback to empty string if not provided
    });

    // 4. Respond with user data
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    next(err);
  }
}
