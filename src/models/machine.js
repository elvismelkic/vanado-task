const mongoose = require("mongoose");
const Failure = require("./failure");

const machineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  { timestamps: true }
);

machineSchema.virtual("failures", {
  ref: "Failure",
  localField: "_id",
  foreignField: "machine"
});

machineSchema.pre("remove", async function(next) {
  const machine = this;

  await Failure.deleteMany({ machine: machine._id });

  next();
});

const Machine = mongoose.model("Machine", machineSchema);

module.exports = Machine;
