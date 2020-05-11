const router = require('express').Router();
const APPLICATION = require('../../../models/corporate/application/aplication.model');


router.route(`/add`).post((req, res) => {

    const applicant_id = req.body.applicant_id;
    const applicant_name = req.body.applicant_name;
    const applicant_email = req.body.applicant_email;
    const companies_applied_to = req.body.companies_applied_to
    const jobs_applied_for = req.body.jobs_applied_for;

    APPLICATION.findOne({ applicant_id })
        .then(user => {
            if (user) {
                if (user.jobs_applied_for.length === 1 && user.companies_applied_to.length === 1) {

                    jobs_applied_for.map(j => {
                        if (user.jobs_applied_for.indexOf(j) === -1) {
                            return user.jobs_applied_for.push(j);
                        }
                    })

                    companies_applied_to.map(c => {
                        if (user.companies_applied_to.indexOf(c) === -1) {
                            return user.companies_applied_to.push(c);
                        }
                    })

                    user.save().then(usrr => res.json(usrr)).catch(err => res.status(400).json(err));
                } else {
                    res.send("max jobs reached");
                }

            } else {

            //user not found add new record
            const application = new APPLICATION({ applicant_id, applicant_name, applicant_email, companies_applied_to, jobs_applied_for });
            application.save()
                .then(app => res.json(app))
                .catch(err => res.status(400).json(err));

            }
        })

});


router.route(`/`).get((req, res) => {
    APPLICATION.find()
        .then(applications => res.json(applications))
        .catch(err => res.status(400).json(err));
})


router.route(`/check/:id`).get((req, res) => {
    APPLICATION.findOne({ applicant_id: req.params.id })
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
});








module.exports = router;