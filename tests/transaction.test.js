const request = require("supertest");
const fs = require("fs/promises");
const app = require("../src/app");

const DATA_FILE = "./src/data/transactions.json";

beforeEach(async () => {
    await fs.writeFile(DATA_FILE, "[]");
});

describe("Transaction API", () => {

    it("should create a new transaction", async () => {

    const res = await request(app)
        .post("/transactions")
        .send({
        type: "expense",
        category: "food",
        amount: 200,
        date: "2026-03-01"
        });

    expect(res.statusCode).toBe(201);
    expect(res.body.amount).toBe(200);

    });

    it("should fail if required fields are missing", async () => {

    const res = await request(app)
        .post("/transactions")
        .send({
        type: "expense"
        });

    expect(res.statusCode).toBe(400);

    });

    it("should fail if amount is negative", async () => {

    const res = await request(app)
        .post("/transactions")
        .send({
        type: "expense",
        category: "food",
        amount: -100,
        date: "2026-03-01"
        });

    expect(res.statusCode).toBe(400);

    });

    it("should fail if type is invalid", async () => {

    const res = await request(app)
        .post("/transactions")
        .send({
        type: "invalid",
        category: "food",
        amount: 100,
        date: "2026-03-01"
        });

    expect(res.statusCode).toBe(400);

    });

    it("should return all transactions", async () => {

    await request(app)
        .post("/transactions")
        .send({
        type: "income",
        category: "salary",
        amount: 5000,
        date: "2026-03-01"
        });

    const res = await request(app).get("/transactions");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    });

    it("should return a single transaction", async () => {

    const createRes = await request(app)
        .post("/transactions")
        .send({
        type: "expense",
        category: "food",
        amount: 300,
        date: "2026-03-01"
        });

    const id = createRes.body.id;

    const res = await request(app).get(`/transactions/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(id);

    });

    it("should update a transaction", async () => {

    const createRes = await request(app)
        .post("/transactions")
        .send({
        type: "expense",
        category: "food",
        amount: 300,
        date: "2026-03-01"
        });

    const id = createRes.body.id;

    const res = await request(app)
        .patch(`/transactions/${id}`)
        .send({
        amount: 500
        });

    expect(res.statusCode).toBe(200);
    expect(res.body.amount).toBe(500);

    });

    it("should delete a transaction", async () => {

    const createRes = await request(app)
        .post("/transactions")
        .send({
        type: "expense",
        category: "food",
        amount: 200,
        date: "2026-03-01"
        });

    const id = createRes.body.id;

    const res = await request(app).delete(`/transactions/${id}`);

    expect(res.statusCode).toBe(200);

    });

});