const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Class',
        required: true
    }, 
    studentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    messages:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Message',
    }]
})
     
const chat = mongoose.model('Chat', chatSchema)

module.exports = chat