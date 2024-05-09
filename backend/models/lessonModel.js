const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    }, 
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    lLink:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})
     
const lesson = mongoose.model('Lesson', lessonSchema)

module.exports = lesson