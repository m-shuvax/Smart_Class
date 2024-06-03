const express = require('express');
const authControllers = require('./../controllers/authControllers');
const userControllers = require('./../controllers/userControllers');
const pageRenderController = require('./../controllers/pageRenders');
//const authMiddleware = require('./../middleware/authMiddleware');
const router = express.Router();

router.route('/register')
    .post(userControllers.createUser);

router.route('/login')
    .post(authControllers.login);

router.route('/')
    .get(authControllers.protect, pageRenderController.renderStudentClasses)
    .post(authControllers.protect, pageRenderController.renderStudentClasses);

router.route('/classes')
    .get(authControllers.protect, pageRenderController.renderStudentClasses);

router.route('/logout')
    .get(authControllers.logout);

    // .post((req, res) => {
    //     console.log(req.body);
    //     res.send('Login data received');
    // });


router.route('/account')
    .put(authControllers.protect, userControllers.updateUser);
   
// router.route('/class')
//     .get(authMiddleware.protect, userControllers.renderStudentClass)
//     .post(authMiddleware.protect, userControllers.createUser);

// router.route('/login')
//     .post(userControllers.login);

// router.route('/class/file')
//     .post(authMiddleware.protect, userControllers.createFile)
//     .delete(authMiddleware.protect, userControllers.deleteFile);

// router.route('/class/lesson')
//     .post(authMiddleware.protect, userControllers.createLesson)
//     .delete(authMiddleware.protect, userControllers.deleteLesson);

// router.route('/:email')
//     .get(authMiddleware.protect, userControllers.getUser)
//     .put(authMiddleware.protect, userControllers.updateUser)
//     .delete(authMiddleware.protect, userControllers.deleteUser);


// // New routes for pending students
// router.post('/addPendingStudent', authMiddleware.protect, pageRenderController.addPendingStudent);
// router.post('/handlePendingStudent', authMiddleware.protect, pageRenderController.handlePendingStudent);

// // Existing routes for rendering classes
// router.get('/userClasses/:email', authMiddleware.protect, pageRenderController.renderUserClasses);
// router.post('/studentClass', authMiddleware.protect, pageRenderController.renderStudentClass);
// router.post('/instructorClass', authMiddleware.protect, pageRenderController.renderInstructorClass);

module.exports = router;