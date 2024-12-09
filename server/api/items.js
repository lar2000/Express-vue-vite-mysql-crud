const express = require('express');
const db = require('./db_connection');
const item = express.Router();

// CRUD Routes
item.get('/items', (req, res) => {
    db.query('SELECT * FROM gan', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

  item.post('/items', (req, res) => {
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
  
  item.put('/items/:id', (req, res) => {
    const { name, description } = req.body;
    const query = 'UPDATE gan SET name = ?, description = ? WHERE id = ?';
    db.query(query, [name, description, req.params.id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ id: req.params.id, name, description });
    });
  });
  
  item.delete('/items/:id', (req, res) => {
    db.query('DELETE FROM gan WHERE id = ?', [req.params.id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(204).end();
    });
  });

  module.exports = item;
