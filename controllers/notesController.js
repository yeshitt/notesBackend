const notesModel = require("../models/notesModel");
const mongoose = require("mongoose");

//Get all notes
exports.getNotesController = async (req, res) => {
  try {
    const notes = await notesModel.find({});
    if (!notes) {
      return res.status(200).send({
        success: false,
        message: "No notes found",
      });
    }
    return res.status(200).send({
      success: true,
      Notescount: notes.length,
      message: "All Notes found",
      notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting notes",
      error,
    });
  }
};

//Create a new note
exports.createNoteController = async (req, res) => {
  try {
    const { branch, year, subject, link } = req.body;
    //validation
    if (!branch || !year || !subject || !link) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const newNote = new notesModel({ ...req.body });
    await newNote.save();
    return res.status(200).send({
      success: true,
      message: "Note created successfully",
      newNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating notes",
      error,
    });
  }
};

//Update notes by id
exports.updateNoteController = async (req, res) => {
  try {
    const id = req.params.id; // Extract the id from req.params

    // Ensure the id is a valid ObjectId before proceeding
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid note ID",
      });
    }

    const note = await notesModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!note) {
      return res.status(404).send({
        success: false,
        message: "Note not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while updating notes",
      error,
    });
  }
};

//Get notes by id
exports.getNotesByIdController = async (req, res) => {
  try {
    const id = req.params.id; // Extract the id from req.params

    // Ensure the id is a valid ObjectId before proceeding
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid note ID",
      });
    }

    const note = await notesModel.findById(id);

    if (!note) {
      return res.status(404).send({
        success: false,
        message: "Note not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Note fetched",
      note,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while fetching notes",
      error,
    });
  }
};

//Delete notes by id
exports.deleteNoteController = async (req, res) => {
  try {
    const id = req.params.id; // Extract the id from req.params

    // Ensure the id is a valid ObjectId before proceeding
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid note ID",
      });
    }

    await notesModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting note",
      error,
    });
  }
};
