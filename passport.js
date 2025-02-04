const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const { Users } = require('./models/index');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
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

      passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback", // Ensure this matches the Google Console redirect URI
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        
        // Find or create a user in your database using the Google profile
        let user = await Users.findOne({ where: { googleid: profile.id } });

        if (!user) {
          // If the user doesn't exist, create a new user
          user = await Users.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleid: profile.id,
          });
        } else {
          // If the user exists, update any necessary fields
          user.googleid = profile.id;
          await user.save();
        }
        
        return done(null, user);
        
      } catch (error) {
        console.error('Error in Google Strategy:', error);
        return done(error, null);
      }
    }
  )
);
GoogleStrategy.prototype.parseErrorResponse = function(body, status) {
  console.error('Error response from Google:', body);
  try {
    const errorResponse = JSON.parse(body);
    console.error('Parsed error response:', errorResponse);
  } catch (error) {
    console.error('Error parsing the error response:', error);
  }
  return JSON.parse(body).error_description || 'Unknown error';
};


module.exports = passport;
