import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });
async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB_URI:", process.env.DB_URI);
    console.log("DB connected"); // mongo DB connected
  } catch (err) {
    console.log("cannot connect to db :", err);
  }
}

export default connectToDb;
