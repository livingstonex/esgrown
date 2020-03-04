const router = require('express').Router();
let SubscriptionLM = require('../models/subscriptionS/subscriptionLM.model');

router.route('/add').post((req, res) => {
    const user_id = req.body.user_id;
    const sub_status = req.body.sub_status;
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    const user_status = req.body.user_status;
    const highest_level_of_education = req.body.highest_level_of_education;
    const nature_of_work_business = req.body.nature_of_work_business;

    const newSubscriptionLM = new SubscriptionLM({user_id, sub_status, user_name, user_email, user_status, highest_level_of_education, nature_of_work_business});

    newSubscriptionLM.save()
        .then((sub) => res.json(sub))
        .catch(err => res.status(400).json('Error: '+ err));

}); 

module.exports = router;