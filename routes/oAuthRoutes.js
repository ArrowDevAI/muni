// authRoutes.js

//Router
const express = require('express');
const app = express();
//JWT 
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

//Google Auth
const { OAuth2Client, auth } = require('google-auth-library');
const redirect_uris = {
    development: 'http://localhost:3000/auth/google/callback',
    production: 'https://munidb-fb01ab798334.herokuapp.com/auth/google/callback',
};

const currentRedirectUri =
    process.env.NODE_ENV === 'production' ? redirect_uris.production : redirect_uris.development;

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    currentRedirectUri
);


const passport = require('../passport');
//DB ORM for PostGre SQL
const {Users} = require('../models')
  // Sequelize User model

//Setup and initialize gobal env variables
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.get('/google', (req, res) => {
    const authUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],  
    });
    res.redirect(authUrl);  
});



app.get('/google/callback', async (req, res) => {
    const { code } = req.query; 
    console.log("code: ", code)
 if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        // Exchange authorization code for a token
        const { tokens } = await client.getToken(code);

        client.setCredentials(tokens);  // Set the credentials for future requests
        // Verify the token and get user info
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
    const { email, sub: googleId, given_name: googleName } = payload;  // Get user's email, Google ID, and given name from the payload
// Check if the user already exists
let user = await Users.findOne({ where: { email } });

if (!user) {
    // Create a new username using the given name from Google (or fallback to a default if not provided)
    const username = googleName || email;  // Fallback to `user_<googleId>` if `given_name` is not available
    user = await Users.create({
        email,         // Pass the email from Google
        googleId,      // Pass the googleId from Google
        username,
        birthday: null       // Provide the username value here
    });
}

// JWT creation and response logic remains unchanged

        // Issue your own JWT

        const jwtToken = jwt.sign(
            { id: user.userid, email: user.email },  // Adjusted to Sequelize's `id`
            jwtSecret,
            { expiresIn: '1d' }
        );

        // Send JWT back to the client (you can also redirect to a frontend route)
        res.json({ jwtToken });


    } catch (error) {
        console.error('Error during Google callback:', error.response ? error.response.data : error);
        res.status(500).send('Authentication failed');
    }
});

app.post('/auth/google/token', async (req, res) => {
    const googleToken = req.body.token;

    try {
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, sub: googleId } = payload;  // Get user data from token

        // Check if the user already exists, otherwise create a new one
        let user = await Users.findOne({ where: { email } });  // Sequelize syntax
        if (!user) {
            user = await Users.create({ email, googleId });  // Create a new user in Sequelize
        }
        // Issue your own JWT
        const jwtToken = jwt.sign(
            { id: user.userid, email: user.email },  // Adjusted to Sequelize's `id`
            jwtSecret,
            { expiresIn: '1d' }
        );

        // Send JWT back to the client
        res.json({ jwtToken });

    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(401).send('Invalid token');
    }
});


module.exports = app;
