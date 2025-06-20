import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Review from "./models/Review.js";
import Book from "./models/Book.js";
import bcrypt from "bcrypt";

import { books } from "./utils/sampledata.js";
dotenv.config();

async function seedDb() {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("Connected to DB");

    //deleting all previous data
    await User.deleteMany({});
    console.log("All user deleted");
    await Review.deleteMany({});
    console.log("All reviews deleted");
    await Book.deleteMany({});
    console.log("All Books deleted");

    const hashpassword = bcrypt.hashSync("adminpass", 10);
    await User.insertOne({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashpassword,
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/023/224/454/non_2x/sticker-style-businessman-or-manager-character-on-gray-background-vector.jpg",
      isAdmin: true,
    });
    console.log("new admin created");
    // adding new books
    await Book.insertMany(books);
    console.log("sample books added");

    mongoose.connection.close();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedDb();
