import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import booksReducer from "./features/books/booksSlice";
import reviewsReducer from "./features/reviews/reviewsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    reviews: reviewsReducer,
  },
});
