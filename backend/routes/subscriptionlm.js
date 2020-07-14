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
    const ref = req.body.ref;
    const sub_code = req.body.sub_code;

    const newSubscriptionLM = new LM({ user_id, sub_status, user_name, user_email, user_status, highest_level_of_education, nature_of_work_business, ref, sub_code});

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
                        {  
                            highest_level_of_education: req.body.highest_level_of_education,
                            nature_of_work_business: req.body.nature_of_work_business,
                            plan_code: req.body.plan_code
                        }
                    ).then(lm => res.json(lm))
                    .catch(err => res.json('Err: ' + err));
});

//=========================== Check Ref to be used to Toggle Subscription State =========================

router.route(`/update/lmref/:id`).post((req, res) => {
    LM.findOneAndUpdate(
        {user_id: req.params.id}, 
        {  
            ref: req.body.ref,
            sub_status: req.body.sub_status,
            sub_code: req.body.sub_code
        }
        ).then(lm => res.json(lm))
        .catch(err => res.json('Err: ' + err));

});


router.route(`/getsubcode/:id`).get((req, res) => {
    LM.find({
        user_id: req.params.id
    }).then(sub => {
        if (sub[0].sub_status === 'active') {
            res.json(sub[0].sub_code)
        } else {
            res.json([])
        }
    }).catch(err => res.status(400).json(err))
});

router.route(`/update/substatus/:id`).post((req, res) => {
    LM.findOneAndUpdate(
        { user_id: req.params.id },
        { sub_status: req.body.sub_status }
    ).then(sub => res.json(sub)).catch(err => res.status(400).json(err))
})

module.exports = router;