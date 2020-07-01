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

router.route(`/`).get(async (req, res) => {


    try {
        const pub = await ComptMgt.find({ is_published: false });

        if (pub.length > 0) {

            pub.map(async upd => {
                if (Date.now() > upd.date_to_publish) {

                    await upd.updateOne({ is_published: true, date_to_publish: null });
                }

                try {
                    const fnd = await ComptMgt.find({ is_published: true }).sort({ createdAt: -1 });

                    res.json(fnd);
                } catch (e) {
                    res.status(400).json(e)
                }
            });

        } else {
            //do normal search
            try {
                const fnd = await ComptMgt.find({ is_published: true }).sort({ createdAt: -1 });
                res.json(fnd);
            } catch (e) {
                res.status(400).json(e)
            }
        }



    } catch (e) {

    }
});




module.exports = router;