import request from 'supertest';
import app from 'src/app';

describe('Branch API', () => {
  let branchId: number;

  it('should create a new branch', async () => {
    const res = await request(app).post('/api/v1/branches').send({
      name: 'Downtown Branch',
      address: '123 Main St, City',
      phone: '555-1234',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    branchId = res.body.id;
  });

  it('should fetch all branches', async () => {
    const res = await request(app).get('/api/v1/branches');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should fetch a branch by ID', async () => {
    const res = await request(app).get(`/api/v1/branches/${branchId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', branchId);
  });

  it('should update a branch', async () => {
    const res = await request(app).put(`/api/v1/branches/${branchId}`).send({
      address: '456 New Address St, New City',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('address', '456 New Address St, New City');
  });

  it('should delete a branch', async () => {
    const res = await request(app).delete(`/api/v1/branches/${branchId}`);
    expect(res.status).toBe(204);
  });
});
