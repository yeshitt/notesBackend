const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./connection/connectDb");
const userRoute = require("./routes/userRoute");
const contributorRoute = require("./routes/contributorRoute");
const notesRoute = require("./routes/notesRoute");
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
app.use("/api/v1/user", userRoute);
app.use("/api/v1/contributor", contributorRoute);
app.use("/api/v1/notes", notesRoute);

//Listening app
PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
