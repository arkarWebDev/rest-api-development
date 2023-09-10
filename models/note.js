const { model, Schema, SchemaType } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    content: {
      type: String,
      required: true,
      minLength: 3,
    },
    cover_image: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const noteModel = model("Note", noteSchema);

module.exports = noteModel;
