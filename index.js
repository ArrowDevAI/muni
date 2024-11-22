// Requiring Express and Establishing Route variables
const express = require('express');
const app = express();

// Creation of a log
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/public/log.txt'), { flags: 'a' });
app.use(morgan('common', { stream: accessLogStream }));

// Serve static files
app.use(express.static('public')); // Allows files to be served out of the public directory, including index.html

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Sequelize Imports
const Users = require('./models/')
const Scores = require('./models/scoreModel')
const Courses = require ('./models/courseModel')

// CORS Configuration
const cors = require('cors');
const allowedOrigins = ['http://127.0.0.1:8080', 'http://localhost:3000'];
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

//Initialize .env variables
require('dotenv').config();

//Initialize ORM
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    }
  }
});


async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database or sync:', error);
    }
  }

  testConnection();
  
module.exports = sequelize;



// Passport Initialization
const passport = require('passport');
app.use(passport.initialize());
require('./passport'); // Ensure passport configuration is set up

// Routes
const loginRoutes = require('./routes/loginRoutes');  
const oAuthRoutes = require('./routes/oAuthRoutes'); 
const routes = require('./routes/routes')

app.use('/', loginRoutes); // Local login and Google token exchange
app.use('/', oAuthRoutes); // Google OAuth routes 
app.use('/', routes);


module.exports = app;