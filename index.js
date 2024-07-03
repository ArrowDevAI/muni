//Requiring Express and Establishing Route variables
const express = require('express');
const app = express();
const router = express.Router();

//Creation of a log
const morgan = require ('morgan');
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/public/log.txt'), { flags: 'a' })
const path = require ('path');
const fs = require ('fs');
app.use(morgan('common', { stream: accessLogStream }))
app.use(express.static('public'));

//Using Models
const models = require ('./models.js');
const mongoose = require ('mongoose');
let Users = models.User;

//Validate forms
const {check, validationResult} = require ('express-validator');


//MongoDB Initializing (remember to set environement variable for CONNECTION_URI in API host)
mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});


bodyParser = require('body-parser');
uuid = require('uuid');

app.use(express.urlencoded({extended: true}));