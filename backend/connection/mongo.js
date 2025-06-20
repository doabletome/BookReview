import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("connection to db Successful");
  } catch (error) {
    console.log("connection to Db failed");
  }
};

export default connectDb;
