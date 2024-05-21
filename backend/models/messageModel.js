const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    date:{
        type: Date,
        default: Date.now
    },
    message:{
        type: String,
        required: true
    }
})
     
const message = mongoose.model('Message', messageSchema)

module.exports = message