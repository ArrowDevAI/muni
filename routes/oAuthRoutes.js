const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../passport'); // Import Passport configured with GoogleStrategy
const { Users } = require('../models'); // Sequelize User model

const app = express();
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());

// Route to initiate Google login
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }));

// Google callback route
app.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const user = req.user; // `req.user` contains the authenticated user

      if (!user) {
        console.error('Error during Google callback:', error);
        return res.status(400).send('User authentication failed');
      }

      // Generate JWT
      const jwtToken = jwt.sign(
        { 
          id: user.userid, 
          email: user.email,
          provider: 'google' },
          jwtSecret,
        { expiresIn: '1d' },
      );
      // Send JWT back to client
      res.cookie('token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
      });
      const redirectURL = process.env.NODE_ENV === 'production'
  ? 'https://munidb-fb01ab798334.herokuapp.com/'
  : 'http://localhost:3001/';

      res.redirect(redirectURL)


    } catch (error) {
      console.error('Error during Google callback:', error);
      res.status(500).send('Authentication failed');
    }
  }
  
);


module.exports = app;
