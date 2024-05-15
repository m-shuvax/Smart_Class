const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    }, 
    topic: {
        type: String,
        required: false
    },
    instructorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentsId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})
     
const Class = mongoose.model('Class', classSchema)

module.exports = Class