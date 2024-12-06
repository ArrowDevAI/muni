const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const { Users } = require('./models/index');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Local Strategy for username/password authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username', // Match your field name in the model
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await Users.findOne({ where: { username } });
        if (!user) {
          console.log('Incorrect username');
          return done(null, false, { message: 'Incorrect username.' });
        }

        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) {
          console.log('Incorrect password');
          return done(null, false, { message: 'Incorrect password.' });
        }

        console.log('Authentication successful');
        return done(null, user);
      } catch (error) {
        console.error('Error in LocalStrategy:', error);
        return done(error);
      }
    }
  )
);

// JWT Strategy for token-based authentication
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await Users.findByPk(jwtPayload.id); // Adjust based on your payload
        if (!user) {
          return done(null, false, { message: 'Token does not match any user.' });
        }
        return done(null, user);
      } catch (error) {
        console.error('Error in JWTStrategy:', error);
        return done(error);
      }
    }
  )
);

// Google OAuth 2.0 Strategy
const callbackURL = process.env.NODE_ENV === 'production' 
  ? 'https://munidb-fb01ab798334.herokuapp.com/auth/google/callback'
  : 'https://localhost:3000/auth/google/callback';

passport.use(
  new GoogleStrategy(
    
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL, 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user exists
        let user = await Users.findOne({ where: { googleId: profile.id } });

        if (!user) {
          // If not found by Google ID, check by email
          user = await Users.findOne({ where: { email: profile.emails[0].value } });
          
          if (!user) {
            // Create a new user if none exists
            user = await Users.create({
              username: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
            });
          } else {
            // Update Google ID for the existing user with this email
            user.googleId = profile.id;
            await user.save();
          }
        }

        return done(null, user);
      } catch (error) {
        console.error("Error in GoogleStrategy:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
