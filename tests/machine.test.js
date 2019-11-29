const request = require("supertest");
const app = require("../src/app");
const Machine = require("../src/models/machine");
const Failure = require("../src/models/failure");
const {
  setupDatabase,
  machineOne,
  machineOneId,
  wrongMachineId
} = require("./fixtures/db");

beforeEach(setupDatabase);

// POST TESTS
test("Should add new machine", async () => {
  const response = await request(app)
    .post("/machines")
    .send({ name: "Test Machine Name" })
    .expect(201);

  const machine = await Machine.findById(response.body._id);
  expect(machine).not.toBeNull();
  expect(response.body).toMatchObject({ name: "Test Machine Name" });
});

test("Should return error if adding new machine with name that is taken", async () => {
  await request(app)
    .post("/machines")
    .send({ name: machineOne.name })
    .expect(400);
});

test("Should return error if adding new machine with empty name", async () => {
  await request(app)
    .post("/machines")
    .send({ name: "" })
    .expect(400);
});

// GET TESTS
test("Should get all machines", async () => {
  const response = await request(app)
    .get("/machines")
    .send()
    .expect(200);

  expect(response.body.length).toBe(2);
});

test("Should get a machine by ID", async () => {
  const response = await request(app)
    .get(`/machines/${machineOneId}`)
    .send()
    .expect(200);

  const machine = await Machine.findById(machineOneId);
  const failures = await Failure.find({ machine: machine._id });
  expect(machine.name).toBe(response.body.machine.name);
  expect(failures.length).toBe(response.body.failures.length);
});

test("Should return error if getting a machine by nonexisting ID", async () => {
  const response = await request(app)
    .get(`/machines/${wrongMachineId}`)
    .send()
    .expect(404);

  expect(response.body.error).toBe("Not found");
});

test("Should return error if getting a machine by random string", async () => {
  await request(app)
    .get("/machines/somerandomstring")
    .send()
    .expect(400);
});

// UPDATE TESTS
test("Should update machine if machine exists", async () => {});
test("Should return error if updating machine that doesn't exists", async () => {});
test("Should return error if updating machine with name that is taken", async () => {});
test("Should return error if updating machine with invalid values", async () => {});
test("Should return error if updating machine with nonexisting fields", async () => {});

// DELETE TESTS
test("Should delete machine if machine exists", async () => {});
test("Should return error if deleting machine that doesn't exists", async () => {});
