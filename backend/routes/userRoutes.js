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
<<<<<<< HEAD
   // .post(userControllers.login)
   .post((req, res)=>{
    res.send()
   })
=======
     .post(userControllers.login)
>>>>>>> 2695674f6aa6c52ef498323db8f6a5e6e00443d8


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