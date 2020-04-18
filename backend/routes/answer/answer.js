const router = require('express').Router();
let Answer = require('../../models/answers/answer.model');

router.route('/add').post((req, res) => {
    const user_id = req.body.user_id;
    const excercise_id = req.body.excercise_id;
    const service = req.body.service;
    const name = req.body.name;
    const email = req.body.email;
    const answers = req.body.answers; 

    const newAns = new Answer({ user_id, excercise_id, service, name, email, answers });

    newAns.save()
        .then((sub) => res.json(sub))
        .catch(err => res.status(400).json('Error: ' + err));

});


//============================= Get Individual's EAS Sub Details ===========================

router.route(`/:id`).get((req, res) => {
    Answer.find({ user_id: req.params.id })
        .then(answer => res.json(answer))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/check').post((req, res) => {
    const userid = req.body.user_id;
    const ex_id = req.body.ex_id;

    Answer.find({
        $and: [
            { excercise_id: ex_id },
            { user_id: userid}
        ]
    })
        .then(ans => res.json(ans))
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