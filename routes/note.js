const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const noteController = require("../controllers/note");

// GET /notes
router.get("/notes", noteController.getNotes);

// POST /create
router.post(
  "/create",
  [
    body("title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Title is too short!")
      .isLength({ max: 30 })
      .withMessage("Title is too long!"),
    body("content")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Content is too short!"),
  ],
  noteController.createNote
);

// GET /notes/:id
router.get("/notes/:id", noteController.getNote);

// DELETE /delete/:id
router.delete("/delete/:id", noteController.deleteNote);

// GET /edit/:id
router.get("/edit/:id", noteController.getOldNote);

// POST /edit
router.put("/edit", noteController.updateNote);

module.exports = router;
