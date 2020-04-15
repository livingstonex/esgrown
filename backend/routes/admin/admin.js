const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Admin = require('../../models/admin/admin.model');




//create country admin or admin
router.route('/add').post((req, res) => {
    const salt = bcrypt.genSaltSync(10);

    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, salt);
    const privilege = req.body.privilege;
    const role = req.body.role;
    const country = req.body.country;

    const admin = new Admin({ password, email, privilege, role, name, username, country });

    admin.save()
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json('Error ' + err))
});


//============================= Login route =======================//

//login for all admins
router.route('/login').post((req, res) => {
    const user = req.body.username;
    const password = req.body.password;

    Admin.findOne({ username: user })
        .then(admin => {
            if (bcrypt.compareSync(password, admin.password)) {

                res.json(admin)
            } else {
                res.json("login details incorrect! Please try again")
            }
        })
        .catch(err => res.status(400).json(err));

})



//------------- API Routes for country admin-------------------------//

//check if a country already has an admin to prevent a country from having more than one country admin
router.route(`/check/:country`).post((req, res) => {
    Admin.find({
        $and: [
            { country: req.params.country },
            { role: "Country Admin" }
        ]

    })
        .then(country => res.json(country))
        .catch(err => res.status(400).json(err));
});

//check if username exist to prevent duplicates
router.route(`/check/username/:username`).post((req, res) => {
    Admin.find({ username: req.params.username })
        .then(user => res.json(user))
    .catch(err => res.status(400).json(err))
})

//get all country admin for super admin to view
router.route(`/country_admins`).get((req, res) => {
    Admin.find({ role: "Country Admin" })
        .then(ca => res.json(ca))
        .catch(err => res.status(400).json(err))
});

//update country admin privileges by super admin
router.route(`/update/country_admin/:id`).post((req, res) => {
    Admin.findById(req.params.id)
        .then(ca => {
            ca.updateOne({ privilege: req.body.privilege })
                .then(() => res.json('Country Admin privileges updated successfully'))
                .catch(err => res.status().json(err))
        }).catch(err => res.status().json("Request Failed " + err))
});

//====================== API routes for Admin ====================//

//get all admin for a particular country for a country admin to view
router.route(`/admins`).get((req, res) => {
    Admin.find({ role: "Admin" })
        .then(admin => res.json(admin))
        .catch(err => res.status().json(err));
})

//update admin privileges by country admin
router.route(`/update/admin/:id`).post((req, res) => {
    Admin.findById(req.params.id)
        .then(admin => {
            admin.updateOne({ privilege: req.body.privilege })
                .then(() => res.json("Admin Privileges updated successfully"))
                .catch(err => res.status().json(err))
        })
        .catch(err => res.status().json("Request Failed " + err));
});


//==================== delete either country admin or an admin =================//

//delete an admin
router.route(`/delete/:id`).post((req, res) => {
    Admin.deleteOne({ '_id': req.params.id })
        .then(del => res.json(del))
        .catch(err => res.status().json(err));
});


module.exports = router;