const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FIS_Schema = new Schema({
        level_of_edu: {
            type: String,
            required: true,
        },

        field: {
            type: String,
            required: true
        },

        subjects: {
            type: Array,
            required: true
        }

    },
    {
        timestamps: true
    });

    const FIS = mongoose.model('FIS', FIS_Schema);
    module.exports = FIS