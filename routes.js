const express = require ('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const models = require ('./models')
let Users= models.User;
let Scores = models.Score;

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

    module.exports = router;