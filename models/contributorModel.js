const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const contributorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already occupied"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "Email is already registered"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      minLength: [8, "Minimum Length of password is 8."],
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

contributorSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const contributorModel = mongoose.model("Contributor", contributorSchema);
module.exports = contributorModel;
