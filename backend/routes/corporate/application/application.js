const router = require('express').Router();
const APPLICATION = require('../../../models/corporate/application/aplication.model');
const IND = require('../../../models/individual.model');
const { json } = require('express');


router.route(`/add`).post((req, res) => {

    const applicant_id = req.body.applicant_id;
    const applicant_name = req.body.applicant_name;
    const applicant_email = req.body.applicant_email;
    const jobs_applied_for = req.body.jobs_applied_for;//this an object of the job applied for

    APPLICATION.findOne({ applicant_id })
        .then(user => {

            //check if user has applied b4 or not
            if (user == null) {
                //create new record
                const application = new APPLICATION({ applicant_id, applicant_name, applicant_email, jobs_applied_for });
                application.save()
                    .then(app => {
                        //update ind collection with the job id
                        IND.findOne({ _id: applicant_id })
                            .then(ind => {
                                ind.updateOne({ $push: { jobs: { 'job_title': jobs_applied_for.job_title, 'job_id': jobs_applied_for.job_id } } })
                                    .then(updated => res.json({ "msg": "job added succesfuly1", "data": app, "updated_data": updated }))
                                    .catch(err => res.status(400).json("update catch" + err));
                            })
                            .catch(err => res.status(400).json("ind catch" + err));
                        // res.json({ "msg": "job added succesfuly1", "data": app })
                    })
                    .catch(err => res.status(400).json("main catch" + err));
            } else {
                if (user.jobs_applied_for.length == 1) {
                    // append new application
                    //check if job title exist 

                    if (user.jobs_applied_for[0].job_title === jobs_applied_for.job_title) {
                        res.json({ "msg": "You have already applied for this job" })

                    } else {


                        user.updateOne({ $push: { jobs_applied_for: jobs_applied_for } })
                            .then(upd => {
                                //update ind collection with the job id
                                IND.findById({ applicant_id })
                                    .updateOne({ job_id: jobs_applied_for.job_id })
                                    .then(updated => res.json(updated))
                                    .catch(err => res.status(400).json(err));
                                res.json({ "msg": "job added succesfuly2", "data": upd })
                            })
                            .catch(err => res.status(400).json)
                    }

                }


                if (user.jobs_applied_for.length >= 2) {
                    //max application reached
                    res.json({ "msg": "max job applications reached" })
                }
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