const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorpservicecontentRMSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: false
    },
    corp_id: {
        type: String,
        required: true
    },
    job_id: {
        type: String,
        required: true
    },
    job_title: {
        type: String,
        required:true
    },
    job_deadline: {
        type: String,
        required:true
    }

}, {
    timestamps: true,
})

const CorpServiceContentRM = mongoose.model('CorpServiceContentRM', CorpservicecontentRMSchema);

module.exports = CorpServiceContentRM;