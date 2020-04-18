const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Admin = require('../../models/admin/admin.model');




//add admin. not available from the front end
router.route('/add').post((req, res) => {
    const salt = bcrypt.genSaltSync(10);

    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, salt);

    const admin = new Admin({
        password, email
    });

    admin.save()
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json('Error ' + err))
});

router.route('/login').post((req, res) => {
    const user_email = req.body.email;
    const user_password = req.body.password;

    Admin.find({ email: user_email })
        .then(admin => {
            if (admin.length > 0) {

                if (bcrypt.compareSync(user_password, admin[0].password)) {

                    res.json(1)

                } else (

                    res.json(0)

                )
            }
        })
        .catch(err => res.status(400).json('Error ' + err))
})

module.exports = router;