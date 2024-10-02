const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    title1: String,
    title2: String,
    img1: String,
    img2: String,
    img3: String,
    content: String,
    category: String
});

module.exports = mongoose.model('place', placeSchema);