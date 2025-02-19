import request from "supertest";
import app from "../src/app";

describe("Employee API", () => {
  let employeeId: string;

  it("should create a new employee", async () => {
    const res = await request(app).post("/api/v1/employees").send({
      name: "John Doe",
      position: "Software Engineer",
      department: "IT",
      email: "john@example.com",
      phone: "1234567890",
      branchId: "123",
      salary: 50000
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data.id");  // ✅ Ensure response has `data.id`
    
    employeeId = res.body.data.id;  // ✅ Store correct ID for later tests
  });

  it("should update an employee", async () => {
    expect(employeeId).toBeDefined();

    const res = await request(app).put(`/api/v1/employees/${employeeId}`).send({
      position: "Senior Software Engineer"
    });

    expect(res.status).toBe(200);
    expect(res.body.data.position).toBe("Senior Software Engineer");
  });

  it("should delete an employee", async () => {
    expect(employeeId).toBeDefined();

    const res = await request(app).delete(`/api/v1/employees/${employeeId}`);
    expect(res.status).toBe(200);
  });
});
