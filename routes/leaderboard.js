const { check, validationResult } = require('express-validator');
const passport = require('passport');

// Database Models
const {Users, Courses, Scores, Leaderboard} = require('../models')


const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());  

app.get('/', leaderboardController);
