import request from 'supertest';
import app from '../src/app';
import { Branch } from '../src/api/v1/models/branchModel';

describe('Branch Controller', () => {
  let createdBranchId: string;

  it('should create a new branch', async () => {
    const newBranch = {
      name: 'Calgary Branch',
      address: '1234 Calgary St, Calgary, AB, T2P 1J3',
      phone: '403-555-1234',
    };
  
    const response = await request(app).post('/api/v1/branches').send(newBranch);
  
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Branch created successfully');
    expect(response.body).toHaveProperty('id');  // Ensure that 'id' is included in the response
    createdBranchId = response.body.id;  // Store the id for future tests
  });
  

  // Test for retrieving all branches
  it('should return all branches', async () => {
    const res = await request(app).get('/api/v1/branches');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test for getting a branch by ID
  it('should return a branch by ID', async () => {
    const res = await request(app).get(`/api/v1/branches/${createdBranchId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Branch with ID ${createdBranchId} retrieved`);
  });

  // Test for updating a branch
  it('should update an existing branch', async () => {
    const updatedData = {
      name: 'Calgary Downtown Branch',
      address: '5678 Calgary Ave, Calgary, AB, T2P 2K4',
    };

    const res = await request(app).put(`/api/v1/branches/${createdBranchId}`).send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Branch with ID ${createdBranchId} updated successfully`);
  });

  // Test for deleting a branch
  it('should delete a branch by ID', async () => {
    const res = await request(app).delete(`/api/v1/branches/${createdBranchId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Branch with ID ${createdBranchId} deleted successfully`);
  });
});
