const request = require('supertest');
const app = require('../../app');
const pool = require('../../db.js')
const redisClient = require('../../redisClient')

describe('POST /texts', () => {
  afterAll(async () => {
    await pool.end();
    await redisClient.quit();
  });

  it('should return 400 if text is not provided', async () => {
    const res = await request(app).post('/texts').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
