// app.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://navneet:navneet@cluster0.dhn6oi5.mongodb.net/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Passport Configuration
require('./config/passport')(passport, User);

// Express Session
app.use(session({ secret: 'aE8fnk32$!sD_1z', resave: true, saveUninitialized: true }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
