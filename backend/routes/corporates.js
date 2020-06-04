const router = require('express').Router();
const Corporate = require('../models/corporate.model');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

router.route('/').get((req, res) => {
    Corporate.find()
        .then(companies => res.json(companies))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/email').get((req, res) => {
    Corporate.find(req.body.email)
        .then(company => res.json(company))
        .catch(err => res.status(400).json("Error: ", err));
});

// Check if email exist route for registration
router.route('/check_corp_email').post((req, res) => {
    Corporate.find({ email: req.body.email })
        .then(corp => {
            res.json(corp);
        })
        .catch(err => res.json("Error: " + err));
});

// Corporate Registration
router.route('/add').post((req, res) => {
    //Hash password 
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const org_name = req.body.org_name;
    const email = req.body.email;
    const phone = Number(req.body.phone);
    const doi = Date.parse(req.body.doi);
    const country = req.body.country;
    const state = req.body.state;
    const password = hash;
    const status = req.body.status;
    const org_type = req.body.org_type;

    const newCorporate = new Corporate({ org_name, email, phone, doi, country, state, password, status, org_type });

    newCorporate.save()
        .then(corporate => res.json(corporate))
        .catch(err => res.status(400).json('Error ' + err));
});


//------------------------------- API Route for Corporate Profile Update ---------------------
router.route('/update/:id').post((req, res) => {
    Corporate.findById(req.params.id)
        .then(corps => {
            corps.org_name = req.body.org_name;
            corps.email = req.body.email;
            corps.phone = req.body.phone;
            corps.doi = Date.parse(req.body.doi);
            corps.country = req.body.country;
            corps.state = req.body.state;
            //corps.password = req.body.password;

            corps.save().then(() => res.json('Profile Update Successful!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});


// ----------------------------------------- API ROUTES FOR CORPORATE Profile Update -----------------------------------

router.route(`/update/email/:id`).post((req, res) => {
    Corporate.findById(req.params.id)
        .then(corporate => {
            corporate.updateOne({ email: req.body.email }).then(() => res.json('Email Update Successful'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Request Failed:  ' + err));
});



router.route(`/update/phone/:id`).post((req, res) => {
    Corporate.findById(req.params.id)
        .then(corporate => {
            corporate.updateOne({ phone: req.body.phone }).then(() => res.json('Phone Update Successful'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Request Failed:  ' + err));
});


router.route(`/update/country/:id`).post((req, res) => {
    Corporate.findById(req.params.id)
        .then(corporate => {
            corporate.updateOne({ country: req.body.country }).then(() => res.json('Country Update Successful'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Request Failed:  ' + err));
});

router.route(`/update/state/:id`).post((req, res) => {
    Corporate.findById(req.params.id)
        .then(corporate => {
            corporate.updateOne({ state: req.body.state }).then(() => res.json('State Update Successful'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Request Failed:  ' + err));
});

//update status after payment
router.route(`/update/status/:id`).post((req, res) => { 
    Corporate.findById(req.params.id)
        .then(comp => {
                comp.updateOne(
                    {
                        sub_status_rm:req.body.sub_status_rm,
                        sub_code_rm:req.body.sub_code_rm
                    }

                ).then(res => res.json(res))
                    .catch(err => res.json('failed to update company subscription status'))
            }
        )
        .catch(err => res.status(400).json(err));
});



module.exports = router;