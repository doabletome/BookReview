import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link
      to={`/books/${book._id}`}
      className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200"
    >
      <img
        src={book.coverUrl || "/placeholder-book.png"}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-slate-800">{book.title}</h3>
        <p className="text-slate-600 text-sm mt-1">{book.author}</p>
        <div className="mt-3 flex items-center space-x-2">
          <span className="text-yellow-500 text-sm">
            {"★".repeat(Math.round(book.ratingsAvg))}
          </span>
          <span className="text-slate-500 text-sm">({book.ratingsCount})</span>
        </div>
      </div>
    </Link>
  );
}
