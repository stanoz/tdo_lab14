const { createClient } = require('redis');

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'redis',
    port: process.env.REDIS_PORT || 6379,
  },
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

if (process.env.NODE_ENV !== 'test') {
  (async () => {
    await redisClient.connect();
    if (redisClient.isReady) {
      console.log('REDIS CLIENT IS OPEN!')
    }
  })();
}

module.exports = redisClient;
