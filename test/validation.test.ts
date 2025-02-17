import Joi from "joi";
import { branchSchema } from "../src/api/v1/schemas/branchSchema";
import { employeeSchema } from "../src/api/v1/schemas/employeeSchema"; // Adjust path if needed

describe("Validation Tests", () => {
  test("Valid employee data should pass validation", () => {
    const validData = {
      name: "Jasleen Kalsi",
      position: "Software Engineer",
      email: "jasleen@example.com",
      branchId: "branch123",
      department: "IT",
      phone: "1234567890"
    };

    const { error } = employeeSchema.validate(validData);
    expect(error).toBeUndefined();
  });

  test("Invalid employee email should fail validation", () => {
    const invalidData = {
      name: "John Doe",
      position: "Manager",
      email: "invalid-email",
      branchId: "branch123",
    };

    const { error } = employeeSchema.validate(invalidData);
    expect(error).toBeDefined();
  });

  test("Valid phone number should pass validation", () => {
    const validData = { name: "Test Branch", phone: "12345678901", address: "123 Main St" };
    const { error } = branchSchema.validate(validData);
    expect(error).toBeUndefined();
  });

  test("Missing branch name should fail validation", () => {
    const invalidData = {
      address: "123 Main Street",
      phone: "1234567890",
    };

    const { error } = branchSchema.validate(invalidData);
    expect(error).toBeDefined();
  });
});