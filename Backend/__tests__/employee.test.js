const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../src/models/userModel');

beforeAll(async () => {
  process.env.JWT_SECRET = 'testsecret';
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/employee_test_db';
  await mongoose.connect(uri);
  await mongoose.connection.db.dropDatabase();
  // create user
  await User.create({ name: 'Tester', email: 't@t.com', password: 'secret123' });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Employee API', () => {
  let token;
  let empId;

  test('login to get token', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 't@t.com', password: 'secret123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test('Create employee', async () => {
    const res = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Alice', mobile: '9999999999', email: 'a@a.com', position: 'Engineer', salary: 80000 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    empId = res.body._id;
  });

  test('Get employees (with search & pagination)', async () => {
    const res = await request(app)
      .get('/api/employees?search=Engineer&limit=5&page=1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBeGreaterThanOrEqual(1);
    expect(res.body.total).toBeGreaterThanOrEqual(1);
  });

  test('Update employee', async () => {
    const res = await request(app)
      .put(`/api/employees/${empId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ salary: 90000 });
    expect(res.statusCode).toBe(200);
    expect(res.body.salary).toBe(90000);
  });

  test('Delete employee', async () => {
    const res = await request(app)
      .delete(`/api/employees/${empId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message.toLowerCase()).toMatch(/deleted/);
  });
});
