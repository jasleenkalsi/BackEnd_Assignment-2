import request from "supertest";
import app from "../src/app";

describe("Error Handling Middleware", () => {
  test("Should return 404 error for non-existent employee", async () => {
    const response = await request(app).get("/api/v1/employees/nonexistentID");

    console.log("🚀 Debug - Full API Response:", response.body); // ✅ Add debug log

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("success", false);  // ✅ Check success field
    expect(response.body).toHaveProperty("message", "Employee not found"); // 🔹 Ensure message exists
  });

  test("Should return validation error for invalid employee data", async () => {
    const response = await request(app)
      .post("/api/v1/employees")
      .send({ name: "J", position: "" }); // Invalid input

    expect(response.status).toBe(400);
    
    // Match correct response format
    expect(response.body).toHaveProperty("success", false);  // ✅ Fix
    expect(response.body).toHaveProperty("errors");  // Ensure that validation errors are provided
  });
});
