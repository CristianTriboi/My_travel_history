const connection = require('../config/db');

exports.createEntry = (req, res) => {
  const { title, description, date_of_visit, location } = req.body;
  const userId = req.userId; // Retrieved from JWT

  const query =
    'INSERT INTO travel_entries (user_id, title, description, date_of_visit, location) VALUES (?, ?, ?, ?, ?)';
  connection.query(
    query,
    [userId, title, description, date_of_visit, location],
    (err, result) => {
      if (err) return res.status(500).send('Error creating travel entry.');

      res.status(201).send({ message: 'Travel entry created successfully!' });
    }
  );
};

exports.getEntries = (req, res) => {
  const userId = req.userId;

  const query = 'SELECT * FROM travel_entries WHERE user_id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) return res.status(500).send('Error fetching travel entries.');

    res.status(200).send(results);
  });
};

exports.updateEntry = (req, res) => {
  const { id, title, description, date_of_visit, location } = req.body;

  const query =
    'UPDATE travel_entries SET title = ?, description = ?, date_of_visit = ?, location = ? WHERE id = ?';
  connection.query(
    query,
    [title, description, date_of_visit, location, id],
    (err, result) => {
      if (err) return res.status(500).send('Error updating travel entry.');

      res.status(200).send({ message: 'Travel entry updated successfully!' });
    }
  );
};

exports.deleteEntry = (req, res) => {
  const { id } = req.body;

  const query = 'DELETE FROM travel_entries WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) return res.status(500).send('Error deleting travel entry.');

    res.status(200).send({ message: 'Travel entry deleted successfully!' });
  });
};