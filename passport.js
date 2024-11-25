const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const Models = require('./models.js');
const passportJWT = require('passport-jwt');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const { Users} = require('./models/index');

const JWTStrategy = passportJWT.Strategy;    
    const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new LocalStrategy(
        {
            usernameField: 'Username',
            passwordField: 'Password'
        },
        async (username, password, callback) => {
            await Users.findOne({ Username: username }) //Users here will need to be re-mapped to PostgreSQL
                .then((user) => {
                    if (!user) {
                        console.log('incorrect username');
                        return callback(null, false, {
                            message: 'Incorrect username'
                        });
                    }
                    if (!user.validatePassword(password)) {
                        console.log('incorrect password');
                        return callback(null, false, { message: 'Incorrect password.' });
                    }
                    console.log('finished');
                    return callback(null, user);
                })
                .catch((error) => {
                    if (error) {
                        console.log(error);
                        return callback(error);
                    }
                })
        }
    )
);

passport.use(
    new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET 
    }, async (jwtPayLoad, callback) => {
        return await Users.findById(jwtPayLoad._id)
            .then((user) => {
                return callback(null, user);
            })
            .catch((error) => {
                return callback(error)
            });
            
    }));

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback",
                scope: [
                    'https://www.googleapis.com/auth/userinfo.profile',
                    'https://www.googleapis.com/auth/userinfo.email'
                ]
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await Users.findOne({ googleId: profile.id });
                    if (!user) {
                        user = await new Users({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value
                        }).save();
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
    module.exports = passport;