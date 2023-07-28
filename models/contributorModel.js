const mongoose = require("mongoose");

const contributorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },

  email: { type: String, required: [true, "email is required"], unique: true },
  password: { type: String, required: [true, "password is required"] },
});

const contributorModel = mongoose.model("Contributor", contributorSchema);
module.exports = contributorModel;
