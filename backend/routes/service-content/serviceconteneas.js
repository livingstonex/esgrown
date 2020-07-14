const router = require('express').Router();
let EASS = require('../../models/service-content/servicecontentEAS.model');


router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const is_published = req.body.is_published;
    const date_to_publish = req.body.date_to_publish == null ? null : Date.parse(req.body.date_to_publish);
    const media = req.body.media;
    const admin_id = req.body.admin_id;
    const user_class = req.body.user_class;

    const newServiceContent = new EASS({ title, content, is_published, date_to_publish, media, admin_id, user_class });

    newServiceContent.save()
        .then(eass => res.json(eass))
        .catch(err => res.status(400).json('Err: ' + err));

});


router.route(`/`).get(async (req, res) => {

    try {
        const pub = await EASS.find({ is_published: false });

        pub.map(async upd => {
            if (Date.now() >= upd.date_to_publish) {

                await upd.updateOne({ is_published: true, date_to_publish: null });
            }

            try {
                const fnd = await EASS.find({ is_published: true }).sort({ createdAt: -1 });

                res.json(fnd);
            } catch (e) {
                res.status(400).json(e)
            }
        });

    } catch (e) {

    }
});


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

router.route(`/activity/:id`).get((req, res) => {
    EASS.find({ admin_id: req.params.id })
        .then(eas => res.json(eas))
        .catch(err => res.status(400).json(err));
});

module.exports = router;