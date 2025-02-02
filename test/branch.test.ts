import request from 'supertest';
import app from '../src/app'; // Assuming your Express app is in a file named app.ts
import { Branch } from '../src/api/v1/models/branchModel';
 // Adjust the import path if necessary

describe('Branch Controller', () => {
  let createdBranchId: number;

  // Test for creating a new branch
  it('should create a new branch', async () => {
    const newBranch = {
      id :1,
      name: 'Calgary Branch',
      address: '1234 Calgary St, Calgary, AB, T2P 1J3',
      phone: '403-555-1234',
    };
  
    const response = await request(app).post('/api/v1/branches').send(newBranch);
  
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Branch created successfully');
    expect(response.body).toHaveProperty('id'); // Expect the 'id' property
    createdBranchId = response.body.id; // Save the ID for later tests
  });
  
  it('should return a list of all branches', async () => {
    const response = await request(app).get('/api/v1/branches');
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('List of all branches');
    expect(Array.isArray(response.body.branches)).toBe(true); // Check if 'branches' is an array
  });
  
  
  // Test for getting a branch by ID
  it('should return a branch by ID', async () => {
    const response = await request(app).get(`/api/v1/branches/${createdBranchId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Branch with ID ${createdBranchId} retrieved`);
  });

  // Test for updating a branch
  it('should update an existing branch', async () => {
    const updatedData = {
      id : 1,
      name: 'Calgary Downtown Branch',
      address: '5678 Calgary Ave, Calgary, AB, T2P 2K4',
    };

    const response = await request(app).put(`/api/v1/branches/${createdBranchId}`).send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Branch with ID ${createdBranchId} updated successfully`);
  });

  // Test for deleting a branch
  it('should delete a branch by ID', async () => {
    const response = await request(app).delete(`/api/v1/branches/${createdBranchId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Branch with ID ${createdBranchId} deleted successfully`);
  });
});
