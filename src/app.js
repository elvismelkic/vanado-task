const express = require("express");
require("./db/mongoose");
const machineRouter = require("./routers/machine");

const app = express();
app.use(express.json());
app.use(machineRouter);

module.exports = app;
