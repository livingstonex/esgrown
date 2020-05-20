const router = require('express').Router();

const RatingSchema = require('../../models/ratings/personnel-ratings.model');


router.route(`/add`).post(async (req, res) => {
    const org = req.body.org;
    const total_weeks = req.body.total_weeks;
    const personnel_ratings = req.body.ratings;



    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb("ratings");

    const Rate = await db.model(org, RatingSchema);

    // check if collection exist, if find is empty then collection does not exist and has no docs
    const all = await Rate.find();

    if (all.length < 1) {
        //create first doc
        const newRating = new Rate({ personnel_ratings, total_weeks,current_week: 1 });

        try {
            const rated = await newRating.save();
            res.json(rated);

        } catch (e) {
            res.status(400).json(e)
        }

    } else {
        //locate the last doc and update
        const lastDoc = await Rate.find().sort({ createdAt: - 1 }).limit(1);

        const lastCreatedAt = lastDoc[0].createdAt.toDateString();


        const epocDate = Math.floor(new Date(lastCreatedAt).getTime());

        //add 7 days to createdat to get the epocdate
        const days = 86400000 * 7;

        const newEpoc = epocDate + days;

        const today = Date.now();


        if (today > newEpoc) {
            
            //create new week
            const newRating = new Rate({
                personnel_ratings,
                total_weeks: lastDoc.total_weeks,
                current_week: lastDoc.current_week + 1
            });

            const rated = await newRating.save();

            res.json(rated);
        } else {
            //find the id
            Rate.find({ "personnel_ratings.personnel_id": req.body.ratings.personnel_id })
                .then(doc => {
                    if (doc.length > 0) {
                        //has already been rated for the current week
                        res.json(1)

                    } else {
                        //has not been rated for the current week
                        Rate.find().sort({ createdAt: - 1 }).limit(1).update({ $push: { personnel_ratings } })
                            .then(() => res.json(2)).catch(err => res.status(400).json(err))
                    }
                }).catch(err => res.status(400).json(err))

        }


    }


    /**
     * 1. check if collection exist
     * 2. if collection exist check number of docs. if equal to 0 create a new doc.
     * if doc > 0 determine the last doc and check if user has already been rated
     * if user has been rated do nothing if not add new rating
     */



})

router.route(`/check/:school`).get(async (req, res) => {
    
    const org = req.params.school;

    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb("ratings");
    const Rate = await db.model(org, RatingSchema);

    const result = await Rate.find();

    res.json(result);

})

module.exports = router;
