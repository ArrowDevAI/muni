const { check, validationResult } = require('express-validator');
const passport = require('passport');

// Database Models
const {Users, Courses, Scores,} = require('../models')


const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());  


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

    try {
        const user = await Users.findOne({
            where: { username: req.body.username }
        });

        if (user) {
            return res.status(400).json({ message: `${req.body.username} already exists` });
        } else {
            const newUser = await Users.create({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                birthday: req.body.birthday
            });

            res.status(201).json({ message: `${newUser.username} added` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error ' + err);
    }
});

app.put('/users/:username',[
    check('username', 'Username must be at least 5 characters long').optional().isLength({ min: 5 }),
    check('username', 'Username contains non-alphanumeric characters - not allowed').optional().isAlphanumeric(),
    check('email', 'Email does not appear to be valid').optional().isEmail(),
], 
passport.authenticate('jwt', { session: false }), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 422,
            message: 'Validation errors occurred',
            errors: errors.array() // Include the array of errors
        });
        
    }
    
    if (req.user.username !== req.params.username) {
        return res.status(403).json({ message: 'Permission Denied' });
    }
    
    const updateFields = {};
    const { currentPassword, newPassword } = req.body;

    if (currentPassword && newPassword) {
        try {
            // Fetch the user from the database
            const user = await Users.findOne({ username: req.params.username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Compare current password with stored hashed password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }
        
            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updateFields.Password = hashedPassword;
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error: ' + err });
        }
    }

    if (req.body.username) {
        updateFields.Username = req.body.username;
    }
    if (req.body.email) {
        updateFields.Email = req.body.email;
    }
    if (req.body.birthday) {
        updateFields.Birthday = req.body.birthday;
    }

    try {
        // Update the user in the database
        const updatedUser = await Users.update(updateFields, {
            where: { username: req.params.username },
            returning: true, 
        });
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error: ' + err });
    }
});

app.delete('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {

    try {
        const username = req.body.username;
        const userId = req.body.userid; // Get the user's ID from the request body
        // Check if the user exists in the database
        const user = await Users.findOne({ where: { userid: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await Users.destroy({ where: { userid: userId } });

        res.status(200).json({ message: `${username} deleted successfully` });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//add Authentication when ready
app.post('/scores', async (req, res) => {
    const { userid, courseid, score } = req.body;
    try {
        // Check if Course and Score are provided
        if (!courseid || !score) {
            return res.status(400).json({ message: 'Course and Score are required.' });
        }

        // Check if the course exists in the allowed courses collection
        const courseExists = await Courses.findOne({ where: { courseid: courseid } });
        if (!courseExists) {
            return res.status(400).json({ message: 'Invalid course.' });
        }

        // Create a new score document
        const newScore = await Scores.create({
            userid: userid,
            courseid: courseid,
            score: score
        });
console.log('new score:', newScore)
        // Respond with success message and the new score document
        res.status(201).json({ message: 'Score added successfully', score: newScore });
    } catch (error) {
        // Handle errors
        console.error('Error adding score:', error);
        res.status(500).json({ message: 'Error adding score', error: error.message });
    }
    
});

//add Authentication when ready
app.delete('/scores',  async (req, res) => {
    const { userid, scoreid } = req.body; // Extract userid and scoreid from the request body

    try {
        // Validate that the scoreid is provided
        if (!scoreid) {
            return res.status(400).json({ message: 'Score ID is required.' });
        }
        // Check if the score exists in the database
        const scoreExists = await Scores.findOne({ where: { scoreid: scoreid, userid: userid } });
        if (!scoreExists) {
            return res.status(404).json({ message: 'Score not found or does not belong to the user.' });
        }
        // Delete the score
        await Scores.destroy({
            where: { scoreid: scoreid, userid: userid },
        });

        // Respond with success message
        res.status(200).json({ message: 'Score deleted successfully' });
    } catch (error) {
        console.error('Error deleting score:', error);
        res.status(500).json({ message: 'Error deleting score', error: error.message });
    }
});

app.post('/courses', async (req,res)=>{
const { name, par, city, state } = req.body;

try{ const requiredFields = [name, par, city, state];
    if (requiredFields.some(field => !field)) {
      return res.status(400).json({ message: 'All Inputs Required' });
}

    const courseExists = await Courses.findOne({where : {name : name}});
    if (courseExists) {
    return res.status(400).json({message: 'Course name already exists'})}
    
    const newCourse = await Courses.create({ 
        name : name,
        par: par,
        city : city,
        state : state
     });
console.log ('new course', newCourse)
res.status(201).json({ message: 'Course added successfully', course: newCourse });
}catch {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Error adding course', error: error.message });
}
});

module.exports = app;
