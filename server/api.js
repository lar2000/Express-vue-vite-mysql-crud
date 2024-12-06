const express = require('express');
const mysql = require('mysql2');
const api = express.Router(); 

require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Could not connect to MySQL:', err);
      process.exit(0);
    }
    console.log('Connected to MySQL');
  });
  
  // CRUD Routes
  api.get('/items', (req, res) => {
    db.query('SELECT * FROM gan', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  api.get('/users', (req, res) => {
    db.query('SELECT * FROM tb_user', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  api.post('/users', (req, res) => {
    const {user_id, user_name, user_surname, village, district, province } = req.body;
    console.log("Received new item:", {user_id, user_name, user_surname, village, district, province }); 
    
    const query = 'INSERT INTO tb_user (user_id, user_name, user_surname, village, district, province) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [user_id, user_name, user_surname, village, district, province], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, user_id, user_name, user_surname, village, district, province });
    });
  });
  
  api.get('/city', (req, res) => {
    db.query('SELECT * FROM tbl_village LEFT JOIN tbl_district ON tbl_village.district_id_fk=tbl_district.district_id left JOIN tbl_province on tbl_district.province_id_fk=tbl_province.province_id  WHERE province_id_fk AND tbl_village.district_id_fk',
       (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  
  api.post('/items', (req, res) => {
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
  
  api.put('/items/:id', (req, res) => {
    const { name, description } = req.body;
    const query = 'UPDATE gan SET name = ?, description = ? WHERE id = ?';
    db.query(query, [name, description, req.params.id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ id: req.params.id, name, description });
    });
  });
  
  api.delete('/items/:id', (req, res) => {
    db.query('DELETE FROM gan WHERE id = ?', [req.params.id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(204).end();
    });
  });

module.exports = api;