import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./atlas-credentials.env" });

// Append "/cinema" to use (and auto-create) a database named "cinema".
const URI = `${process.env.MONGODB_URI}/cinema`;

async function connectDB() {
  await mongoose.connect(URI);
  console.log("Connected to MongoDB (database: cinema)");
}

export default connectDB;
