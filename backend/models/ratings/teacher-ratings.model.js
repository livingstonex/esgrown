const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    total_weeks: {
        type: String,
        required:true
    },
    current_week: {
        type: String,
        required:true
    },
    personnel_ratings: {
        type: Array,
        required:true
    }
}, {
    timestamps: true
});

module.exports = RatingSchema;

