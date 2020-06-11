const router = require('express').Router();
const ComptMgt = require('../../models/service-content/servicecontent-compt-mgt.model');



router.route(`/add`).post((req, res) => {
    const title = req.body.title;
    const content = req.body.title;
    const is_published = req.body.is_published;
    const date_to_publish = req.body.date_to_publish;
    const media = req.body.media;
    const admin_id = req.body.admin_id;
    const user_class = req.body.user_class;

    const mgt = new ComptMgt({ title, content, is_published, date_to_publish, media, admin_id, user_class });

    mgt.save().then(cmpt => res.json(cmpt)).catch(err => res.status(400).json);

});

router.route(`/`).get((req, res) => {
    ComptMgt.find()
        .then(ser => res.json(ser))
        .catch(err => res.status(400).json(err))
});




module.exports = router;