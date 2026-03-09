const request = require("supertest");
const app = require("../src/app");

const fs = require("fs/promises");

beforeAll(async () => {
  await fs.writeFile("./src/data/users.json", "[]");
  await fs.writeFile("./src/data/transactions.json", "[]");
});

describe("User API", () => {

    it("should create a new user", async () => {

    const res = await request(app)
        .post("/users")
        .send({
        name: "John Doe",
        email: "john@example.com"
        });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("john@example.com");

    });

    it("should fail if name is missing", async () => {

    const res = await request(app)
        .post("/users")
        .send({
        email: "missingname@test.com"
        });

    expect(res.statusCode).toBe(400);

    });

    it("should fail if email is missing", async () => {

    const res = await request(app)
        .post("/users")
        .send({
        name: "No Email"
        });

    expect(res.statusCode).toBe(400);

    });

    it("should fail if email format is invalid", async () => {

    const res = await request(app)
        .post("/users")
        .send({
        name: "Invalid Email",
        email: "invalidemail"
        });

    expect(res.statusCode).toBe(400);

    });

    it("should reject duplicate email", async () => {

    await request(app)
        .post("/users")
        .send({
        name: "Duplicate User",
        email: "duplicate@test.com"
        });

    const res = await request(app)
        .post("/users")
        .send({
        name: "Duplicate User",
        email: "duplicate@test.com"
        });

    expect(res.statusCode).toBe(409);

    });

});