const request = require('supertest');
const app = require('../../app');
const db = require('../../db');
const redisClient = require('../../redisClient');

beforeAll(async () => {
  await db.query(
    'CREATE TABLE IF NOT EXISTS texts (id SERIAL PRIMARY KEY, content TEXT NOT NULL)'
  );
  app.listen(3000);
});

afterAll(async () => {
  await db.query('DROP TABLE IF EXISTS texts');
  await db.query('END');
  await redisClient.quit();
  app.close();
});

describe('POST /texts and GET /texts', () => {
  it('should insert and retrieve texts', async () => {
    const postRes = await request(app)
      .post('/texts')
      .send({ text: 'Hello, world!' });
    expect(postRes.statusCode).toEqual(201);
    expect(postRes.body).toHaveProperty('content', 'Hello, world!');

    const getRes = await request(app).get('/texts');
    expect(getRes.statusCode).toEqual(200);
    expect(Array.isArray(getRes.body)).toBe(true);
    expect(getRes.body[0]).toHaveProperty('content', 'Hello, world!');
  });
});
