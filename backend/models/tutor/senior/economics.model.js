const mongoose = require('mongoose');

const TutorContentSchema = mongoose.Schema({
    tutor_id: {
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const economicsContent = mongoose.model('economics', TutorContentSchema);

module.exports = economicsContent;