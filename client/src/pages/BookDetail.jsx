import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById, clearCurrent } from "../features/books/booksSlice";
import { fetchReviews } from "../features/reviews/reviewsSlice";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";

export default function BookDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current: book, status: bookStatus } = useSelector(
    (state) => state.books
  );
  const { list: reviews, status: revStatus } = useSelector(
    (state) => state.reviews
  );
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchBookById(id));
    dispatch(fetchReviews({ bookId: id }));
    return () => {
      dispatch(clearCurrent());
    };
  }, [dispatch, id]);

  if (bookStatus === "loading" || !book)
    return (
      <div className="flex justify-center py-20">
        <p className="text-lg text-slate-600">Loading book…</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:space-x-6 mb-8">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full md:w-48 h-auto object-cover rounded"
        />
        <div className="mt-4 md:mt-0">
          <h1 className="text-4xl font-extrabold text-indigo-600">
            {book.title}
          </h1>
          <p className="text-xl text-slate-700">{book.author}</p>
          <p className="mt-4 text-slate-600">{book.description}</p>
          <p className="mt-2 text-sm text-slate-500">
            Rating:{" "}
            <span className="font-semibold text-indigo-600">
              {book.ratingsAvg.toFixed(1)}
            </span>{" "}
            ({book.ratingsCount})
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-4">Reviews</h2>
      {revStatus === "loading" && (
        <p className="text-slate-600 mb-4">Loading reviews…</p>
      )}
      <div className="space-y-4 mb-6">
        {reviews.map((r) => (
          <ReviewCard key={r._id} review={r} />
        ))}
      </div>

      <div className="mt-6">
        {user ? (
          <div className="bg-slate-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Leave a Review</h3>
            <ReviewForm
              bookId={id}
              onNewReview={() => dispatch(fetchReviews({ bookId: id }))}
            />
          </div>
        ) : (
          <p className="text-slate-600 text-center">
            <a href="/login" className="text-indigo-600 underline">
              Log in
            </a>{" "}
            to leave a review.
          </p>
        )}
      </div>
    </div>
  );
}
