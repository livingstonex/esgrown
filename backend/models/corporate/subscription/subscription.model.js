const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorpSubSchema = new Schema({
    company_id: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    doi: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    plan_code: {
        type: String,
        required: true
    },
    sub_status: {
        type: Boolean,

    },
    ref: {
        type: String,

    }

}, {
    timestamps: true
});

const CorpSubscription = mongoose.model('CorporateSubscription', CorpSubSchema);

module.exports = CorpSubscription;