import { Router } from "express";
import { getAllBooks, getBookById, uploadBook } from "../controllers/book.js";
import { auth, isAdmin } from "../middleware/auth.js";
const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);

//only for admin
router.post("/", auth, isAdmin, uploadBook);

export default router;
