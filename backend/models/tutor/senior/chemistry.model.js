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

const chemistryContent = mongoose.model('chemistry', TutorContentSchema);

module.exports = chemistryContent;