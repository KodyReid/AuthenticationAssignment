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

//GET route for contact list page - read op
router.get('/', (req, res, next) => {
    Contact.find((err, ContactList)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
           res.render('list', {title: 'Contact List', ContactList: ContactList});
        }
    });
});


/* GET route for displaying contact add page - create op*/

router.get('/add', (req, res, next) => {
    res.render('add', {title: 'Add Contact'});
});

//POST route for displayingcontact add page - create op
router.post('/add', (req, res, next) => {
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
            res.redirect('/add');
        }

    });
});

//GET route for displayingcontact edit page - update op
router.get('/edit/:id', (req, res, next) => {
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
            res.render('contact/edit',{title: 'Edit Contact', contact: contactToEdit});
        }
    });
});

//POST route for displayingcontact edit page - update op
router.post('/edit/:id', (req, res, next) => {
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
            res.redirect('contact/edit');
        }
    });
});

//GET to perform contact deletion  - delete op
router.get('/delete/:id', (req, res, next) => {
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
            res.redirect('contact/edit');
        }

    });
});

module.exports = router;