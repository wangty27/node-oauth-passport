require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passportSetup = require('./configs/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');

const { authRoutes, profileRoutes } = require('./routes');

const app = express();

app.set('view engine', 'hbs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.SESSIONKEY]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/oauth-test', { useNewUrlParser: true }, () => {
  console.log('Connected to mongodb');
});

// setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('Now listening on port 3000');
});
