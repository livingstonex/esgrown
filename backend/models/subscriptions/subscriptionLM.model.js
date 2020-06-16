const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionLMSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    sub_status: {
        type: String,
        default: 'inactive'
    },
    sub_code: {
        type: String,
        required: false
    },
    user_email: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_status: {
        type: String,
        required: true
    },
    highest_level_of_education: {
        type: String,
        required: true
    },
    nature_of_work_business: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
});

const LM = mongoose.model('LM', subscriptionLMSchema);

module.exports = LM;



