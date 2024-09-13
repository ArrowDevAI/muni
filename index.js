//Requiring Express and Establishing Route variables
const express = require('express');
const app = express();
const router = express.Router();

//Creation of a log
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/public/log.txt'), { flags: 'a' })
app.use(morgan('common', { stream: accessLogStream }))
app.use(express.static('public')); //this allows files to be served out of the public directory which include index.html
bodyParser = require('body-parser');
app.use(bodyParser.json());

//Using Models
//const models = require('./models.js');
//const mongoose = require('mongoose');
//let Users = models.User;
//let Scores = models.Score;

//Validate forms
const { check, validationResult } = require('express-validator');

//MongoDB Initializing (remember to set environement variable for CONNECTION_URI in API host)
//let connection_uri = process.env.CONNECTION_URI || 'mongodb://localhost:27017/munidb';
//mongoose.connect(connection_uri,{useNewUrlParser: true, useUnifiedTopology: true}
//);

//CORS Module
const cors = require('cors');
let allowedOrigins = ['http://127.0.0.1:8080/']
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            let message = 'The CORS policy for this application does not allow access from origin ' + origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

//Authorization
const passport = require('passport');
let auth = require('./auth')(app);
require('./passport');
app.use(passport.initialize());
//Parsing and identifying Middleware 
const uuid = require('uuid');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
const routes = require('./routes');
app.use('/', routes);

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
    console.log('Listening on port ', port);
});

