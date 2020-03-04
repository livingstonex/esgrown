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

    const newSubscriptionEFA = new EFA({user_id, sub_status, user_name, user_email, user_status, levelofeducation, next_intended_education_level, field_of_intended_study, tic});

    newSubscriptionEFA.save()
        .then((sub) => res.json(sub))
        .catch(err => res.status(400).json('Error: '+ err));

});

module.exports = router;