import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../features/books/booksSlice";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [description, setDesc] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.isAdmin) return;
    setStatus("loading");
    try {
      await dispatch(
        createBook({ title, author, coverUrl, description })
      ).unwrap();
      navigate("/books");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-5"
    >
      <h1 className="text-3xl font-extrabold text-indigo-600 text-center">
        Add New Book
      </h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <input
        type="url"
        placeholder="Cover Image URL"
        value={coverUrl}
        onChange={(e) => setCoverUrl(e.target.value)}
        className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        rows={4}
        className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
      >
        {status === "loading" ? "Uploading…" : "Create Book"}
      </button>
    </form>
  );
}
