const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    text: { type: String, required: true },
    cardId: { type: Schema.Types.ObjectId, ref: "Card" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
})

module.exports = model('Comment', CommentSchema);