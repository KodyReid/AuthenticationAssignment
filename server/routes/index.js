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


module.exports = router;
