const express = require ('express');
const app = express();
const { check, validationResult } = require('express-validator');
const router = express.Router();
const models = require ('./models')
let Users= models.User;
let Scores = models.Score;
let Courses = models.Course;
bodyParser = require('body-parser');
app.use(bodyParser.json());
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');
app.use(passport.initialize());
const authenticateJWT = passport.authenticate('jwt', { session: false });


router.post('/users',
    [
        check('Username', 'Username is Required').isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed').isAlphanumeric(),
        check('Password', 'Password Required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail()
    ],
    async (req, res) => {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let hashedPassword = Users.hashPassword(req.body.Password);
        await Users.findOne({ Username: req.body.Username })
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.Username + ' already exists');
                } else {
                    Users.create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                        .then((user) => {
                            res.status(201).json(user.Username + ' added')
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).send('Error ' + err);
                        });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error ' + err);
            });
    });

    router.post('/scores', authenticateJWT, async (req, res) => {
        const { Username, Course, Score } = req.body;

        try {
          // Check if Course and Score are provided
          if (!Course || !Score) {
            return res.status(400).json({ message: 'Course and Score are required.' });
          }
      
          // Check if the course exists in the allowed courses collection
          const courseExists = await Courses.findOne({ courseName: Course });
          if (!courseExists) {
            return res.status(400).json({ message: 'Invalid course.' });
          }
      
          // Create a new score document
          const newScore = new Scores({
            Username: req.body.Username, // Assuming 'username' is the correct field name in User model
            Course: Course,
            Score: Score,
            Date: new Date() // Automatically set the current date and time
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
      module.exports = router;