const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const User = require('../models/userModel');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    // options for the google strategy
    clientID: process.env.GPLUSCLIENTID,
    clientSecret: process.env.GPLUSCLIENTSECRET,
    callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    // check if user exists
    User.findOne({googleId: profile.id}).then(currentUser => {
      if(currentUser) {
        // found user
        done(null, currentUser);
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save().then(newUser => {
          done(null, newUser);
        });
      }
    });
  })
);
