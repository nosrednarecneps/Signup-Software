const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 128
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    },
    verificationCode: {
        type: String
    }
});

module.exports = mongoose.model('Subscriber', subscriberSchema);