const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const subscriptionEASSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    sub_status:{
        type: Boolean,
        required: true
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
    field_of_intended_study:{
        type: String,
        required: true
    },
    tic:{
        type: String,
        required: false
    }
}, {
    timestamps:true,
});

const EAS = mongoose.model('EAS', subscriptionEASSchema);

module.exports = EAS;



