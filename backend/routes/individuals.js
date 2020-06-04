const router = require('express').Router();
let Individual = require('../models/individual.model');
let Corporate = require('../models/corporate.model');
const bcrypt = require('bcryptjs');
const axios = require('axios');

router.route('/').get((req, res) => {
    Individual.find()
        .then(individuals => res.json(individuals))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/email').post((req, res) => {
    Individual.find({ email: req.body.email })
        .then(individual => res.json(individual))
        .catch(err => res.status(400).json("Error: ", err));
});

// Check if email exist route: Called first before "registration API"
router.route('/check_email').post((req, res) => {
    Individual.find({ email: req.body.email })
        .then(indi => {
            res.json(indi);
        })
        .catch(err => res.json("Error: " + err));
});

// Registration API route
router.route('/add').post((req, res) => {
    //Hash password 
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const fullname = req.body.fullname;
    const email = req.body.email;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const dob = Date.parse(req.body.dob);
    const country = req.body.country;
    const state = req.body.state;
    const password = hash;
    const status = req.body.status;
    const org_type = req.body.org_type;
    const org_name = req.body.org_name;
    const org_id = req.body.org_id;
    const tic = req.body.tic;
    const sub_status = req.body.sub_status;
    const lastLogin = Date.parse(new Date());

    const newIndividual = new Individual({ fullname, email, phone, gender, dob, country, state, password, status, org_type, org_name, org_id, tic, lastLogin, sub_status });

    newIndividual.save()
        .then((individ) => res.json(individ))
        .catch(err => res.status(400).json('Error: ' + err));

});


// Universal Login
router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Individual Login
    Individual.find({ email: req.body.email })
        .then(ind => {
            if(ind.length != 0){
                if(bcrypt.compareSync(password, ind[0].password)){
                    console.log("Password Correct");
                    const lastLogin = Date.parse(new Date());
                    // res.json(ind);
                    if(ind[0].sub_code != null){
                        axios.get(`https://api.paystack.co/subscription/${ind[0].sub_code}`, { headers: { "Authorization": "Bearer sk_test_19f4c12e4e018a9f742e1723d42c9c8e509800b4" } })
                                .then(res => {
                                    console.log("paystack just responded")
                                    ind.update(
                                        { sub_status: res.data.data.status, lastLogin: lastLogin },
                                        { returnOriginal: false }
                                    ).then(update_res => {
                                        console.log(update_res) 
                                        console.log("Updated then, " + ind);
                                        res.json(ind)
                                    }).catch(err => console.log(err));
                                }).catch(err => console.log(err));
                    }else{
                        res.json(ind);
                    }
                }else{
                    // Password is wrong
                    console.log("Password wrong");
                    res.json([]);
                }

            }else{ 
                // CORPORATE
                // Make Login Check for Corporate too
                Corporate.find({ email: req.body.email })
                    .then(corp => {
                        if(corp.length != 0){
                            if(bcrypt.compareSync(password, corp[0].password)){
                                console.log("Password Correct");
                                const lastLogin = Date.parse(new Date());
                                // res.json(ind);
                                if(corp[0].sub_code != null){
                                    axios.get(`https://api.paystack.co/subscription/${corp[0].sub_code}`, { headers: { "Authorization": "Bearer sk_test_19f4c12e4e018a9f742e1723d42c9c8e509800b4" } })
                                            .then(res => {
                                                console.log("paystack just responded")
                                                corp.update(
                                                    { sub_status: res.data.data.status, lastLogin: lastLogin },
                                                    { returnOriginal: false }
                                                ).then(update_res => {
                                                    console.log(update_res) 
                                                    console.log("Updated then, " + corp)
                                                    res.json(corp)
                                                }).catch(err => console.log(err));
                                            }).catch(err => console.log(err));
                                }else{
                                    res.json(corp);
                                }
                            }else{
                                // Password is wrong
                                console.log("Password wrong");
                                res.json([]);
                            }

                        }else{ 
                            // Email does not exist in the Two collections
                            res.json([])
                            // res.json(ind);
                            // Make Login for Corporate too

                        }
                    }).catch(err => {
                        console.log("catch" + err);
                        res.json(err);
                    });
        // Ending for Corporate ======================================

            }
        }).catch(err => {
            console.log("catch" + err);
            res.json(err);
        });
});


router.route(`/update/substatus/:id`).post((req, res) => {
    Individual.findOneAndUpdate(
        { _id: req.params.id },
        {
            ref: req.body.ref,
            sub_status: req.body.sub_status,
            sub_code: req.body.sub_code
        }
    ).then(es => res.json(es))
        .catch(err => res.json('Err: ' + err));

});










//------------- API Route for Individual Profile Update Data -------------------------

router.route(`/update/email/:id`).post((req, res) => {
    Individual.findById(req.params.id)
        .then(individual => {
            individual.email = req.body.email;
            individual.updateOne({ email: req.body.email }).then(() => res.json('Email Update Successful'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Request Failed:  ' + err));
});

router.route(`/update/gender/:id`).post((req, res) => {
    Individual.findById(req.params.id)
        .then(individual => {
            individual.updateOne({ gender: req.body.gender }).then(() => res.json('Gender Update Successful'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Request Failed:  ' + err));
});


router.route(`/update/phone/:id`).post((req, res) => {
    Individual.findById(req.params.id)
        .then(individual => {
            individual.updateOne({ phone: req.body.phone }).then(() => res.json('Phone Update Successful'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Request Failed:  ' + err));
});


router.route(`/update/country/:id`).post((req, res) => {
    Individual.findById(req.params.id)
        .then(individual => {
            individual.updateOne({ country: req.body.country }).then(() => res.json('Country Update Successful'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Request Failed:  ' + err));
}); 

router.route(`/update/state/:id`).post((req, res) => {
    Individual.findById(req.params.id)
        .then(individual => {
            individual.updateOne({ state: req.body.state }).then(() => res.json('State Update Successful'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Request Failed:  ' + err));
});



router.route(`/staff/:id`).get((req, res) => {
    Individual.find({ org_id: req.params.id })
        .then(cmp => res.json(cmp))
        .catch(err => res.status(400).json(err));
});

router.route(`/details/:id`).get((req, res) => {
    Individual.findById(req.params.id, { password: 0 })
        .then(ind => res.json(ind))
        .catch(err => res.status(400).json(err));
})




module.exports = router;