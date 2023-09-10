const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const userModel = model("User", userSchema);

module.exports = userModel;
