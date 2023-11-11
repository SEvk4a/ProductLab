const { Schema, model } = require('mongoose');

const CardSchema = new Schema({
    imgSrc: { type: String, unique: true, required: true },
    comments: []
})

module.exports = model('Card', CardSchema);