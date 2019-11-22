const express = require("express");
const Machine = require("../models/machine");
const Failure = require("../models/failure");
const router = new express.Router();

router.get("/failures", async (req, res) => {
  try {
    const failures = await Failure.find({});

    // TODO: Sort by fixed, then time of entry

    res.status(200).send(failures);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/failures/:id", async (req, res) => {
  try {
    const failure = await Failure.findById(req.params.id);

    if (!failure) return res.status(404).send({ error: "Not found" });

    res.status(200).send(failure);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/failures", async (req, res) => {
  const failure = new Failure(req.body);
  try {
    await failure.save();
    res.status(201).send(failure);
  } catch (error) {
    res.status(400).send();
  }
});

router.patch("/failures/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "isFixed", "machine"];
  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate)
    return res.status(400).send({ error: "Invalid updates!" });

  if (req.body.machine) {
    const exists = await Machine.exists({ _id: req.body.machine });

    if (!exists) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
  }

  try {
    const failure = await Failure.findById(req.params.id);

    updates.forEach(update => {
      failure[update] = req.body[update];
    });

    await failure.save();
    res.status(200).send(failure);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/failures/:id", async (req, res) => {
  try {
    const failure = await Failure.findByIdAndDelete(req.params.id);

    if (!failure) return res.status(404).send({ error: "Not found" });

    res.status(200).send(failure);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
