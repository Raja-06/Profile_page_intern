const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: 'Rajavishalini@17', // replace with your MySQL password
  database: 'profile_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Your API endpoint to handle profile creation
app.post('/api/profiles', (req, res) => {
  const { profilePic, role, details } = req.body;
  const { name, email, phone, skills, experience, company, jobOpenings } = details;

  const sql = `INSERT INTO profiles (profilePic, role, name, email, phone, skills, experience, company, jobOpenings)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [profilePic, role, name, email, phone, skills, experience, company, jobOpenings], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Profile created successfully', profileId: result.insertId });
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
