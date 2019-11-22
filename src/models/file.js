const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: Buffer
    },
    failure: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Failure"
    }
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
