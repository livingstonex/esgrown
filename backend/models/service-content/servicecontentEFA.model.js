const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicecontentEFASchema = new Schema({

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
    },
    media: {
        type: String,
        required: false
    },
    admin_id: {
        type: String,
        required:true
    },
    user_class: {
        type: String
    }

}, {
    timestamps: true,
})

const EFAServiceContent = mongoose.model('EFAServiceContent', servicecontentEFASchema);

module.exports = EFAServiceContent;