const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    process.exit(100);
  }
  console.log('Connected to MySQL');
});

// CRUD Routes
app.get('/items', (req, res) => {
  db.query('SELECT * FROM gan', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/items', (req, res) => {
  const { name, description } = req.body;
  console.log("Received new item:", { name, description }); 
  
  const query = 'INSERT INTO gan (name, description) VALUES (?, ?)';
  db.query(query, [name, description], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, name, description });
  });
});

app.put('/items/:id', (req, res) => {
  const { name, description } = req.body;
  const query = 'UPDATE gan SET name = ?, description = ? WHERE id = ?';
  db.query(query, [name, description, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id: req.params.id, name, description });
  });
});

app.delete('/items/:id', (req, res) => {
  db.query('DELETE FROM gan WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
