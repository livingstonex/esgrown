const router = require('express').Router();
const Chemistry = require('../../../models/tutor/senior/chemistry.model');

router.route(`/add`).post( (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const media = req.body.media;
    const subject = req.body.subject;
    const tutor_id = req.body.tutor_id;

    const tutorContent = new Chemistry({ tutor_id,subject,title, content, media });
    tutorContent.save().then(chemistry => res.json(chemistry)).catch(err => res.status(400).json(err))
});

router.route(`/:id`).get((req, res) => {
    Chemistry.find({ tutor_id: req.params.id })
        .then(content => res.json(content))
        .catch(err => res.status(400).json(err))
})

module.exports = router;