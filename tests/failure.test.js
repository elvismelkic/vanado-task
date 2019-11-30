const request = require("supertest");
const app = require("../src/app");
const Failure = require("../src/models/failure");
const Machine = require("../src/models/machine");
const { setupDatabase, machineOneId, wrongId } = require("./fixtures/db");

beforeEach(setupDatabase);

// POST TESTS
test("Should add new failure to the machine", async () => {
  const response = await request(app)
    .post("/failures")
    .send({
      name: "Test Failure Name",
      description: "Test Failure Description",
      fixed: true,
      machine: machineOneId
    })
    .expect(201);

  const failure = await Failure.findById(response.body._id);
  const machine = await Machine.findById(response.body.machine);

  expect(response.body).toMatchObject({
    name: "Test Failure Name",
    description: "Test Failure Description",
    fixed: true
  });
  expect(failure.name).toBe("Test Failure Name");
  expect(machine).not.toBeNull();
});

test("Should add new failure to the machine with just the required fields", async () => {
  const response = await request(app)
    .post("/failures")
    .send({
      name: "Test Failure Name",
      machine: machineOneId
    })
    .expect(201);

  const failure = await Failure.findById(response.body._id);
  const machine = await Machine.findById(response.body.machine);

  expect(response.body).toMatchObject({
    name: "Test Failure Name",
    fixed: false
  });
  expect(failure.name).toBe("Test Failure Name");
  expect(machine).not.toBeNull();
});

test("Should return error if adding new failure with empty name", async () => {
  await request(app)
    .post("/failures")
    .send({
      name: "",
      description: "Test Failure Description",
      fixed: false,
      machine: machineOneId
    })
    .expect(400);
});

test("Should return error if adding new failure to nonexisting machine", async () => {
  await request(app)
    .post("/failures")
    .send({
      name: "Test Failure Name",
      description: "Test Failure Description",
      fixed: false,
      machine: wrongId
    })
    .expect(404);
});

// GET TESTS
test("Should get all failures", async () => {
  const response = await request(app)
    .get("/failures")
    .send()
    .expect(200);

  expect(response.body.length).toBe(5);
});

test("Should get a failure by ID", async () => {});
test("Should return error if getting a failure by nonexisting ID", async () => {});
test("Should return error if getting a failure by random route (not ID type)", async () => {});

// UPDATE TESTS
test("Should update failure if failure exists", async () => {});
test("Should return error if updating failure that doesn't exists", async () => {});
test("Should return error if updating failure on random route (not ID type)", async () => {});
test("Should return error if updating failure with invalid values", async () => {});
test("Should return error if updating failure with nonexisting fields", async () => {});
test("Should return error if updating failure to belong to nonexisting machine", async () => {});

// DELETE TESTS
test("Should delete failure if failure exists", async () => {});
test("Should return error if deleting failure that doesn't exists", async () => {});
test("Should return error if deleting failure on random route (not ID type)", async () => {});
