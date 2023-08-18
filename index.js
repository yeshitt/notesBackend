const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./connection/connectDb");
const authRoute = require("./routes/authRoute");
const notesRoute = require("./routes/notesRoute");
const authMiddleware = require('./middleware/auth')
//configure dotenv
dotenv.config();

//connecting to database
connectDB();

//creating app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/notes",authMiddleware, notesRoute);

//Listening app
PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
