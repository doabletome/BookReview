import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../features/reviews/reviewsSlice";

export default function ReviewForm({ bookId, onNewReview }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.reviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postReview({ bookId, rating, comment })).unwrap();
      setComment("");
      setRating(5);
      onNewReview?.();
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}

      <div className="flex items-center">
        <label className="font-semibold text-slate-800 mr-2">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border border-slate-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Write your review…"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        rows={4}
        className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {status === "loading" ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}
