const jwtSecret = process.env.JWT_SECRET; // This has to be the same key used in the JWTStrategy
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express(); // Use app directly instead of router
const passport = require('passport');

require('../passport'); 

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username, // This is the username you’re encoding in the JWT
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256' // This is the algorithm used to “sign” or encode the values of the JWT
  });
}

/* POST login. */
app.post('/', (req, res) => {
  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        return res.send(error);
      }

      let token = generateJWTToken(user.toJSON());

      // Set the HTTP-only cookie before sending the response
      res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'lax', // Adjust based on frontend needs
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      // Send response after setting cookie
      return res.json({ user });
    });
  })(req, res);
});

//route to return user from cookies

app.get('/user', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = { id: decoded.id, email: decoded.email }; 
    return res.json({ user });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
});


module.exports = app;
