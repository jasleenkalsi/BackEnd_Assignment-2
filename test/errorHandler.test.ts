import request from "supertest";
import app from "../src/app";

describe("Error Handling Middleware", () => {
  test("Should return 404 error for non-existent employee", async () => {
    const response = await request(app).get("/api/v1/employees/nonexistentID");
  
    console.log("🚀 Response Body:", response.body); // Debugging line
  
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined(); // 🔹 Ensure `message` exists
    expect(response.body.message).toContain("not found"); // 🔹 More flexible check
  });
  
  test("Should return validation error for invalid employee data", async () => {
    const response = await request(app)
      .post("/api/v1/employees")
      .send({ name: "J", position: "" }); // Invalid input

    expect(response.status).toBe(400);
    
    // Match correct response format
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toBeDefined();  // Ensure that validation errors are provided
  });
});
