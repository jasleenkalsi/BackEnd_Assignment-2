import request from 'supertest';
import app from '../src/app';

describe('Employee API', () => {
  let employeeId: number;

  it('should create a new employee', async () => {
    const res = await request(app).post('/api/v1/employees').send({
      name: 'david',
      position: 'Software Engineer',
      department: 'IT',
      email: 'davidsharma@gmail.com',
      phone: '123-456-2345',
      branchId: 1,
    });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    employeeId = res.body.data.id;
  });



  it('should update an employee', async () => {
    const res = await request(app).put(`/api/v1/employees/${employeeId}`).send({
      position: 'Senior Software Engineer',
    });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('position', 'Senior Software Engineer');  // Accessing inside `data`
  });

  it('should delete an employee', async () => {
    const res = await request(app).delete(`/api/v1/employees/${employeeId}`);
    expect(res.status).toBe(200);  // Adjusted for 200 instead of 204
  });
});

