import Review from "../models/Review.js";
import Book from "../models/Book.js";
import mongoose from "mongoose";
export async function getReviewsOnBook(req, res, next) {
  try {
    const { bookId, userId } = req.query;
    const filter = {};

    // If a valid bookId is provided, filter by book
    if (bookId && mongoose.isValidObjectId(bookId)) {
      filter.book = bookId;
    }
    // If a valid userId is provided, filter by user
    if (userId && mongoose.isValidObjectId(userId)) {
      filter.user = userId;
    }

    // Fetch reviews matching either or both filters
    const reviews = await Review.find(filter)
      .populate("user", "name avatarUrl")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    next(err);
  }
}

export async function uploadReview(req, res, next) {
  try {
    const { book: bookId, rating, comment } = req.body;
    if (!mongoose.isValidObjectId(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    // 1. Create the review
    const review = await Review.create({
      book: bookId,
      user: req.user._id,
      rating,
      comment,
    });

    // 2. Recalculate book stats
    const stats = await Review.aggregate([
      { $match: { book: new mongoose.Types.ObjectId(bookId) } },
      {
        $group: {
          _id: "$book",
          avgRating: { $avg: "$rating" },
          cnt: { $sum: 1 },
        },
      },
    ]);

    if (stats.length) {
      await Book.findByIdAndUpdate(bookId, {
        ratingsAvg: stats[0].avgRating,
        ratingsCount: stats[0].cnt,
      });
    }

    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
}
