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
    const email = req.body.email;
    const password = req.body.password;

    Admin.find({
        $and: 
            [
                { email: email },
                { password: password }
            ]
    })
        .then(admin => res.json(admin))
    .catch(err => res.status(400).json('Error '+ err))
})

module.exports = router;