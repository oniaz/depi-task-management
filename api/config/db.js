const mongoose = require("mongoose");

async function connectDB() {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error Connecting to MongoDB");
    process.exit(1);
  }
}

module.exports = connectDB;
