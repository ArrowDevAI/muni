// Requiring Express and Establishing Route variables
const express = require('express');
const app = express();
// Creation of a log
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/public/log.txt'), { flags: 'a' });
app.use(morgan('common', { stream: accessLogStream }));
require('dotenv').config();


// Serve static files
app.use(express.static('public')); // Allows files to be served out of the public directory, including index.html
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CORS Configuration
const cors = require('cors');
const allowedOrigins = ['http://127.0.0.1:8080', 'http://localhost:3000', 'https://arrowdevai.github.io','http://localhost:3001'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const message = 'The CORS policy for this application does not allow access from origin ' + origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

// Passport Initialization
const passport = require('passport');
app.use(passport.initialize());
require('./passport'); // Ensure passport configuration is set up

// Routes
const loginRoutes = require('./routes/loginRoutes');  
const oAuthRoutes = require('./routes/oAuthRoutes'); 
const routes = require('./routes/routes')

app.use('/login', loginRoutes); // Local login and Google token exchange
app.use('/auth', oAuthRoutes); // Google OAuth routes 
app.use('/', routes);

//Initialize Sequelize and Assign Variables to models

const db = require('./models'); 
const {sequelize } = db;



sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

console.log("Current environment:", process.env.NODE_ENV);

module.exports = app;