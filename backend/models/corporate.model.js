const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const corporateSchema = new Schema({
    org_name: {
        type: String,
        required: true,
    },
    org_type: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type:Number,
        required:false
    },
    doi:{
        type:Date,
        required:true,
    },
    country:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type: String,
        required: true
    }

}, {
    timestamps:true,
});

const Corporate = mongoose.model('Corporate', corporateSchema);

module.exports = Corporate;



