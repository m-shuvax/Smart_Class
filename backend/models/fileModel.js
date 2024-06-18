const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    }, 
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    category:{
        type: String,
        enum:{
            values:['studyMaterials', 'lessonSummaries', 'assignments'],
            message: '{VALUE} is not a valid category'}
    },
    fLink:{
        type: String,
        required: true
    }
})
     
const file = mongoose.model('File', fileSchema)

module.exports = file