const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
  {
    name: String,
    required: true,
    trim: true
  },
  {
    timestamps: true
  }
);

const Machine = mongoose.model("Machine", machineSchema);

module.exports = Machine;
