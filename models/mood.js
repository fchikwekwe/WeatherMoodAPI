const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MoodSchema = new Schema({
    time: { type: Date, default: Date.now },
    mood: String,
    location: String,
    weather: { type: Schema.Types.Mixed }, // API returns an object
});

module.exports = mongoose.model('Mood', MoodSchema);
