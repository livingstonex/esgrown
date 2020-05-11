const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    company_name: {
        type: String,
        required: true
    },
    jobs: {
        type: Array,
        required: true
    }

}, {
    timestamps: true,
});

const JOB = mongoose.model('JOB', JobSchema);

module.exports = JOB;