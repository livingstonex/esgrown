const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const subscriptionEASSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    sub_status:{
        type: String,
        required: true,
        default:'inactive'
    },
    sub_code: {
        type: String,
        required: false
    },
    user_email:{
        type: String,
        required:true
    },
    user_name:{
        type: String,
        required:true
    },
    user_status:{
        type: String,
        required:true
    },
    levelofeducation:{
        type: String,
        required: false
    },
    field_of_intended_study:{
        type: String,
        required: false
    },
    tic:{
        type: String,
        required: false
    },
    ref:{
        type: String,
        required: false
    }
}, {
    timestamps:true,
});

const EAS = mongoose.model('EAS', subscriptionEASSchema);

module.exports = EAS;



