import request from "supertest";
import app from "../src/app";

describe("Branch Controller", () => {
  let createdBranchId: string;

  test("should create a new branch", async () => {
    const newBranch = {
      name: "Downtown Branch",
      address: "123 Main Street",
      phone: "1234567890"  // Ensure it's exactly 10 digits
    };

    const response = await request(app).post("/api/v1/branches").send(newBranch);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data.id");  // Adjust for response structure

    createdBranchId = response.body.data.id;  // Store ID for later use
  });

  test("should return a branch by ID", async () => {
    const res = await request(app).get(`/api/v1/branches/${createdBranchId}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id", createdBranchId);
  });

  test("should update an existing branch", async () => {
    const updatedData = {
      name: "Updated Branch Name",
      address: "456 New Address",   // Include address field
      phone: "0987654321"           // Include phone field (ensure it's valid, e.g., 10 digits)
    };
  
    // Send the request to update the branch
    const res = await request(app).put(`/api/v1/branches/${createdBranchId}`).send(updatedData);
  
    // Log the response body to debug any potential validation errors
    console.log(res.body);  // Add this to inspect the actual error response
  
    // Check the status code and make assertions based on the successful update
    expect(res.status).toBe(200);  // Expected status after successful update
  
    // Check if the name was actually updated
    if (res.body.data) {
      expect(res.body.data.name).toBe("Updated Branch Name");
      expect(res.body.data.address).toBe("456 New Address");  // Verify the address is updated
      expect(res.body.data.phone).toBe("0987654321");        // Verify the phone number is updated
    } else {
      // Handle the case where there's no data or error
      console.error('Error updating branch:', res.body.message || res.body);
    }
  });
  

  test("should delete a branch by ID", async () => {
    const res = await request(app).delete(`/api/v1/branches/${createdBranchId}`);
    expect(res.status).toBe(200);
  });
});
