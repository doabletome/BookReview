import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/books/booksSlice";
import BookCard from "../components/BookCard";
import useDebounce from "../hooks/useDebounce";

export default function BookList() {
  const dispatch = useDispatch();
  const {
    list: books,
    status,
    total,
    page,
    limit,
  } = useSelector((state) => state.books);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    dispatch(fetchBooks({ page, limit, search: debouncedSearch }));
  }, [dispatch, page, limit, debouncedSearch]);

  const totalPages = Math.ceil(total / limit);
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    dispatch(fetchBooks({ page: newPage, limit, search: debouncedSearch }));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-600">All Books</h1>
        <input
          type="text"
          placeholder="Search books..."
          className="mt-4 sm:mt-0 border border-slate-300 rounded px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handlePageChange(1);
          }}
        />
      </div>

      {status === "loading" && (
        <p className="text-center text-slate-600">Loading…</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border border-slate-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`px-3 py-1 border rounded ${
                p === page
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-slate-300 hover:bg-slate-100"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border border-slate-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
