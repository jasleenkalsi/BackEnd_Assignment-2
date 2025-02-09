import { employeeSchema } from '../src/api/v1/schemas/employeeSchema';

test('Valid employee data should pass validation', () => {
  const validData = { name: 'Alice', email: 'alice@example.com', position: 'Manager', salary: 50000 };
  const { error } = employeeSchema.validate(validData);
  expect(error).toBeUndefined();
});

test('Invalid email should fail validation', () => {
  const invalidData = { name: 'Bob', email: 'invalid-email', position: 'Staff', salary: 40000 };
  const { error } = employeeSchema.validate(invalidData);
  expect(error).toBeDefined();
});
