const { validationResult } = require("express-validator");

exports.getNotes = (req, res, next) => {};

exports.createNote = (req, res, next) => {
  const { title, content } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed.",
      errorMessages: errors.array(),
    });
  }
  res.status(201).json({
    message: "Note created.",
    data: {
      title,
      content,
    },
  });
};
