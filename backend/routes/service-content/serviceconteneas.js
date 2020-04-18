const router = require('express').Router();
let EASS = require('../../models/service-content/servicecontentEAS.model');


router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const is_published = req.body.is_published;
    const date_to_publish = req.body.date_to_publish == null ? null : Date.parse(req.body.date_to_publish);
    const image = req.body.image;

    const newServiceContent = new EASS({ title, content, is_published, date_to_publish,image });

    newServiceContent.save()
        .then(eass => res.json(eass))
        .catch(err => res.status(400).json('Err: ' + err));

});


router.route('/').get((req, res) => {
    EASS.find().sort({ createdAt: -1 })
        .then(eas => res.json(eas))
        .catch(err => res.status(400).json('Error ' + err))
})


router.route('/notification').post((req, res) => {
    const lastLogin = req.body.lastLogin;
    EASS.find({
        createdAt: {
            $gte: lastLogin
        }
    }).sort({ cratedAt: -1 })
        .then(data => res.json(data))
        .catch(err => res.json('Error: ' + err));
});

module.exports = router;