const mongoose = require("mongoose");


const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDb;
