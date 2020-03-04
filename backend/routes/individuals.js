const router = require('express').Router();
let Individual = require('../models/individual.model');
const bcrypt = require('bcryptjs');

router.route('/').get((req, res) => {
    Individual.find()
            .then(individuals => res.json(individuals))
            .catch(err => res.status(400).json('Error: ' + err));   
});

router.route('/email').post((req, res) => {
    Individual.find({email:req.body.email})
                .then(individual => res.json(individual))
                .catch(err => res.status(400).json("Error: ", err));
});

// Check if email exist route: Called first before "registration API"
router.route('/check_email').post((req, res) => {
    Individual.find({email:req.body.email})
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

    const newIndividual = new Individual({fullname, email, phone, gender, dob, country, state, password, status});

    newIndividual.save()
        .then((individ) => res.json(individ))
        .catch(err => res.status(400).json('Error: '+ err));

});


//Check if Login Email exists
router.route('/login_email').post((req, res) => {
    const password = req.body.password;
    Individual.find({email:req.body.email})
                .then(indi => {
                    res.json(indi);   
                })
                .catch(err => res.json("Error: " + err));
});

//Login Route
router.route('/login').post((req, res)=>{
    const email = req.body.email;
    const hash_password = req.body.hash_password;
    const normal_password = req.body.normal_password;

    try {
        const equal = bcrypt.compareSync(normal_password, hash_password);
        if(equal){
            res.json(1);
        }else{
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

router.route(`/update/:id`).post((req, res) => {
    Individual.findById(req.params.id)
                .then(individual => {
                    //individual.fullname = req.body.fullname;
                        // if (req.body.email != "") {
                        //     individual.email = req.body.email;
                        //     individual.updateOne({email: req.body.email}).then(()=>res.json('Profile Update Successful'))
                        //     .catch(err => res.status(400).json('Error: '+ err));
                        // }

                        // if (req.body.gender != "") {
                        //     individual.gender = req.body.gender;

                        //     individual.updateOne({gender: req.body.gender}).then(()=>res.json('Gender Update Successful'))
                        //     .catch(err => res.status(400).json('Error: '+ err));
                        // }

                        // if (req.body.phone != "") {
                        //     individual.phone = req.body.phone;
                        //     individual.updateOne({phone: req.body.phone}).then(()=>res.json('Profile Update Successful'))
                        //     .catch(err => res.status(400).json('Error: '+ err));
                        // }

                        // if (req.body.country != "") {
                        //     individual.country = req.body.country;
                        //     individual.updateOne({country: req.body.country}).then(()=>res.json('Profile Update Successful'))
                        //     .catch(err => res.status(400).json('Error: '+ err));
                        // }

                        // if (req.body.state != "") {
                        //     individual.state = req.body.state;
                        //     individual.updateOne({state: req.body.state}).then(()=>res.json('Profile Update Successful'))
                        //     .catch(err => res.status(400).json('Error: '+ err));
                        // }

                    // individual.email = req.body.email;
                    // individual.phone = req.body.phone;
                    // individual.gender = req.body.gender;
                    // individual.dob = Date.parse(req.body.dob);
                    // individual.country = req.body.country;
                    // individual.state = req.body.state;
                    // individual.password = req.body.password;
                  

                    // individual.updateOne().then(()=>res.json('Profile Update Successful'))
                    //                      .catch(err => res.status(400).json('Error Updating: '+ err));
                })
                .catch(err => res.status(400).json('Request Failed:  '+ err));

});

router.route(`/update/email/:id`).post((req, res) => {
    Individual.findById(req.params.id)
                .then(individual => {
                            individual.email = req.body.email;
                            individual.updateOne({email: req.body.email}).then(()=>res.json('Email Update Successful'))
                            .catch(err => res.status(400).json('Error: '+ err));
                })
                .catch(err => res.status(400).json('Request Failed:  '+ err));
});

router.route(`/update/gender/:id`).post((req, res) => {
    Individual.findById(req.params.id)
                .then(individual => {          
                            individual.updateOne({gender: req.body.gender}).then(()=>res.json('Gender Update Successful'))
                            .catch(err => res.status(400).json('Error: '+ err));
                })
                .catch(err => res.status(400).json('Request Failed:  '+ err));
});


router.route(`/update/phone/:id`).post((req, res) => {
    Individual.findById(req.params.id)
                .then(individual => { 
                            individual.updateOne({phone: req.body.phone}).then(()=>res.json('Phone Update Successful'))
                            .catch(err => res.status(400).json('Error: '+ err));
                })
                .catch(err => res.status(400).json('Request Failed:  '+ err));
});


router.route(`/update/country/:id`).post((req, res) => {
    Individual.findById(req.params.id)
                .then(individual => { 
                            individual.updateOne({country: req.body.country}).then(()=>res.json('Country Update Successful'))
                            .catch(err => res.status(400).json('Error: '+ err));
                })
                .catch(err => res.status(400).json('Request Failed:  '+ err));
});

router.route(`/update/state/:id`).post((req, res) => {
    Individual.findById(req.params.id)
                .then(individual => { 
                            individual.updateOne({state: req.body.state}).then(()=>res.json('State Update Successful'))
                            .catch(err => res.status(400).json('Error: '+ err));
                })
                .catch(err => res.status(400).json('Request Failed:  '+ err));
});








// ---------Template for get, delete and update -------------------
/*
router.route('/:id').get((req, res) => {
    Individual.findById(req.params.id)
                .then(individual => res.json(individual))
                .catch(err => res.status(400).json("Error: ", err));
});

router.route('/:id').delete((req, res) => {
    Individual.findByIdAndDelete(req.params.id)
                .then(individual => res.json("User " + individual.surname+ " " + individual.othernames + " Successfully deleted!!"))
                .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').post((req, res) => {
    Individual.findById(req.params.id)
                .then(individual => {
                    individual.fullname = req.body.fullname;
                    individual.email = req.body.email;
                    individual.phone = req.body.phone;
                    individual.gender = req.body.gender;
                    individual.dob = Date.parse(req.body.dob);
                    individual.country = req.body.country;
                    individual.state = req.body.state;
                    //individual.password = req.body.password;

                    individual.save().then(()=>res.json('Individual Account Details Updated'))
                                        .catch(err => res.status(400).json('Error: '+ err));
                })
                .catch(err => res.status(400).json('Error: '+ err));

});

*/

module.exports = router;