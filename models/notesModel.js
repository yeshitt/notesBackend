const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: [true, "Please specify a branch"],
    },
    year: {
      type: Number,
      required: [true, "Please specify a year"],
    },
    subject: {
      type: String,
      required: [true, "Please specify a subject"],
    },
    link: {
      type: String,
      required: [true, "Please specify a branch"],
    },
    contributorId: {
      type: mongoose.Types.ObjectId,
      ref: "Contributor",
      required: [true, "Contributor Id Required"],
    },
  },
  { timestamps: true }
);

const notesModel = mongoose.model("Notes", notesSchema);
module.exports = notesModel;
