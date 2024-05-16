const express = require('express')
const authControllers = require('./../controllers/authControllers')
const userControllers = require('./../controllers/userControllers')
const router = express.Router()

router.route('/register')
    .post(userControllers.createUser)


router.route('/class')
    .get(userControllers.renderStudentClass)
    .post(userControllers.createUser)

router.route('/login')  
    .post(userControllers.login)


router.route('/class/file')
     .post(userControllers.createFile)
     .delete(userControllers.deleteFile)


 router.route('/class/lesson')
     .post(userControllers.createLesson)
     .delete(userControllers.deleteLesson)

     
 router.route('/:email')
     .get(userControllers.getUser)
     .put(userControllers.updateUser)
     .delete(userControllers.deleteUser)    




module.exports = router