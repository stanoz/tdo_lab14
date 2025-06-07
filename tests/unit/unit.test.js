const request = require('supertest');
const app = require('../../app');
const pool = require('../../db.js')

describe('POST /texts', () => {
  afterAll(async () => {
    await pool.end();
    app.close();
  });

  it('should return 400 if text is not provided', async () => {
    const res = await request(app).post('/texts').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
