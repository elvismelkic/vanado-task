const request = require("supertest");
const app = require("../src/app");
const Machine = require("../src/models/machine");
const { setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should add new machine", async () => {});
test("Should return error if adding new machine with name that is taken", async () => {});

test("Should get all machines", async () => {});
test("Should get a machine by ID", async () => {});
test("Should return error if getting a machine by nonexisting ID", async () => {});

test("Should update machine if machine exists", async () => {});
test("Should return error if updating machine that doesn't exists", async () => {});
test("Should return error if updating machine with name that is taken", async () => {});
test("Should return error if updating machine with invalid values", async () => {});
test("Should return error if updating machine with nonexisting fields", async () => {});

test("Should delete machine if machine exists", async () => {});
test("Should return error if deleting machine that doesn't exists", async () => {});
