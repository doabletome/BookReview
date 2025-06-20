import express from "express";
import dotenv from "dotenv";
import connectDb from "./connection/mongo.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import reviewRouter from "./routes/review.js";
import bookRouter from "./routes/book.js";
import { errorHandler } from "./middleware/auth.js";
import cors from "cors";
dotenv.config();
connectDb();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your React app URL
    credentials: true, // allow cookies, auth headers
  })
);

const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/reviews", reviewRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
