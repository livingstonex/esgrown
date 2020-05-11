const router = require('express').Router();
const CorpSubscription = require('../../../models/corporate/subscription/subscription.model');

router.route(`/add`).post((req, res) => {
    const company_name = req.body.company_name;
    const email = req.body.email;
    const company_id = req.body.company_id;
    const doi = req.body.doi;
    const service = req.body.service;
    const plan_code = req.body.plan_code;
    const sub_status = false;
    const ref = null;


    const corpSub = new CorpSubscription({ company_name, email, company_id, doi, service, plan_code, sub_status, ref });

    corpSub.save()
        .then(corpSub => res.json(corpSub))
        .catch(err => res.status(400).json(err));

});

router.route(`/update/ref/:id`).post((req, res) => {
    CorpSubscription.findOneAndUpdate(
        { company_id: req.params.id },
        {
            sub_status: true,
            ref: req.body.ref
        }
    ).then(() => res.json("ref updated successfully"))
        .catch(err => res.status(400).json(err))
});

router.route(`/:id`).get((req, res) => {
    CorpSubscription.find({ company_id: req.params.id })
        .then(comp => res.json(comp))
        .catch(err => res.status(400).json(err));
});

router.route(`/update/email/:id`).post((req, res) => {
    CorpSubscription.findOneAndUpdate(
        { company_id: req.params.id },
        { email: req.body.email }
    ).then(() => res.json("update successful"))
        .catch(err => res.status(400).json(err));

});

module.exports = router;