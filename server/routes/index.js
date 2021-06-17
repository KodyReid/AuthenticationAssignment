/*  File Name: index.js
    Author: Kody Reid
    Student Number: 301164732
    Date: June 1, 2021
*/

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index'); //referencing the index controller

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Me page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Me page. */
router.get('/contact', indexController.displayContactInfoPage);

/* GET route for displaying login page */
router.get('/login', indexController.displayLoginPage);

/* POST route for processing login page */
router.post('/login', indexController.processLoginPage);

/* GET route for displaying register page */
router.get('/register', indexController.displayRegisterPage);

/* POST route for processing register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform logout */
router.get('/logout', indexController.performLogout);

module.exports = router;
