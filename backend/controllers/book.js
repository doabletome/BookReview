import Book from "../models/Book.js";
import mongoose from "mongoose";

export async function getAllBooks(req, res, next) {
  try {
    // 1️⃣ Parse & sanitize query params
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const search = (req.query.search || "").trim();
    const skip = (page - 1) * limit;

    // 2️⃣ Build a MongoDB filter object
    //    If `search` is non‑empty, we match titles containing the term, case‑insensitive
    const filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // 3️⃣ Execute both count & find *with the same filter*
    //    - countDocuments(filter) gives the total number of matching books
    //    - find(filter).skip(skip).limit(limit) returns the requested page
    const [total, books] = await Promise.all([
      Book.countDocuments(filter),
      Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ]);

    // 4️⃣ Return a consistent response shape
    res.json({
      total, // total matching items across *all* pages
      page, // current page number
      limit, // page size
      books, // array of Book documents for *this* page
    });
  } catch (err) {
    next(err);
  }
}

export async function getBookById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
}

export async function uploadBook(req, res, next) {
  try {
    // (Assumes auth + isAdmin middleware have already run)
    const { title, author, coverUrl, description } = req.body;
    const newBook = await Book.create({ title, author, coverUrl, description });
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
}
