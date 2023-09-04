const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/auth");

const User = require("../models/user");

// POST /register
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter an vaild email!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail is already exists!");
          }
        });
      }),
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username is too short!")
      .isLength({ max: 10 })
      .withMessage("Username is too long!")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Username is already exists!");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Passowrd is too short!"),
  ],
  authController.register
);

module.exports = router;
