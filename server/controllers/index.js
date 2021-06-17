/*      File Name: index.js
        Author: Kody Reid
        Student Number: 301164732
        Date: June 1, 2021
*/


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create usermodel instance
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index',{title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about',{title: 'About Me', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects',{title: 'My Projects', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services',{title: 'My Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactInfoPage = (req, res, next) => {
    res.render('contact',{title: 'Contact Info', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req,res,next) => {
    //check for active login
    if(!req.user)
    {
        res.render('auth/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) =>{
    passport.authenticate('local',
    (err, user,info) => {
        //server err?
        if(err)
        {
            return next(err)
        }
        //user login err?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server err?
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 //1week
            });
            /* - prepping for API
            res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});
            */
            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user obj
    let newUser = new User ({
        username:req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err)=>{
        if(err)
        {
            console.log("Error: Insterting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists'
                );
                console.log('Error: User Already Exists')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            //if no err, then register

            //redirect user and authenticate
            
            /* TODO getting ready to convert to API
            res.json({success: true, msg: 'User Registered Successfully'});
            */
            
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
