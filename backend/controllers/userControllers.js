const User = require('./../models/userModel')
const asyncHandler = require('express-async-handler')
const AppError = require('./../utils/AppError')


exports.getUsers = asyncHandler(async (req, res) => {
    const { filter } = req.query
    const users = await User.find(filter)
    res.status(200).json({
        status: 'success',
        users
    })
})

// exports.createUser = asyncHandler(async (req, res) => {
//     const user = req.body
//     const newUser = await User.create(user)
//     res.status(201).json({
//         status: 'success',
//         newUser
//     })
// })

