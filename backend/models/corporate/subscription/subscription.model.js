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
    email: {
        type: String,
        required: true
    },
    sub_code_rm: {
        type: String,
    },
    sub_status_rm: {
        type: String,
    },
    ref: {
        type: String,

    }

}, {
    timestamps: true
});

const CorpSubscription = mongoose.model('CorporateSubscription', CorpSubSchema);

module.exports = CorpSubscription;