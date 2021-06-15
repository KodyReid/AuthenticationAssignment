let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const contact = require('../models/contact');

//connect to contact model
let Contact = require('../models/contact');

//GET route for contact list page - read op
router.get('/', (req, res, next) => {
    Contact.find((err, ContactList)=>{
        if(err){
            return console.error(err);
        }
        else
        {
           res.render('contact/list', {title: 'Contact List', ContactList: ContactList});
        }
    });
});


//GET route for displayingcontact add page - create op
router.get('contact/add', (req, res, next) => {
    res.render('contact/list', {title: 'Add Contact'});
});

//POST route for displayingcontact add page - create op
router.post('contact/add', (req, res, next) => {
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
            res.redirect('/contact-list');
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
            res.redirect('/contact-list');
        }

    });
});

module.exports = router;