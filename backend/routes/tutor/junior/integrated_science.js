const router = require('express').Router();
const IntegratedScience = require('../../../models/tutor/junior/integrated_science.model');

router.route(`/add`).post( (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const media = req.body.media;
    const subject = req.body.subject;
    const tutor_id = req.body.tutor_id;

    const tutorContent = new IntegratedScience({ tutor_id,subject,title, content, media });
    tutorContent.save().then(sc => res.json(sc)).catch(err => res.status(400).json(err))
});

router.route(`/:id`).get((req, res) => {
    IntegratedScience.find({ tutor_id: req.params.id })
        .then(content => res.json(content))
        .catch(err => res.status(400).json(err))
})

module.exports = router;