

# Debugging Analysis

## Scenario 1: Branch Creation Debugging
- **Breakpoint Location**: `src/api/v1/controllers/branchController.ts`, line 5
- **Objective**: Investigating how the `createBranch` function creates a new branch and returns the `id`.

### Debugger Observations

- **Variable States**:
  - `name`: 'Calgary Branch'
  - `address`: '1234 Calgary St'
  - `phone`: '403-555-1234'
- **Call Stack**:
  - `createBranch` → `new branchModel().save()`
- **Behavior**:
  - The function is successfully creating the new branch, but the `id` is not returned as expected.

### Analysis

- **What did you learn from this scenario?**
  - The API is not correctly returning the `id` after creating a branch.
- **Did you observe any unexpected behavior?**
  - Yes, the response does not include the `id` as expected.
- **Areas for improvement or refactoring**:
  - Ensure that the response object includes the `id` of the newly created branch.
- **How does this enhance your understanding of the overall project?**
  - This scenario helped me understand how MongoDB data is saved and how to structure API responses effectively.

---

## Scenario 2: Employee CRUD Operations

- **Breakpoint Location**: `src/api/v1/controllers/employeeController.ts`, line 22
- **Objective**: Debugging the `updateEmployee` function to ensure that employee data is properly updated in the database.

### Debugger Observations

- **Variable States**:
  - `employeeId`: 101
  - `updatedData`: { name: 'jasleen', position: 'Developer' }
- **Call Stack**:
  - `updateEmployee` → `Employee.findByIdAndUpdate()`
- **Behavior**:
  - The employee data is updated, but the change is not reflected in the database.

### Analysis

- **What did you learn from this scenario?**
  - The employee's data is not being saved due to missing validation.
- **Did you observe any unexpected behavior?**
  - Yes, the data doesn't persist, even though the API response is successful.
- **Areas for improvement or refactoring**:
  - Add validation for the employee data before updating the database.
- **How does this enhance your understanding of the overall project?**
  - This scenario taught me the importance of validating data before performing database operations.

---

## Scenario 3: Employee and Branch Relationship Debugging

- **Breakpoint Location**: `src/api/v1/controllers/employeeController.ts`, line 50
- **Objective**: Investigating how the `getEmployeesByBranch` function handles the relationship between employees and branches.

### Debugger Observations

- **Variable States**:
  - `branchId`: 'branch123'
  - `employees`: [ { name: 'John Doe', branchId: 'branch123' }, { name: 'Jane Smith', branchId: 'branch123' }]
- **Call Stack**:
  - `getEmployeesByBranch` → `Employee.find({ branchId })`
- **Behavior**:
  - The function correctly returns employees from the specified branch.

## Analysis

- **What did you learn from this scenario?**
  - The relationship between employees and branches is functioning as expected.
- **Did you observe any unexpected behavior?**
  - No unexpected behavior was observed.
- **Areas for improvement or refactoring**:
  - The performance of the query could be improved by indexing the `branchId` field.
- **How does this enhance your understanding of the overall project?**
  - This scenario confirmed how the employee data interacts with branches and how relationships are managed in the database.

