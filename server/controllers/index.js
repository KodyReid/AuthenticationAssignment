/*  File Name: index.js
    Author: Kody Reid
    Student Number: 301164732
    Date: June 1, 2021
*/


let express = require('express');
let router = express.Router();

module.exports.displayHomePage = (req, res, next) => {
    res.render('index',{title: 'Home'});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index',{title: 'About Me'});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index',{title: 'My Projects'});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index',{title: 'My Services'});
}

module.exports.displayContactInfoPage = (req, res, next) => {
    res.render('index',{title: 'Contact Info'});
}