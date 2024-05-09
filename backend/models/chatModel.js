const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    Class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    }, 
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cLink:{
        type: String,
        required: true
    }
})
     
const chat = mongoose.model('Chat', chatSchema)

module.exports = chat