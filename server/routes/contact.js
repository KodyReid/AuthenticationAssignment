/*    File Name: contact.ejs
      Author: Kody Reid
      Student Number: 301164732
      Date: June 15, 2021
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const contact = require('../models/contact');

//connect to contact model
let Contact = require('../models/contact');
let contactController = require('../controllers/contact');

//GET route for contact list page - read op
router.get('/', contactController.displayContactList);

/* GET route for displaying contact ADD page - CREATE op*/
router.get('/add', contactController.displayAddPage);

//POST route for processing contact ADD page - CREATE op
router.post('/add', contactController.processAddPage);

//GET route for displaying contact EDIT page - update op
router.get('/edit/:id', contactController.displayEditPage);

//POST route for processing contact EDIT page - update op
router.post('/edit/:id', contactController.processEditPage);

//GET to perform contact deletion  - delete op
router.get('/delete/:id', contactController.performDelete);

module.exports = router;