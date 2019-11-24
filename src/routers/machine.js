const express = require("express");
const Machine = require("../models/machine");
const Failure = require("../models/failure");
const errorBuilder = require("../utils/errorBuilder");
const { isValidUpdate } = require("../utils/helpers");
const router = new express.Router();

router.get("/machines", async (req, res) => {
  const allMachines = await Machine.find({});

  try {
    res.status(200).send(allMachines);
  } catch (error) {
    errorBuilder.generic(res, error);
  }
});

router.get("/machines/:id", async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);

    if (!machine) return errorBuilder.notFound(res);

    const failures = await Failure.find({ machine: machine._id });

    res.status(200).send({ machine, failures });
  } catch (error) {
    errorBuilder.generic(res, error);
  }
});

router.post("/machines", async (req, res) => {
  const machine = new Machine(req.body);

  try {
    await machine.save();
    res.status(201).send(machine);
  } catch (error) {
    errorBuilder.generic(res, error);
  }
});

router.patch("/machines/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];

  if (!isValidUpdate(updates, allowedUpdates))
    return errorBuilder.invalidUpdates(res);

  try {
    const machine = await Machine.findById(req.params.id);

    if (!machine) return errorBuilder.notFound(res);

    updates.forEach(update => (machine[update] = req.body[update]));

    await machine.save();

    res.status(200).send(machine);
  } catch (error) {
    errorBuilder.generic(res, error);
  }
});

router.delete("/machines/:id", async (req, res) => {
  try {
    const machine = await Machine.findByIdAndDelete(req.params.id);

    if (!machine) return errorBuilder.notFound(res);

    res.status(200).send(machine);
  } catch (error) {
    errorBuilder.generic(res, error);
  }
});

module.exports = router;
