const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffRatingSchema = new Schema({
    start_date: {
        type: String,
    },
    week: {
        type: String
    },
    staff_ratings: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
});

// const RateStaff = mongoose.model('staffRating', StaffRatingSchema);
module.exports = StaffRatingSchema;