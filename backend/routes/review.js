import { Router } from "express";
import { getReviewsOnBook, uploadReview } from "../controllers/review.js";
import { auth } from "../middleware/auth.js";
const router = Router();

// GET /api/reviews?bookId=&page=&limit=
router.get("/", getReviewsOnBook);

// POST /api/reviews  (authenticated)
router.post("/", auth, uploadReview);

export default router;
