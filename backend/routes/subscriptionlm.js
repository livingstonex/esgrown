const router = require('express').Router();
let LM = require('../models/subscriptionS/subscriptionLM.model');

router.route('/add').post((req, res) => {
    const user_id = req.body.user_id;
    const sub_status = req.body.sub_status;
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    const user_status = req.body.user_status;
    const highest_level_of_education = req.body.highest_level_of_education;
    const nature_of_work_business = req.body.nature_of_work_business;

    const newSubscriptionLM = new LM({user_id, sub_status, user_name, user_email, user_status, highest_level_of_education, nature_of_work_business});

    newSubscriptionLM.save()
        .then((sub) => res.json(sub))
        .catch(err => res.status(400).json('Error: '+ err));

}); 



//============================= Get Individual's LM Sub Details ===========================

router.route(`/:id`).get((req, res) => {
    LM.find({user_id: req.params.id})
            .then(lm => res.json(lm))
            .catch(err => res.status(400).json('Error: ' + err));   
});



//============================= UPDATE FOR LM FORM ===============================

router.route(`/update/:id`).post((req, res) => {
    LM.findOneAndUpdate(
                        {user_id: req.params.id}, 
                        {  highest_level_of_education: req.body.highest_level_of_education,
                        nature_of_work_business: req.body.nature_of_work_business,
                        }
                    ).then(lm => res.json(lm))
                    .catch(err => res.json('Err: ' + err));
});

module.exports = router;