const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require("multer");
const path = require("path");

const noteRoutes = require("./routes/note");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());

const storageConfigure = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "-" + file.originalname);
  },
});

const filterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.json());
app.use(
  multer({ storage: storageConfigure, fileFilter: filterConfigure }).single(
    "cover_image"
  )
);

app.use(noteRoutes);
app.use(authRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then((_) => {
    app.listen(8000);
    console.log("Connected to database & running on port:8000");
  })
  .catch((err) => {
    console.log(err);
  });
