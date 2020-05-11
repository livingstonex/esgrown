const router = require('express').Router();
const Business = require('../../../models/tutor/junior/business_studies.model');

router.route(`/add`).post( (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const media = req.body.media;
    const subject = req.body.subject;
    const tutor_id = req.body.tutor_id;

    const tutorContent = new Business ({ tutor_id,subject,title, content, media });
    tutorContent.save().then(bus => res.json(bus)).catch(err => res.status(400).json(err))
});

router.route(`/:id`).get((req, res) => {
    Business.find({ tutor_id: req.params.id })
        .then(content => res.json(content))
        .catch(err => res.status(400).json(err))
})

module.exports = router;