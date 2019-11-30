const express = require("express");
require("./db/mongoose");
const machineRouter = require("./routers/machine");
const failureRouter = require("./routers/failure");
const { headerSetter } = require("./utils/helpers");

const app = express();
app.use(express.json());
app.use(headerSetter);
app.use(machineRouter);
app.use(failureRouter);

module.exports = app;
