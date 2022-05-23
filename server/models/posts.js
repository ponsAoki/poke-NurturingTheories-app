const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    pokemon: [String],
    no: Number,
    lv: Number,
    nn: String,
    image: String,
    sex: Number,
    color: String,
    ability: String,
    nature: String,
    item: String,
    bn: [Number],
    IN: [Number],
    en: [Number],
    rn: [Number],
    moves: Object,
    memo: String,
    created: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model("Post", postSchema)