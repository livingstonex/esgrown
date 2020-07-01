const router = require('express').Router();
const CorpSubscription = require('../../../models/corporate/subscription/subscription.model');

router.route(`/add`).post((req, res) => {
    const company_name = req.body.company_name;
    const email = req.body.email;
    const company_id = req.body.company_id;
    const sub_status_rm = 'inactive';
    const ref = null;

    const corpSub = new CorpSubscription({ company_name, email, company_id, ref, sub_status_rm });

    corpSub.save()
        .then(corpSub => res.json(corpSub))
        .catch(err => res.status(400).json(err));

});

router.route(`/update/ref/:id`).post((req, res) => {
    CorpSubscription.findOneAndUpdate(
        { company_id: req.params.id },
        {
            sub_status_rm: 'active',
            ref: req.body.ref,
            sub_code_rm: req.body.sub_code_rm
        }
    ).then(() => res.json("Your Subscription is now active"))
        .catch(err => res.status(400).json(err))
});

router.route(`/:id`).get((req, res) => {
    CorpSubscription.findOne({ company_id: req.params.id })
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