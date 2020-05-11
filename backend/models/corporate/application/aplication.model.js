const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    applicant_id: {
        type: String,
        required: true
    },
    applicant_name: {
        type: String,
        required: true
    },
    applicant_email: {
        type: String,
        required: true
    },
    companies_applied_to: {
        type: Array,
        required: true
    },
    jobs_applied_for: {
        type: Array,
        required: true
    }

}, {
    timestamps: true
});

const Application = mongoose.model('APPLICATION', ApplicationSchema);

module.exports = Application;