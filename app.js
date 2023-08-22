const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const postRoutes = require("./routes/post");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(postRoutes);

app.listen(8000);
