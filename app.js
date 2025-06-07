const express = require('express');
const textsRouter = require('./routes/texts');

const app = express();
app.use(express.json());

app.use('/texts', textsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
