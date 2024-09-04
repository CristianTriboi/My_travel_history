const connection = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.register = (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(query, [username, hashedPassword], (err, result) => {
    if (err) return res.status(500).send('Error registering the user.');

    res.status(201).send({ message: 'User registered successfully!' });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], (err, results) => {
    if (err) return res.status(500).send('Error on the server.');

    if (results.length === 0) return res.status(404).send('User not found.');

    const user = results[0];

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).send({ auth: true, token });
  });
};