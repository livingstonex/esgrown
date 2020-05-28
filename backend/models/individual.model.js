const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const individualSchema = new Schema({
    fullname: {
        type: String,
        //required: true,
    },
    email: {
        type: String,
        //required:true
    },
    gender: {
        type: String,
        //required:true
    },
    phone: {
        type: String,
        //required:false
    },
    dob: {
        type: Date,
        //required:true,
    },
    country: {
        type: String,
        //required:false
    },
    state: {
        type: String,
        //required:false
    },
    password: {
        type: String,
        //required:true
    },
    status: {
        type: String,
        //required: true
    },
    org_type: {
        type: String,
    },
    org_name: {
        type: String
    },
    org_id: {
        type: String
    },
    sub_status: {
        type: String,
        required: true
    },
    sub_code: {
        type: String,
        required: false
},
    tic: {
        type:String,
    },
    lastLogin: {
        type: Date,
    }

}, {
    timestamps: true,
});

const Individual = mongoose.model('Individual', individualSchema);

module.exports = Individual;



