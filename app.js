const express = require('express');
const textsRouter = require('./routes/texts');

const app = express();
app.use(express.json());

app.use('/texts', textsRouter);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
