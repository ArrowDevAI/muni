const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../passport'); // Import Passport configured with GoogleStrategy
const { Users } = require('../models'); // Sequelize User model

const app = express();
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());

// Route to initiate Google login
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
app.get('/google/callback', passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const user = req.user; // `req.user` contains the authenticated user

      if (!user) {
        console.error('Error during Google callback:', error);
        return res.status(400).send('User authentication failed');
      }

      // Generate JWT
      const jwtToken = jwt.sign(
        { id: user.userid, email: user.email },
        jwtSecret,
        { expiresIn: '1d' }
      );
      // Send JWT back to client
      res.json({ token: jwtToken });
      
    } catch (error) {
      console.error('Error during Google callback:', error);
      res.status(500).send('Authentication failed');
    }
  }
  
);


module.exports = app;
