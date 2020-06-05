const router = require('express').Router();
const ComptMgt = require('../../../models/corporate/competence/compt_mgt.model');


router.route(`/add`).post((req, res) => {
    const user_id = req.body.user_id;
    const company_id = req.body.company_id;
    const user_type = req.body.user_type;
    const org_type = req.body.org_type;
    const sub_status = req.body.sub_status;
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;


    const comptMgt = new ComptMgt({ user_id, company_id, org_type, sub_status, user_name, user_email });

    comptMgt.save().then(cmpt => res.json(cmpt)).catch(err => res.status(400).json(err));
});

router.route(`/:id`).get((req, res) => {
    ComptMgt.findOne({ company_id: req.params.id })
        .then(staff => res.json(staff))
        .catch(err => res.status(400).json(err))
});


router.route(`/getuser/:id`).get((req, res) => {
    ComptMgt.findOne({
        $and: [
            { user_id: req.params.id },
            { sub_status: 'active' }
        ]
    }).then(user => {
        if (user !== null) {
            res.json({
                "end_date": user.end_date,
                "start_date": user.start_date
            })
        } else {
            res.json([])
        }

    }).catch(err => res.status(400).json(err))
});

router.route(`/update/substatus/:id`).post((req, res) => {
    ComptMgt.findOneAndUpdate(
        { user_id: req.params.id },
        { sub_status: req.body.sub_status }
    ).then(sub => res.json(sub)).catch(err => res.status(400).json(err))
})


module.exports = router;