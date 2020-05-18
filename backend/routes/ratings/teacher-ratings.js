const router = require('express').Router();

const RatingSchema = require('../../models/ratings/personnel-ratings.model');

router.route(`/add`).post(async (req, res) => {
    // const teacher_id = req.body.teacher_id;
    // const name = req.body.name;
    // const phone = req.body.phone;
    // const pedagogy = req.body.pedagogy
    // const class_control = req.body.class_control;
    // const p_s_relationship = req.body.p_s_relationship;
    // const tic = req.body.tic;
    const org = req.body.org;
    const personnel_ratings = req.body.ratings;



    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb("ratings");

    const Rate = await db.model(org, RatingSchema);

    // const newRating = new Rate({ personnel_ratings });

    // const rated = await newRating.save();
    // res.json(rated);

    // check if collection exist, if find is empty then collection does not exist and has no docs
    const all = await Rate.find();

    if (all.length < 1) {

        const newRating = new Rate({ personnel_ratings});

        try {
            const rated = await newRating.save();
            res.json(rated);

        } catch (e) {
            res.status(400).json(e)
        }

    } else {

        const lastDoc = await Rate.find().sort({ createdAt: - 1 }).limit(1);

        const lastCreatedAt = lastDoc[0].createdAt.toDateString();


        const epocDate = Math.floor(new Date(lastCreatedAt).getTime());

        //add 7 days to created the epocdate
        const days = 86400000 * 7;

        const newEpoc = epocDate + days;

        const today = Date.now();


        if (today > newEpoc) {

            const newRating = new Rate({ personnel_ratings });

            const rated = await newRating.save();

            res.json(rated);
        } else {

            Rate.find().sort({ createdAt: - 1 }).limit(1).update({$push:{personnel_ratings}})
                .then(doc => res.json(doc)).catch(err => res.status(400).json(err))

            // res.json(updated)
        }





    }



    // console.log(all);


    /**
     * 1. check if collection exist
     * 2. if collection exist check number of docs. if equal to 0 create a new doc.
     * if doc > 0 determine the last doc and ad new rating
     */



})

module.exports = router;


