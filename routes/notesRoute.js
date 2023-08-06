const express = require("express");
const {
  getNotesController,
  createNoteController,
  getNotesByIdController,
  updateNoteController,
  deleteNoteController,
} = require("../controllers/notesController");

const router = express.Router();

//Post || Create new note
router.post("/create-note", createNoteController);

//Get || Get all notes
router.get("/allnotes", getNotesController);

//Put || Update notes
router.put("/update-note/:id", updateNoteController);

//Get || Get notes by id
router.get("/get-note/:id", getNotesByIdController);

//Delete || Delete notes
router.delete("/delete-note/:id", deleteNoteController);

module.exports = router;
