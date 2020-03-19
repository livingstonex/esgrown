const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const answerSchema = new Schema({
    user_id: {
        type: String,
        required:true,
    },
    excercise_id: {
        type: String,
        required:true
    },
    service: {
        type: String,
        required:true
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
    timestamps:true,
});

const ANSWER = mongoose.model('ANSWER', answerSchema);

module.exports = ANSWER;



