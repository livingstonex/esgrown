const router = require('express').Router();
const SocialStudies = require('../../../models/tutor/junior/social_studies.model');

router.route(`/add`).post( (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const media = req.body.media;
    const subject = req.body.subject;
    const tutor_id = req.body.tutor_id;

    const tutorContent = new SocialStudies({ tutor_id,subject,title, content, media });
    tutorContent.save().then(ss => res.json(ss)).catch(err => res.status(400).json(err))
});

router.route(`/:id`).get((req, res) => {
    SocialStudies.find({ tutor_id: req.params.id })
        .then(content => res.json(content))
        .catch(err => res.status(400).json(err))
})

module.exports = router;