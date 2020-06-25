const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const excerciseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    admin_id: {
        type: String,
        required:false
    },
    corp_id: {
        type: String,
        required:false
    },
    job_id: {
        type: String,
        required: false
    }

}, {
    timestamps: true,
});

const EXCERCISE = mongoose.model('EXCERCISE', excerciseSchema);

module.exports = EXCERCISE;



