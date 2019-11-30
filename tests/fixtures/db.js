const mongoose = require("mongoose");
const Machine = require("../../src/models/machine");
const Failure = require("../../src/models/failure");

const machineOneId = new mongoose.Types.ObjectId();
const machineOne = {
  _id: machineOneId,
  name: "Machine 1"
};

const machineTwoId = new mongoose.Types.ObjectId();
const machineTwo = {
  _id: machineTwoId,
  name: "Machine 2"
};

const wrongId = new mongoose.Types.ObjectId();

const failureOne = {
  _id: new mongoose.Types.ObjectId(),
  name: "Failure 1",
  description: "Description of failure 1",
  fixed: false,
  machine: machineOneId
};

const failureTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: "Failure 2",
  description: "Description of failure 2",
  fixed: true,
  machine: machineOneId
};

const failureThree = {
  _id: new mongoose.Types.ObjectId(),
  name: "Failure 3",
  description: "Description of failure 3",
  fixed: false,
  machine: machineOneId
};

const failureFour = {
  _id: new mongoose.Types.ObjectId(),
  name: "Failure 4",
  description: "Description of failure 4",
  fixed: true,
  machine: machineTwoId
};

const failureFive = {
  _id: new mongoose.Types.ObjectId(),
  name: "Failure 5",
  description: "Description of failure 5",
  fixed: false,
  machine: machineTwoId
};

const setupDatabase = async () => {
  await Failure.deleteMany();
  await Machine.deleteMany();
  await new Machine(machineOne).save();
  await new Machine(machineTwo).save();
  await new Failure(failureOne).save();
  await new Failure(failureTwo).save();
  await new Failure(failureThree).save();
  await new Failure(failureFour).save();
  await new Failure(failureFive).save();
};

module.exports = {
  setupDatabase,
  machineOne,
  machineOneId,
  machineTwo,
  wrongId
};
