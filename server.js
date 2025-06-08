const app = require('./app');
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'integration') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
