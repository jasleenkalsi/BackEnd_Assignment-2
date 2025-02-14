import request from "supertest";
import app from "../src/app";

describe("Error Handling Middleware", () => {
  test("Should return 404 error for non-existent employee", async () => {
    const response = await request(app).get("/api/v1/employees/nonexistentID");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Employee not found");
  });

  test("Should return validation error for invalid employee data", async () => {
    const response = await request(app)
      .post("/api/v1/employees")
      .send({ name: "J", position: "" }); // Invalid input
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
