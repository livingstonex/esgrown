const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    personnel_ratings: {
        type: Array,
        required:true
    }
}, {
    timestamps: true
});

module.exports = RatingSchema;

