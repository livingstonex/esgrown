const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicecontentLMSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },

    is_published: {
        type: Boolean,
        required: true
    },
    date_to_publish: {
        type: Date,
        required: true
    }

}, {
    timestamps: true,
})

const LMServiceContent = mongoose.model('LMServiceContent', servicecontentLMSchema);

module.exports = LMServiceContent;