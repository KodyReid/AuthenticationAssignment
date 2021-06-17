/*    File Name: contact.ejs
      Author: Kody Reid
      Student Number: 301164732
      Date: June 15, 2021
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const contact = require('../models/contact');
let passport = require('passport');
let jwt = require('jsonwebtoken');

let contactController = require('../controllers/contact');

//helper function for guarding
function requireAuth(req, res, next)
{
      //check for login
      if(!req.isAuthenticated())
      {
            return res.redirect('/login');
      }
      next();
}

//GET route for contact list page - read op
router.get('/', contactController.displayContactList);

/* GET route for displaying contact ADD page - CREATE op*/
router.get('/add', requireAuth, contactController.displayAddPage);

//POST route for processing contact ADD page - CREATE op
router.post('/add', requireAuth, contactController.processAddPage);

//GET route for displaying contact EDIT page - update op
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

//POST route for processing contact EDIT page - update op
router.post('/edit/:id', requireAuth, contactController.processEditPage);

//GET to perform contact deletion  - delete op
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;