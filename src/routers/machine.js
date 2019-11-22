const express = require("express");
const Machine = require("../models/machine");
const Failure = require("../models/failure");
const router = new express.Router();

router.get("/machines", async (req, res) => {
  const allMachines = await Machine.find({});

  try {
    res.status(200).send(allMachines);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/machines/:id", async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);

    if (!machine) return res.status(404).send({ error: "Not found" });

    const failures = await Failure.find({ machine: machine._id });

    res.status(200).send({ machine, failures });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/machines", async (req, res) => {
  const machine = new Machine(req.body);

  try {
    await machine.save();
    res.status(201).send(machine);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/machines/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const machine = await Machine.findById(req.params.id);

    if (!machine) return res.status(404).send({ error: "Not found" });

    updates.forEach(update => (machine[update] = req.body[update]));

    await machine.save();

    res.status(200).send(machine);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/machines/:id", async (req, res) => {
  try {
    const machine = await Machine.findByIdAndDelete(req.params.id);

    if (!machine) return res.status(404).send({ error: "Not found" });

    res.status(200).send(machine);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
