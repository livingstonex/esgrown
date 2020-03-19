
const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const questionSchema = new Schema({
    excercise_id:{
        type: String,
        required:true
    },
    question:{
        type: String,
        required: true
    },
    answer:{
        type:Array,
        required:true
        },
    correct_ans:{
        type: Array,
        required:true,
    },
    score:{
        type: Number,
        required:true
    }
        
}, {
    timestamps:true,
});

const QUESTION = mongoose.model('QUESTION', questionSchema);

module.exports = QUESTION;



