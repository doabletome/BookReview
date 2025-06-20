import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// Thunk to fetch paginated books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ page = 1, limit = 10, search = "" }) => {
    const { data } = await axios.get("/books", {
      params: { page, limit, search },
    });
    return data; // { total, page, limit, books }
  }
);

// Thunk to fetch a single book
export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id) => {
    const { data } = await axios.get(`/books/${id}`);
    return data;
  }
);

//thunk to upload a new book (Admin only)
export const createBook = createAsyncThunk(
  "books/createBook",
  async ({ title, author, coverUrl, description }, thunkAPI) => {
    const { data } = await axios.post("/books", {
      title,
      author,
      coverUrl,
      description,
    });
    return data; // the newly created book
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    total: 0,
    page: 1,
    limit: 10,
    status: "idle",
    error: null,
    current: null, // single book detail
  },
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createBook: handle pending, fulfilled, rejected
      .addCase(createBook.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createBook.fulfilled, (state, { payload }) => {
        state.createStatus = "succeeded";
        // Optionally prepend to list so the new book appears immediately
        state.list.unshift(payload);
      })
      .addCase(createBook.rejected, (state, { error }) => {
        state.createStatus = "failed";
        state.createError = error.message;
      })

      // fetchBooks
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.books;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetchBookById
      .addCase(fetchBookById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCurrent } = booksSlice.actions;
export default booksSlice.reducer;
