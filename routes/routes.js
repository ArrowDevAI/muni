const { check, validationResult } = require('express-validator');

//Database Models
const Users = require('../models/userModel');
const Scores = require('../models/scoreModel');
const Courses = require('../models/courseModel');

const express = require('express');
const app = express();

const bcrypt = require('bcrypt');

// Users route
app.get('/users', async (req, res) => {
    try {
        const allUsers = await Users.findAll();  // Fetch all users from the database
        console.log(allUsers);  // Log the result in the server console
        res.status(200).json(allUsers);  // Optionally, send it back in the response
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
});

app.post('/users', [
    check('username', 'Username is Required').isLength({ min: 5 }),
    check('username', 'Username contains non-alphanumeric characters - not allowed').isAlphanumeric(),
    check('password', 'Password Required').not().isEmpty(),
    check('email', 'Email does not appear to be valid').isEmail()
], async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.password);
    console.log("Request Body: ", req.body, "Hashed Pass: ", hashedPassword);

    try {
        const user = await Users.findOne({
            where: { username: req.body.username }
        });

        if (user) {
            return res.status(400).send(req.body.username + ' already exists');
        } else {
            const newUser = await Users.create({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                birthday: req.body.birthday
            });

            res.status(201).json(newUser.username + ' added');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error ' + err);
    }
});

// Scores route
app.post('/scores', async (req, res) => {
    const { username, course, score } = req.body;

    try {
        // Check if Course and Score are provided
        if (!course || !score) {
            return res.status(400).json({ message: 'Course and Score are required.' });
        }

        // Check if the course exists in the allowed courses collection
        const courseExists = await Courses.findOne({ courseName: course });
        if (!courseExists) {
            return res.status(400).json({ message: 'Invalid course.' });
        }

        // Create a new score document
        const newScore = new Scores({
            username: username,
            course: course,
            score: score,
            date: new Date()
        });

        // Save the new score document
        await newScore.save();

        // Respond with success message and the new score document
        res.status(201).json({ message: 'Score added successfully', score: newScore });
    } catch (error) {
        // Handle errors
        console.error('Error adding score:', error);
        res.status(500).json({ message: 'Error adding score', error: error.message });
    }
});



module.exports = app;