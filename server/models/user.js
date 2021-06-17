//require modules for user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
let passportSteam = require('passport-steam');
let passportSpotify = require('passport-spotify');
let passportMicrosoft = require('passport-microsoft');

let User = mongoose.Schema(
    {
        username: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        /*
        password:
        {
            type: String,
            default: "",
            trim: true,
            required: 'Password is required'
        }
        */
       email:
       {
            type: String,
            default: '',
            trim: true,
            required: 'Email is required'
       },
       displayName:
       {
            type: String,
            default: '',
            trim: true,
            required: 'Display Name is required'
       },       
       created:
       {
            type: Date,
            default: Date.now
       },
       update:
       {
            type: Date,
            default: Date.now
       }
    },
    {
        collection: "users"
    }
);

let options = ({ missingPasswordError: 'Incorrect or Missing Password'});

User.plugin(passportLocalMongoose. options);

module.exports.User = mongoose.model('User', User); 
