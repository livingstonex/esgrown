const router = require('express').Router();
let Answer = require('../../models/answers/answer.model');

router.route('/add').post((req, res) => {
    const user_id = req.body.user_id;
    const excercise_id = req.body.excercise_id;
    const corp_id = req.body.corp_id;
    const service = req.body.service;
    const name = req.body.name;
    const email = req.body.email;
    const answers = req.body.answers;
    const job_id = req.body.job_id;

    const newAns = new Answer({ user_id, excercise_id, corp_id, service, name, email, answers,job_id });

    newAns.save()
        .then((sub) => res.json(sub))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all answers by job_id
router.route(`/job/:jobid`).get((req, res) => { 
    const job_id = req.params.jobid;

    Answer.find({ job_id: job_id })
        .then(ans => res.json(ans))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all individuals answers to excercises by company id [i.e Get list of all answers of individuals who took excercise by company id]
router.route('/:corpid').get((req, res) => { 
    const corp_id = req.params.corpid;

    Answer.find({ corp_id: corp_id })
        .then(people => res.json(people))
        .catch(err => res.status(400).json('Error: ' + err));
});
 

// Get list of all individuals who took a particular excercise, by company.
router.route('/corpid/excerciseid').get((req, res) => { 
    const corp_id = req.body.corp_id;
    const excercise_id = res.body.excercise_id;

    Answer.find({ $and: [{ corp_id: corp_id }, { excercise_id: excercise_id }] })
        .then(answers => res.json(answers))
        .catch(err => res.status(400).json('Error: ' + err));
 });

//============================= Get Individual's EAS Sub Details ===========================

router.route(`/:id`).get((req, res) => {
    Answer.find({ user_id: req.params.id })
        .then(answer => res.json(answer))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.route(`/check`).post((req, res) => {
    const userid = req.body.user_id;
    const ex_id = req.body.ex_id;

    Answer.find({
        $and: [
            { excercise_id: ex_id },
            { user_id: userid}
        ]
    }).then(ans => res.json(ans))
        .catch(err => res.status(400).json('Error ' + err))
});



// //============================= UPDATE FOR EAS FORM ===============================

// router.route(`/update/:id`).post((req, res) => {
//     EAS.findOneAndUpdate(
//         { user_id: req.params.id },
//         {
//             levelofeducation: req.body.levelofeducation,
//             field_of_intended_study: req.body.field_of_intended_study
//         }
//     ).then(es => res.json(es))
//         .catch(err => res.json('Err: ' + err));
// });


// //=========================== Check Ref to be used to Toggle Subscription State =========================

// router.route(`/update/easref/:id`).post((req, res) => {
//     EAS.findOneAndUpdate(
//         { user_id: req.params.id },
//         {
//             ref: req.body.ref,
//             sub_status: req.body.sub_status,
//             plan_code: req.body.plan_code
//         }
//         ).then(es => res.json(es))
//                         .catch(err => res.json('Err: ' + err));

// });

module.exports = router;