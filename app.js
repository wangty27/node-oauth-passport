require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passportSetup = require('./configs/passport-setup');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const { authRoutes, profileRoutes } = require('./routes');

mongoose.connect('mongodb://localhost:27017/oauth-test', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to database');
  readyToFire();
});

const app = express();

app.use(session({
  secret: process.env.SESSIONKEY,
  resave: true,
  saveUninitialized: false,
  maxAge: 24 * 60 * 60 * 1000,
  store: new MongoStore({mongooseConnection: db})
}));

app.set('view engine', 'hbs');

app.use(passport.initialize());
app.use(passport.session());

// setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

function readyToFire() {
  app.listen(3000, () => {
    console.log('Now listening on port 3000');
  });
}
