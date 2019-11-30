const express = require("express");
const Machine = require("../models/machine");
const Failure = require("../models/failure");
const errorBuilder = require("../utils/errorBuilder");
const { isValidUpdate } = require("../utils/helpers");
const router = new express.Router();

router.get("/api/failures", async (req, res) => {
  try {
    const failures = await Failure.find({}).sort({
      fixed: 1,
      updatedAt: 1
    });

    res.status(200).send(failures);
  } catch (error) {
    errorBuilder.generic(res, error);
  }
});

router.get("/api/failures/:id", async (req, res) => {
  try {
    const failure = await Failure.findById(req.params.id);

    if (!failure) return errorBuilder.notFound(res);

    res.status(200).send(failure);
  } catch (error) {
    errorBuilder.generic(res, error);
  }
});

router.post("/api/failures", async (req, res) => {
  machineExists = await Machine.exists({ _id: req.body.machine });

  if (!machineExists) return errorBuilder.notFound(res);

  const failure = new Failure(req.body);

  try {
    await failure.save();
    res.status(201).send(failure);
  } catch (error) {
    errorBuilder.generic(res, error);
  }
});

router.patch("/api/failures/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "fixed", "machine"];

  if (!isValidUpdate(updates, allowedUpdates))
    return errorBuilder.invalidUpdates(res);

  if (req.body.machine) {
    const exists = await Machine.exists({ _id: req.body.machine });

    if (!exists) {
      return errorBuilder.invalidUpdates(res);
    }
  }

  try {
    const failure = await Failure.findById(req.params.id);

    if (!failure) return errorBuilder.notFound(res);

    updates.forEach(update => {
      failure[update] = req.body[update];
    });

    await failure.save();
    res.status(200).send(failure);
  } catch (error) {
    errorBuilder.generic(res, error);
  }
});

router.delete("/api/failures/:id", async (req, res) => {
  try {
    const failure = await Failure.findByIdAndDelete(req.params.id);

    if (!failure) return errorBuilder.notFound(res);

    res.status(200).send(failure);
  } catch (error) {
    errorBuilder.generic(res, error);
  }
});

module.exports = router;
