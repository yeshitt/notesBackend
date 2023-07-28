const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//configure dotenv
dotenv.config();

//creating app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//Listening app
PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});