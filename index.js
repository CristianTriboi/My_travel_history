const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const travelRoutes = require('./routes/travel');

app.use('/auth', authRoutes);
app.use('/travel', travelRoutes);

app.get('/', (req, res) => {
  res.send('Travel History API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});