const mongoose = require("mongoose");

const failureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: false,
      trim: true
    },
    isFixed: {
      type: Boolean,
      required: true,
      default: false
    },
    machine: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Machine"
    }
  },
  { timestamps: true }
);

const Failure = mongoose.model("Failure", failureSchema);

module.exports = Failure;
