const router = require('express').Router();
let EX = require('../../models/excercises/excercise.model');
const { json } = require('express');

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const service = req.body.service;
    const duration = req.body.duration;
    const admin_id = req.body.admin_id;
    const corp_id = req.body.corp_id;
    const job_id = req.body.job_id;

    const newEX = new EX({ title, service, duration, admin_id, corp_id, job_id});

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

// =========================== Get Excercises by Company Id ==================

router.route(`/:corpid`).get((req, res) => { 

    EX.find({ corp_id: req.params.corpid })
        .then(ex => res.json(ex))
        .catch(err => json.status(400).json(err))
});




// ============================= Get update based on user last login ===============================

router.route('/notification').post((req, res) => {
    const lastLogin = req.body.lastLogin;
    EX.find({
        createdAt: {
            $gte: lastLogin
        } 
    }).sort({createdAt:-1})
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});



// //=========================== Get Exercises based on admin ID =========================

router.route(`/activity/:id`).get((req, res) => {

    EX.find({ admin_id: req.params.id })
        .then(ex => res.json(ex))
        .catch(err => res.status(400).json(err));
    
});



module.exports = router;