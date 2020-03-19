const router = require('express').Router();
let EX = require('../../models/excercises/excercise.model');

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const service = req.body.service;

    const newEX = new EX({ title, service}); 

    newEX.save()
        .then((sub) => res.json(sub))
        .catch(err => res.status(400).json('Error: ' + err));

});


//============================= Get Individual's EAS Sub Details ===========================

router.route(`/`).get((req, res) => {
    EX.find()
        .then(eas => res.json(eas))
        .catch(err => res.status(400).json('Error: ' + err));
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