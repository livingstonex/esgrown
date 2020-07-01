const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompMgtSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    company_id: {
        type: String,
        required: true
    },
    org_type: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
    },
    user_email: {
        type: String,
    },
    sub_status: {
        type: String,
        default: 'inactive'
    },
    start_date: {
        type: String,
    },
    end_date: {
        type: String
    }
}, {
    timestamps: true
});

const CompMgt = mongoose.model('CompetenceManagement', CompMgtSchema);

module.exports = CompMgt;

