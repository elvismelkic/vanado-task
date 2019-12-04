const request = require("supertest");
const app = require("../src/app");
const Failure = require("../src/models/failure");
const Machine = require("../src/models/machine");
const {
  setupDatabase,
  machineOneId,
  wrongId,
  failureOne
} = require("./fixtures/db");

beforeEach(setupDatabase);

// POST TESTS
test("Should add new failure to the machine", async () => {
  const response = await request(app)
    .post("/api/failures")
    .send({
      name: "Test Failure Name",
      description: "Test Failure Description",
      fixed: true,
      machine: machineOneId,
      priority: "high"
    })
    .expect(201);

  const failure = await Failure.findById(response.body._id);
  const machine = await Machine.findById(response.body.machine);

  expect(response.body).toMatchObject({
    name: "Test Failure Name",
    description: "Test Failure Description",
    fixed: true,
    priority: "high"
  });
  expect(failure.name).toBe("Test Failure Name");
  expect(machine).not.toBeNull();
});

test("Should add new failure to the machine with just the required fields", async () => {
  const response = await request(app)
    .post("/api/failures")
    .send({
      name: "Test Failure Name",
      machine: machineOneId,
      priority: "low"
    })
    .expect(201);

  const failure = await Failure.findById(response.body._id);
  const machine = await Machine.findById(response.body.machine);

  expect(response.body).toMatchObject({
    name: "Test Failure Name",
    fixed: false,
    priority: "low"
  });
  expect(failure.name).toBe("Test Failure Name");
  expect(machine).not.toBeNull();
});

test("Should return error if adding new failure with empty name", async () => {
  await request(app)
    .post("/api/failures")
    .send({
      name: "",
      description: "Test Failure Description",
      fixed: false,
      machine: machineOneId,
      priority: "high"
    })
    .expect(400);
});

test("Should return error if adding new failure to nonexisting machine", async () => {
  await request(app)
    .post("/api/failures")
    .send({
      name: "Test Failure Name",
      description: "Test Failure Description",
      fixed: false,
      machine: wrongId,
      priority: "high"
    })
    .expect(404);
});

// GET TESTS
test("Should get all failures", async () => {
  const response = await request(app)
    .get("/api/failures")
    .send()
    .expect(200);

  expect(response.body.length).toBe(5);
});

test("Should get a failure by ID", async () => {
  const response = await request(app)
    .get(`/api/failures/${failureOne._id}`)
    .send()
    .expect(200);

  expect(failureOne.name).toBe(response.body.name);
});

test("Should return error if getting a failure by nonexisting ID", async () => {
  const response = await request(app)
    .get(`/api/failures/${wrongId}`)
    .send()
    .expect(404);

  expect(response.body.error).toBe("Not found");
});

test("Should return error if getting a failure by random route (not ID type)", async () => {
  await request(app)
    .get("/api/failures/somerandomeroute")
    .send()
    .expect(400);
});

// UPDATE TESTS
test("Should update failure if failure exists", async () => {
  const response = await request(app)
    .patch(`/api/failures/${failureOne._id}`)
    .send({ name: "Updated Failure Name" })
    .expect(200);

  const failure = await Failure.findById(failureOne._id);
  expect(failure.name).toBe(response.body.name);
  expect(response.body.name).toBe("Updated Failure Name");
});

test("Should return error if updating failure that doesn't exists", async () => {
  const response = await request(app)
    .patch(`/api/failures/${wrongId}`)
    .send({ name: "Updated Failure Name" })
    .expect(404);

  expect(response.body.error).toBe("Not found");
});

test("Should return error if updating failure on random route (not ID type)", async () => {
  await request(app)
    .patch("/api/failures/somerandomroute")
    .send({ name: "Updated Failure Name" })
    .expect(400);
});

test("Should return error if updating failure with invalid values", async () => {
  const response = await request(app)
    .patch(`/api/failures/${failureOne._id}`)
    .send({ name: "" })
    .expect(400);

  expect(response.body.errors.name.kind).toBe("required");
});

test("Should return error if updating failure with nonexisting fields", async () => {
  const response = await request(app)
    .patch(`/api/failures/${failureOne._id}`)
    .send({ responsibleEmployee: "John Smith" })
    .expect(400);

  expect(response.body.error).toBe("Invalid updates");
});

test("Should return error if updating failure to belong to nonexisting machine", async () => {
  const response = await request(app)
    .patch(`/api/failures/${failureOne._id}`)
    .send({ machine: wrongId })
    .expect(400);

  expect(response.body.error).toBe("Invalid updates");
});

// DELETE TESTS
test("Should delete failure if failure exists", async () => {
  await request(app)
    .delete(`/api/failures/${failureOne._id}`)
    .send()
    .expect(200);

  const failure = await Failure.findById(failureOne._id);
  expect(failure).toBeNull();
});

test("Should return error if deleting failure that doesn't exists", async () => {
  const response = await request(app)
    .delete(`/api/failures/${wrongId}`)
    .send()
    .expect(404);

  expect(response.body.error).toBe("Not found");
});

test("Should return error if deleting failure on random route (not ID type)", async () => {
  await request(app)
    .delete("/api/failures/somerandomroute")
    .send()
    .expect(400);
});
