const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const trackBlockSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true
    },
    blockNumber: {
        type: Number,
        default: 0,
    }
}, {timestamps: true,  strict: true});

trackBlockSchema.index({ walletAddress: "text" });

module.exports = model('TrackBlock', trackBlockSchema);