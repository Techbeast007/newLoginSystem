// controllers/authController.js
const passport = require('passport');

exports.googleLogin = (req, res, next) => {
  console.log('Initiating Google login process...');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

exports.googleCallback = (req, res, next) => {
  console.log('Processing Google login callback...');
  passport.authenticate('google', (err, user) => {
    if (err) {
      console.error('Error during Google login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('Google login successful for user:', user.username);
    res.redirect('/dashboard'); // You can customize the response as needed
  })(req, res, next);
};

exports.facebookLogin = (req, res, next) => {
  console.log('Initiating Facebook login process...');
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })(req, res, next);
};

exports.facebookCallback = (req, res, next) => {
  console.log('Processing Facebook login callback...');
  passport.authenticate('facebook', (err, user) => {
    if (err) {
      console.error('Error during Facebook login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('Facebook login successful for user:', user.username);
    res.redirect('/dashboard'); // You can customize the response as needed
  })(req, res, next);
};

exports.logout = (req, res) => {
  console.log('Logging out user:', req.user ? req.user.username : 'Unknown User');
  req.logout();
  res.redirect('/');
};
