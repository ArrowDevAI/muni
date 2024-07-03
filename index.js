//Requiring Express and Establishing Route variables
const express = require('express');
const app = express();
const router = express.Router();

//creation of a log
const morgan = require ('morgan');
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/public/log.txt'), { flags: 'a' })
const path = require ('path');
app.use(morgan('common', { stream: accessLogStream }))
app.use(express.static('public'));


app.use(express.urlencoded({extended: true}));