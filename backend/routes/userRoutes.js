const express = require('express')
const authControllers = require('./../controllers/authControllers')
const userControllers = require('./../controllers/userControllers')
const pageRenders = require('./../controllers/pageRenders') 
const router = express.Router()

router.route('/register')
    .post(authControllers.register)

router.route('/login')
    .get(authControllers.protect, pageRenders.login)


// router.route('/class')
//     .get(userControllers.renderStudentClass)
//     .post(userControllers.createUser)

// router.route('/login')  
//    // .post(userControllers.login)
//    .post((req, res)=>{
//     res.send()
//    })


// router.route('/class/file')
//      .post(userControllers.createFile)
//      .delete(userControllers.deleteFile)

//  router.route('/class/lesson')
//      .post(userControllers.createLesson)
//      .delete(userControllers.deleteLesson)

//  router.route('/:email')
//      .get(userControllers.getUser)
//      .put(userControllers.updateUser)
//      .delete(userControllers.deleteUser)    



module.exports = router