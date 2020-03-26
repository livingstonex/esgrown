const router = require('express').Router();
let EX = require('../../models/excercises/excercise.model');

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const service = req.body.service;
    const duration = req.body.duration;

    const newEX = new EX({ title, service, duration });

    newEX.save()
        .then((sub) => res.json(sub))
        .catch(err => res.status(400).json('Error: ' + err));

});


//============================= Get all Exercises ===========================

router.route(`/`).get((req, res) => {
    EX.find()
        .then(eas => res.json(eas))
        .catch(err => res.status(400).json('Error: ' + err));
});



// ============================= Get update based on user last login ===============================

router.route('/notification').post((req, res) => {
    const lastLogin = req.body.lastLogin;
    EX.find({
        createdAt: {
            $gte: lastLogin
        }
    })
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});


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