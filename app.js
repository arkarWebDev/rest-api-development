const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const noteRoutes = require("./routes/note");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(noteRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then((_) => {
    app.listen(8000);
    console.log("Connected to database & running on port:8000");
  })
  .catch((err) => {
    console.log(err);
  });
