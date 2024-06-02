const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:[true, 'The user must have a name']
    }, 
    lastName: {
        type:String,
        required:[true, 'The user must have a name']
    }, 
    email:{
        type:String,
        required:[true , 'Please provide email'],
        unique: true
    },
    password:{
        type: String,
        required:[true, 'Must be a password'],
        minLength: 8,
        select: false
    },
    role:{
        type: String,
        enum:{
            required:[true, 'Must be a role'],
            values:['admin', 'instructor', 'student'],
            message: 'The role must be either "admin", "instructor" or "student"'
        },
    }
})

userSchema.pre('save', async function(next){
    // if(!this.isModified('password'))
    // return next()
    // const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.checkPassword = async function(password,hashedPassword){
    const checkPasword = await bcrypt.compare(password, hashedPassword)
    return checkPasword
}

const User = mongoose.model('User', userSchema)

module.exports = User