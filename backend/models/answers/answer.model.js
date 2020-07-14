const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    excercise_id: {
        type: String,
        required: true
    },
    corp_id: {
        type: String,
        required: true
    },
    job_id: {
        type: String,
        required: false
    },
    total_scored: {
        type: Number
    },
    max_score: {
        type:Number
    },
    service: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    answers: {
        type: Array,
        required: true,
    }

}, {
    timestamps: true,
});

const ANSWER = mongoose.model('ANSWER', answerSchema);

module.exports = ANSWER;



