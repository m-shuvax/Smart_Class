const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Class',
        required: true
    }, 
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    cLink:{
        type: String,
        required: true
    }
})
     
const chat = mongoose.model('Chat', chatSchema)

module.exports = chat