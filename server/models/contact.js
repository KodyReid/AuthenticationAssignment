/*  File Name: users.js
    Author: Kody Reid
    Student Number: 301164732
    Date: June 16, 2021
*/

let mongoose = require('mongoose');

//create model class

let contactModel = mongoose.Schema({
    name: String,
    email: String,
    password: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Contact', contactModel);