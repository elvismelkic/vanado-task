const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
  {
    name: String,
    required: true,
    trim: true
  },
  { timestamps: true }
);

machineSchema.virtual("failures", {
  ref: "Failure",
  localField: "_id",
  foreignField: "machine"
});

const Machine = mongoose.model("Machine", machineSchema);

module.exports = Machine;
