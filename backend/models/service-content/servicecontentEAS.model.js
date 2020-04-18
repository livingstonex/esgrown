const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicecontentEASSchema = new Schema({

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
        required: false
    },
    media: {
        type: String,
        required: false
    },
    admin_id: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
})

const EASServiceContent = mongoose.model('EASServiceContent', servicecontentEASSchema);

module.exports = EASServiceContent;