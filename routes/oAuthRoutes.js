// authRoutes.js

//Router
const express = require('express');
const app = express();
//JWT 
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

//Google Auth
const { OAuth2Client } = require('google-auth-library');
const redirect_uris = ['http://localhost:3000/auth/google/callback']
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirect_uris[0]);

const passport = require('../passport');
//DB ORM for PostGre SQL
const Users = require('../models/userModel');
  // Sequelize User model

//Setup and initialize gobal env variables
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.get('/auth/google', (req, res) => {
    const authUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],  // Scopes you want to request
    });
    res.redirect(authUrl);  // Redirect user to Google for authorization
});


app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query; // Get the authorization code from the query parameters

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
        const { email, sub: googleId } = payload;  // Get user data from token
        const users = {};
        if (!users[email]) {
            users[email] = { googleId }; // Store user in memory
        }


        // Check if the user already exists, otherwise create a new one
         let user = await Users.findOne({ where: { email } });  // Sequelize syntax
        if (!user) {
            user = await Users.create({ email, googleId });  // Create a new user in Sequelize
        }

        // Issue your own JWT
        const jwtToken = jwt.sign(
            { id: user.id, email: user.email },  // Adjusted to Sequelize's `id`
            jwtSecret,
            { expiresIn: '1d' }
        );

        // Send JWT back to the client (you can also redirect to a frontend route)
        res.json({ jwtToken });


    } catch (error) {
        console.error('Error during Google callback:', error);
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
        let user = await User.findOne({ where: { email } });  // Sequelize syntax
        if (!user) {
            user = await User.create({ email, googleId });  // Create a new user in Sequelize
        }

        // Issue your own JWT
        const jwtToken = jwt.sign(
            { id: user.id, email: user.email },  // Adjusted to Sequelize's `id`
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
