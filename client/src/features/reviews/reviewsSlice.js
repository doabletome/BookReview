import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// Fetch reviews for a given book
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async ({ bookId, userId }) => {
    const { data } = await axios.get("/reviews", {
      params: { bookId, userId },
    });
    return data; // array of reviews
  }
);

// Post a new review
export const postReview = createAsyncThunk(
  "reviews/postReview",
  async ({ bookId, rating, comment }) => {
    const { data } = await axios.post("/reviews", {
      book: bookId,
      rating,
      comment,
    });
    return data;
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearReviews(state) {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        // optimistic: append the new review
        state.list.unshift(action.payload);
      });
  },
});

export const { clearReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
