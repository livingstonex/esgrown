const router = require('express').Router();
let EFA = require('../models/subscriptions/subscriptionEFA.model');

router.route('/add').post((req, res) => {
    const user_id = req.body.user_id;
    const sub_status = req.body.sub_status;
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    const user_status = req.body.user_status;
    const levelofeducation = req.body.levelofeducation;
    const next_intended_education_level = req.body.next_intended_education_level;
    const field_of_intended_study = req.body.field_of_intended_study;
    const tic = req.body.tic;  
    const ref = req.body.ref;
    const plan_code = req.body.plan_code;

    const newSubscriptionEFA = new EFA({user_id, sub_status, user_name, user_email, user_status, levelofeducation, next_intended_education_level, field_of_intended_study, tic, ref, plan_code});

    newSubscriptionEFA.save()
        .then((sub) => res.json(sub))
        .catch(err => res.status(400).json('Error: '+ err));

});



//============================= Get Individual's EFA Sub Details ===========================

router.route(`/:id`).get((req, res) => {
    EFA.find({user_id: req.params.id})
            .then(efa => res.json(efa))
            .catch(err => res.status(400).json('Error: ' + err));   
});



//============================= UPDATE FOR EFA FORM ===============================

router.route(`/update/:id`).post((req, res) => {
    EFA.findOneAndUpdate(
        {user_id: req.params.id}, 
        {  levelofeducation: req.body.levelofeducation,
           next_intended_education_level: req.body.next_intended_education_level,
           field_of_intended_study: req.body.field_of_intended_study,
        }
        ).then(ef => res.json(ef))
                        .catch(err => res.json('Err: ' + err));
});

//=========================== Check Ref to be used to Toggle Subscription State =========================

router.route(`/update/efaref/:id`).post((req, res) => {
    EFA.findOneAndUpdate(
        {user_id: req.params.id}, 
        {  
            ref: req.body.ref,
            sub_status: req.body.sub_status
        }
        ).then(efa => res.json(efa))
                        .catch(err => res.json('Err: ' + err));

});

module.exports = router;