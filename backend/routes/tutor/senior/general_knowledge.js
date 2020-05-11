const router = require('express').Router();
const GeneralKnowledge = require('../../../models/tutor/senior/general_knowledge.model');

router.route(`/add`).post( (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const media = req.body.media;
    const subject = req.body.subject;
    const tutor_id = req.body.tutor_id;

    const tutorContent = new GeneralKnowledge({ tutor_id,subject,title, content, media });
    tutorContent.save().then(generalKnowledge => res.json(generalKnowledge)).catch(err => res.status(400).json(err))
});

router.route(`/:id`).get((req, res) => {
    GeneralKnowledge.find({ tutor_id: req.params.id })
        .then(content => res.json(content))
        .catch(err => res.status(400).json(err))
})

module.exports = router;