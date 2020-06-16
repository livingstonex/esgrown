const router = require('express').Router();
const JOB = require('../../models/corporate/job.model');


//======================== Add new company with jobs ====================
router.route(`/add`).post((req, res) => {
    const company_name = req.body.company_name;
    const company_id = req.body.company_id;
    const jobs = req.body.jobs;

    JOB.find({ company_id }).then(corp => {

        if (corp == 0) {
            //not found
            const job = new JOB({ company_name, jobs, company_id })
            job.save()
                .then(job => res.json(job))
                .catch(err => res.status(400).json(err))
        } else {
            //found
            corp[0].jobs = corp[0].jobs.concat(jobs);
            corp[0].save().then(job => res.json(job))
                .catch(err => res.status(400).json(err))
        }
        
    }
        
    ).catch(err => res.status(400).json(err))
});


//====================== get all companies and jobs ===================================

router.route(`/`).get((req, res) => {
    JOB.find()
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json(err));
});

// get all jobs by company_id
router.route(`/:companyid`).get((req, res) => {
    JOB.find({company_id: req.params.companyid})
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json(err));
});



//======================= add new available job to an existing company with jobs ======================

// router.route(`/new-job/:id`).post((req, res) => {

//     JOB.findById(req.params.id)
//         .then(job => {

//             job.jobs = job.jobs.concat(req.body.jobs);

//             job.save().then(job => res.json(job))
//                 .catch(err => res.status(400).json(err))
//         })
//         .catch(err => res.status(400).json(err));
// });



//============================== delete jobs with past dead lines ============================

router.route(`/job/delete/:id`).post((req, res) => {

    JOB.findById(req.params.id)
        .then(j => res.json(j.jobs[2]))
        .catch(err => res.status().json(err))
})



module.exports = router;