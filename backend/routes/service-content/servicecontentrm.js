const router = require('express').Router();
let RMS = require('../../models/service-content/servicecontentRM.model');


router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const is_published = req.body.is_published;
    const date_to_publish = Date.parse(req.body.date_to_publish);
    const media = req.body.media;
    const admin_id = req.body.admin_id;
    const user_class = req.body.user_class;


    const newServiceContent = new RMS({ title, content, is_published, date_to_publish, media, admin_id, user_class});

    newServiceContent.save()
        .then(rms => res.json(rms))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route(`/`).get(async (req, res) => {

    try {
        const pub = await RMS.find({ is_published: false });

        pub.map(async upd => {
            if (Date.now() >= upd.date_to_publish) {

                await upd.updateOne({ is_published: true, date_to_publish: null });
            }

            try {
                const fnd = await RMS.find({ is_published: true }).sort({ createdAt: -1 });

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
    RMS.find({
        createdAt: {
            $gte: lastLogin
        }
    }).sort({ cratedAt: -1 })
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route(`/activity/:id`).get((req, res) => {
    RMS.find({ admin_id: req.params.id })
        .then(eas => res.json(eas))
        .catch(err => res.status(400).json(err));
});

module.exports = router;