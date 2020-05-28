const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const subscriptionEFASchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    sub_status:{
        type: String,
        required: true
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
        required: true
    },
    next_intended_education_level:{
        type:String,
        required:true
    },
    field_of_intended_study:{
        type: String,
        required: true
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

const EFA = mongoose.model('EFA', subscriptionEFASchema);

module.exports = EFA;



