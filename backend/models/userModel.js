const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'The user must have a name']
  },
  lastName: {
    type: String,
    required: [true, 'The user must have a name']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Must be a password'],
    minLength: 8,
    select: false
  },
  role: {
    type: String,
    enum: {
      required: [true, 'Must be a role'],
      values: ['admin', 'instructor', 'student'],
      message: 'The role must be either "admin", "instructor" or "student"'
    },
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide phone number'],
    minLength: 9,
    maxLength: 15,
    
  },
  resetPasswordToken:{
  type: String,
},
  resetPasswordExpires:{
  type: Date,
  }
});


// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    next();
});


userSchema.methods.checkPassword = async function (plainTextPassword) {
  console.log(1111111111111);
    return await bcrypt.compare(plainTextPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User;
