import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/books/booksSlice";
import BookCard from "../components/BookCard";

export default function Home() {
  const dispatch = useDispatch();
  const { list: books, status } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-6">
        Featured Books
      </h1>
      {status === "loading" && (
        <p className="text-center text-slate-600">Loading…</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
