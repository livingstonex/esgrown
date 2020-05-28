const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const subscriptionRMSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    sub_status: {
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
    highest_level_of_education:{
        type: String,
        required: true
    },
    field_of_training:{
        type:String,
        required: true
    },
    ref:{
        type: String,
        required: false
    }
}, {
    timestamps:true,
});

const RM = mongoose.model('RM', subscriptionRMSchema);

module.exports = RM;



