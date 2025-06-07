const express = require('express');
const db = require('../db');
const redisClient = require('../redisClient');

const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const result = await db.query(
      'INSERT INTO texts(content) VALUES($1) RETURNING *',
      [text]
    );
    await redisClient.del('texts'); // Invalidate cache
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const cachedTexts = await redisClient.get('texts');
    if (cachedTexts) {
      return res.json(JSON.parse(cachedTexts));
    }

    const result = await db.query('SELECT * FROM texts ORDER BY id ASC');
    await redisClient.setEx('texts', 3600, JSON.stringify(result.rows)); // Cache for 1 hour
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
