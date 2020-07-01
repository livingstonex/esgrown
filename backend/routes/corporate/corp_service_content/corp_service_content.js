const router = require('express').Router();
let CRMS = require('../../../models/corporate/corp_service_content/corp_service_contentrm.model');


router.route(`/add`).post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const job_deadline = req.body.job_deadline;
    const media = req.body.media;
    const corp_id = req.body.corp_id;
    const job_id = req.body.job_id;
    const job_title = req.body.job_title;



    const newServiceContent = new CRMS({ title, content, job_deadline, media, corp_id, job_id, job_title});

    newServiceContent.save()
        .then(crms => res.json(crms))
        .catch(err => res.status(400).json('Error: ' + err));

});

// Get all service content by Job ID, after the job deadline
router.route(`/:jobid`).get(async (req, res) => {

    try { 
        const contents = await CRMS.find({ job_id: req.params.jobid }).sort({ createdAt: -1 });

        const values = contents.map(ct => {
            return Date.now() >= ct.job_deadline
        })
        
        res.json(values)
    } catch (e) {
        console.log(e)
    }
});

router.route(`/corp/:corpid`).get((req, res) => { 

    CRMS.find({ corp_id: req.params.corpid })
        .then(cnt => res.json(cnt))
        .catch(err => res.status(400).json(err))
});


module.exports = router;