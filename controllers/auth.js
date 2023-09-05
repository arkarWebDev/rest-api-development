const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.register = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed.",
      errorMessages: errors.array(),
    });
  }

  const { email, password, username } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashPass) => {
      return User.create({
        email,
        password: hashPass,
        username,
      });
    })
    .then((result) => {
      res.status(201).json({ message: "User created.", userId: result._id });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Something went wrong." });
    });
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed.",
        errorMessages: errors.array(),
      });
    }
    const { email, password } = req.body;

    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return res.status(401).json({ message: "E-mail not exists." });
    }

    const isMatch = bcrypt.compareSync(password, userDoc.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong user credentials." });
    }

    return res.status(200).json({ message: "Login Success." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};
