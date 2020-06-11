const router = require('express').Router();
const StaffRatingSchema = require('../../models/ratings/staff-rating.mode');



router.route(`/add`).post(async (req, res) => {
    const start_date = Date.now();
    const week = 604800 + Date.now();
    const staff_ratings = req.body.staff_ratings;
    const org = req.body.org;

    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb("ratings");


    const Rate = await db.model(org, StaffRatingSchema);


    const docs = await Rate.find();


    if (docs.length === 0) {
        //create first document
        try {
            const newDoc = new Rate({ start_date, week, staff_ratings });
            const rated = await newDoc.save();
            res.json("staff rated successfully");

        } catch (e) {
            res.status(400).json(e)

        }
    } else {
        //get the last doc
        const lastDoc = await Rate.find().sort({ createdAt: - 1 }).limit(1);


        //check if the week has ended and create a new week(new doc)
        if (lastDoc.week <= Date.now()) {
            //week has ended create a new doc(week)
            const staff = req.body.staff_ratings;
            const start = Date.now();
            const newWeek = Date.now() + 604800;

            const newWeekDoc = new Rate({ staff, start, week });

            try {

                const staffRated = await newWeekDoc.save();

                res.json(staffRated);

            } catch (e) {
                res.status(400).json(e)

            }

        } else {
            //check if staff has been rated b4
            const rte = await Rate.find().sort({ createdAt: - 1 }).limit(1);

            const rStaff = rte[0].staff_ratings.filter(st => {
                return st.staff_id === req.body.staff_ratings.staff_id
            })

            if (rStaff.length !== 0) {
                res.json("Staff has already been rated for the week")
            } else {

                try {
                    const appendNew = await Rate.find().sort({ createdAt: - 1 }).limit(1).updateOne({ $push: { staff_ratings } });
                    if (appendNew) {
                        res.json("staff rated successfully");
                    }
                } catch (e) {
                    res.status(400).json(e)
                }
            }

        }


    }


})

module.exports = router;