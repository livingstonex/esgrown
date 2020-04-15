const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    country: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true

    },
    privilege: {
        type: Array,
        required: false
    },
}, {
    timestamps: true,
});

const ADMIN = mongoose.model('ADMIN', AdminSchema);

module.exports = ADMIN