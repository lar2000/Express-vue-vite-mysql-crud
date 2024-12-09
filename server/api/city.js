const express = require('express');
const db = require('./db_connection')
const city = express.Router();

city.get('/city', (req, res) => {
    db.query('SELECT * FROM tbl_village LEFT JOIN tbl_district ON tbl_village.district_id_fk=tbl_district.district_id left JOIN tbl_province on tbl_district.province_id_fk=tbl_province.province_id  WHERE province_id_fk AND tbl_village.district_id_fk',
       (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  city.get('/province', (req, res) => {
    db.query('SELECT * FROM tbl_province',

       (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  city.get('/district', (req, res) => {
    db.query('SELECT * FROM tbl_district LEFT JOIN tbl_province ON tbl_district.province_id_fk=tbl_province.province_id WHERE province_id',
       (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

  module.exports = city;