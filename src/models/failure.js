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
    fixed: {
      type: Boolean,
      required: true,
      default: false
    },
    machine: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Machine"
    },
    priority: {
      type: String,
      enum: ["low", "moderate", "high"],
      default: "moderate",
      required: true
    }
  },
  { timestamps: true }
);

failureSchema.virtual("files", {
  ref: "File",
  localField: "_id",
  foreignField: "failure"
});

const Failure = mongoose.model("Failure", failureSchema);

module.exports = Failure;
