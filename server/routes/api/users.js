const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/User.js');
const key = require('../../config/keys').secret;
/** 
 * @route POST /api/users/register
 * @desc Register the User
 * @access Public
*/
router.post('/register', (req, res) =>{
    let { name,
         username,
         email,
         password,
         confirm_password
         } = req.body

    if(password !== confirm_password){
        return res.status(400).json({
            msg: "Password do not match!"
        })
    }
    //check for the username
    User.findOne({username: username}).then(user => {
        if(user){
            return res.status(400).json({
                msg: "Username is already taken!"
            })
        }
    });

    //check for the unique email
    User.findOne({email: email}).then(user => {
        if(user){
            return res.status(400).json({
                msg: "Email is already taken! Forgot password?"
            })
        }
    });
    // Data is valid, register the user
    let newUser = new User({
        name,
        username,
        password,
        email
    });

    //Hashing password
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User has been registered!"
                });
            });
        });
    });

});

/** 
 * @route POST /api/users/login
 * @desc Login the User
 * @access Public
*/
router.post('/login', (req, res) => {
    User.findOne({username: req.body.username}).then(user => {
        if(!user){
            return res.status(404).json({
                msg: "Username is not found!",
                success: false
            });
        }
        // user is true (there is a user), compare password
        bcrypt.compare(req.body.password, user.password).then(isMatch =>{
            if(isMatch){
                //Users password is correct, send JSON token
                const payload = {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email
                }
                jwt.sign(payload, key, { 
                    expiresIn: 604800
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        msg: "You are now logged in!"
                    })
                });
            } else{
                return res.status(404).json({
                    msg: "Incorrect password!",
                    success: false
                });
            }
        });
    });
});

/** 
 * @route POST /api/users/profile
 * @desc Return the User's data
 * @access Private
*/

router.get('/profile', passport.authenticate('jwt', { session: false}), (req, res) => {
    return res.json({
        user: req.user
    });
})

module.exports = router;
