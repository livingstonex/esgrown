const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    last_login: {
        type: Date,
        rrquired: true
    }
});

const ADMIN = mongoose.model('ADMIN', AdminSchema);

module.exports = ADMIN