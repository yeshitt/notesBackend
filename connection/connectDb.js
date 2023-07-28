const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongoose");
  } catch (error) {
    console.log(`Mongoose connection error: ${error}`);
  }
};

module.exports = connectDB;
