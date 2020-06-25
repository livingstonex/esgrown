const router = require('express').Router();
let CRMS = require('../../models/corp_service_content/corp_service_contentrm.model');


router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const deadline = req.body.deadline;
    const media = req.body.media;
    const corp_id = req.body.corp_id;
    const job_id = req.body.job_id;


    const newServiceContent = new CRMS({title,content,deadline,media,corp_id,job_id});

    newServiceContent.save()
        .then(crms => res.json(crms))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route(`/:jobid`).get(async (req, res) => {

    try { 
        const contents = await CRMS.find({ job_id: req.params.jobid }).sort({ createdAt: -1 });

        const values = contents.map(ct => {
                return Date.now() >= ct.deadline
        })
        
        res.json(values)
    } catch (e) {
        console.log(e)
    }
});


module.exports = router;