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