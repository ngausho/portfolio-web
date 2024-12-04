const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to database");
});

// Get skills
app.get("/api/skills", (req, res) => {
  const sql = "SELECT * FROM skills";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Add a skill
app.post("/api/skills", (req, res) => {
  const { name, proficiency } = req.body;
  const sql = "INSERT INTO skills (name, proficiency) VALUES (?, ?)";
  db.query(sql, [name, proficiency], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send("Skill added");
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
