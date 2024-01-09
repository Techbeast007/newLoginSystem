// config/passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: '126410169452-e2444vfs8den1f9iurtdofmm7anelpgu.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              googleId: profile.id,
              username: profile.displayName,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    )
  );

  // Facebook Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: 'your-facebook-app-id',
        clientSecret: 'your-facebook-app-secret',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email'],
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookId: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              facebookId: profile.id,
              username: profile.displayName,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    )
  );
};
