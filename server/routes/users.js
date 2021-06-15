/*  File Name: users.js
    Name: Kody Reid
    Student Number: 301164732
    Date: June 1, 2021
*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
