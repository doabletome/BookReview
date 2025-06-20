import { Router } from "express";
import { getUserById, updateUser } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/:id", auth, getUserById);

router.put("/:id", auth, updateUser);

export default router;
