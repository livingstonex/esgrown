const router = require('express').Router();
let RM = require('../models/subscriptions/subscriptionRM.model');

router.route('/add').post((req, res) => {
    const user_id = req.body.user_id;
    const sub_status = req.body.sub_status;
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    const user_status = req.body.user_status;
    const highest_level_of_education = req.body.highest_level_of_education;
    const field_of_training = req.body.field_of_training;
    const ref = req.body.ref;
    const plan_code = req.body.plan_code;

    const newSubscriptionRM = new RM({user_id, sub_status, user_name, user_email, user_status, highest_level_of_education, field_of_training, ref, plan_code});

    newSubscriptionRM.save()
        .then((sub) => res.json(sub))
        .catch(err => res.status(400).json('Error: '+ err));

});




//============================= Get Individual's RM Sub Details ===========================

router.route(`/:id`).get((req, res) => {
    RM.find({user_id: req.params.id})
            .then(rm => res.json(rm))
            .catch(err => res.status(400).json('Error: ' + err));   
});



//============================= UPDATE FOR RM FORM ===============================

router.route(`/update/:id`).post((req, res) => {
    RM.findOneAndUpdate(
                        {user_id: req.params.id}, 
                        {  
                        highest_level_of_education: req.body.highest_level_of_education,
                        field_of_training: req.body.field_of_training,
                        plan_code: req.body.plan_code
                        }
                    ).then(rm => res.json(rm))
                    .catch(err => res.json('Err: ' + err));
});


//=========================== Check Ref to be used to Toggle Subscription State =========================

router.route(`/update/rmref/:id`).post((req, res) => {
    RM.findOneAndUpdate(
        {user_id: req.params.id}, 
        {  
            ref: req.body.ref,
            sub_status: req.body.sub_status,
            plan_code: req.body.plan_code
        }
        ).then(rm => res.json(rm))
                        .catch(err => res.json('Err: ' + err));


});

module.exports = router;