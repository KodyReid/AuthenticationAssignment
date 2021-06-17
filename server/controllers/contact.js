/*    File Name: contact.ejs
      Author: Kody Reid
      Student Number: 301164732
      Date: June 16, 2021
*/
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');


// create reference to database schema
let Contact = require('../models/contact');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, ContactList)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
           res.render('contact/list', {title: 'Contact List', 
           ContactList: ContactList, 
           displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contact/add', {title: 'Add Contact', 
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password

    });

    Contact.create(newContact, (err, Contact) =>{
        if(err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh contact list
            res.redirect('/contact-list');
        }

    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) => 
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('contact/edit',{title: 'Edit Contact', 
            contact: contactToEdit, 
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id
    
    let updatedContact = Contact({
        "_id": id,
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password

    });

    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh contact-list
            res.redirect('/contact-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh contact-list
            res.redirect('/contact-list');
        }

    });
}