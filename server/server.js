const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON bodies

const city = require('./api/city');
const item = require('./api/items');
const user = require('./api/users');

app.use('/', city)
app.use('/', item)
app.use('/', user)

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});