const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    }, 
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    category:{
        type: Date,
        required: true
    },
    fLink:{
        type: String,
        required: true
    }
})
     
const file = mongoose.model('File', fileSchema)

module.exports = file