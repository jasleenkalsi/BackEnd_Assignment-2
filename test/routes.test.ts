import request from "supertest";
import app from "../src/app";

describe("API Route Tests", () => {
  test("GET /api/employees should return an array", async () => {
    const res = await request(app).get("/api/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/branches should return an array", async () => {
    const res = await request(app).get("/api/branches");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
