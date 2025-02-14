import request from "supertest";
import app from "../src/app";

describe("API Route Tests", () => {
  beforeAll(async () => {
    // ✅ Ensure there's at least one branch before running the tests
    await request(app).post("/api/v1/branches").send({
      name: "Main Branch",
      address: "456 Elm Street",
      phone: "9876543210"
    });
  });

  test("GET /api/v1/employees should return an array", async () => {
    const res = await request(app).get("/api/v1/employees");

    expect(res.status).toBe(200);

    // ✅ Fix: Ensure response contains `data` and is an array
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("GET /api/v1/branches should return an array", async () => {
    const res = await request(app).get("/api/v1/branches");

    expect(res.status).toBe(200);

    // ✅ Fix: Ensure response contains `data` and is an array
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
