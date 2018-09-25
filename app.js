require('dotenv').config();
const express = require('express');

const { authRoutes } = require('./routes');

const app = express();

app.set('view engine', 'hbs');

// setup routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('Now listening on port 3000');
});
