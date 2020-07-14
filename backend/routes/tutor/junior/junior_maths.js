const router = require('express').Router();
const Maths = require('../../../models/tutor/junior/junior_maths.model');

router.route(`/add`).post( (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const media = req.body.media;
    const subject = req.body.subject;
    const tutor_id = req.body.tutor_id;

    const tutorContent = new Maths({ tutor_id,subject,title, content, media });
    tutorContent.save().then(maths => res.json(maths)).catch(err => res.status(400).json(err))
});

router.route(`/:id`).get((req, res) => {
    Maths.find({ tutor_id: req.params.id })
        .then(content => res.json(content))
        .catch(err => res.status(400).json(err))
})

module.exports = router;