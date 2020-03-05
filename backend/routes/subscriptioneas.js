const router = require('express').Router();
let EAS = require('../models/subscriptions/subscriptionEAS.model');

router.route('/add').post((req, res) => {
    const user_id = req.body.user_id;
    const sub_status = req.body.sub_status;
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    const user_status = req.body.user_status;
    const levelofeducation = req.body.levelofeducation;
    const field_of_intended_study = req.body.field_of_intended_study;
    const tic = req.body.tic;

    const newSubscriptionEAS = new EAS({user_id, sub_status, user_name, user_email, user_status, levelofeducation, field_of_intended_study, tic});

    newSubscriptionEAS.save()
        .then((sub) => res.json(sub))
        .catch(err => res.status(400).json('Error: '+ err));

});


//============================= Get Individual's EAS Sub Details ===========================

router.route(`/:id`).get((req, res) => {
    EAS.find({user_id: req.params.id})
            .then(eas => res.json(eas))
            .catch(err => res.status(400).json('Error: ' + err));   
});



//============================= UPDATE FOR EAS FORM ===============================

router.route(`/update/:id`).post((req, res) => {
    EAS.findOneAndUpdate(
        {user_id: req.params.id}, 
        {  levelofeducation: req.body.levelofeducation,
           field_of_intended_study: req.body.field_of_intended_study
        }
        ).then(es => res.json(es))
                        .catch(err => res.json('Err: ' + err));
});

module.exports = router;