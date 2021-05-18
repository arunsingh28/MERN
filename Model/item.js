const { model, Schema } = require('mongoose')

const item = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Items = model('item', item)