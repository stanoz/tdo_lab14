jest.mock('../../db');
jest.mock('../../redisClient');

const { postHandler } = require('../../routes/texts'); // We'll export this separately
const db = require('../../db');
const redisClient = require('../../redisClient');

describe('POST /texts handler (unit)', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    db.query.mockReset();
    redisClient.del.mockReset();
  });

  it('returns 400 when text is missing', async () => {
    await postHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Text is required' });
  });

  it('inserts into DB and invalidates cache', async () => {
    const fakeRow = { id: 1, content: 'hello' };
    db.query.mockResolvedValue({ rows: [fakeRow] });
    req.body.text = 'hello';

    await postHandler(req, res);

    expect(db.query).toHaveBeenCalledWith(
        'INSERT INTO texts(content) VALUES($1) RETURNING *',
        ['hello']
    );
    expect(redisClient.del).toHaveBeenCalledWith('texts');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeRow);
  });

  it('handles DB errors with 500', async () => {
    db.query.mockRejectedValue(new Error('fail'));
    req.body.text = 'test';

    await postHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
  });
});
