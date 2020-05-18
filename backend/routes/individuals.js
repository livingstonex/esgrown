const router = require('express').Router();
let Individual = require('../models/individual.model');
const bcrypt = require('bcryptjs');

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
    const lastLogin = Date.parse(new Date());

    const newIndividual = new Individual({ fullname, email, phone, gender, dob, country, state, password, status, org_type, org_name, org_id, tic, lastLogin });

    newIndividual.save()
        .then((individ) => res.json(individ))
        .catch(err => res.status(400).json('Error: ' + err));

});


//Check if Login Email exists
router.route('/login_email').post((req, res) => {
    const password = req.body.password;
    Individual.find({ email: req.body.email })
        .then(indi => {
            res.json(indi);
        })
        .catch(err => res.json("Error: " + err));
});

//Login Route
router.route('/login').post((req, res) => {
    const email = req.body.email;
    const hash_password = req.body.hash_password;
    const normal_password = req.body.normal_password;
    const lastLogin = Date.parse(new Date());
    try {
        const equal = bcrypt.compareSync(normal_password, hash_password);
        if (equal) {
            res.json(1);
            Individual.find({ email: email })
                .then(res =>
                    res.updateOne({ lastLogin: lastLogin })
                        .then(res => res.json('LastLogin Updated: ' + res))
                        .catch(err => res.json('ERr: ' + err)),
                ).catch(err => res.json('Error: ' + err));
        } else {
            res.json(0);
        }
    } catch (error) {
        res.json(error)
    }

    // Individual.find({email:req.body.email})
    //             .then(individual => res.json(individual))
    //             .catch(error => {res.status(400).json("Error: " + error)});
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