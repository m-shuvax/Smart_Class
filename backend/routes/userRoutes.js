const express = require('express')
const authControllers = require('./../controllers/authControllers')
const userControllers = require('./../controllers/userControllers')
const router = express.Router()

// router.route('/:id')
//     .get(userControllers.getUser)
//     .put(userControllers.updateUser)
//     .delete(userControllers.deleteUser)

router.route('/')
    .get(userControllers.getUsers)
    //.post(userControllers.createUser)

// router.route('/login')
//     .post(userControllers.login)

//router.route('/signup')
//    .post(authControllers.register)



module.exports = router