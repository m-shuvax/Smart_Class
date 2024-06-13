const express = require('express');
const authControllers = require('./controllers/authControllers');
const controllers = require('./controllers/controllers');
const pageRenders = require('./controllers/pageRenders');
const chatControllers = require('./controllers/chatControllers')
const router = express.Router();

router.route('/register')
    .post(controllers.createUser);

router.route('/forgetPassword')
    .post(authControllers.forgetPassword);

router.route('/resetPassword/:token')
    .patch(authControllers.resetPassword)
    .post(authControllers.login);

router.route('/')
    .get(authControllers.protect, pageRenders.renderStudentClasses)
    .post(authControllers.protect, pageRenders.renderStudentClasses);

router.route('/classes')
    .get(authControllers.protect, pageRenders.renderInstructorClasses)
    .post(authControllers.protect, controllers.createClass);

router.route('/studentHomePage')
    .get(authControllers.protect, pageRenders.renderStudentClasses);

router.route('/login')
    .post(authControllers.login);

router.route('/logout')
    .get(authControllers.logout);

router.route('/accountDetails')
    .put(authControllers.protect, controllers.updateUser);

router.route('/pendingStudents')
    .post(authControllers.protect, pageRenders.handlePendingStudent);

router.route('/pendingStudents/:classId')
    .get(authControllers.protect, pageRenders.addPendingStudent);

router.route('/studentClass/:classId')
    .get(authControllers.protect, pageRenders.renderStudentClass);

router.route('/instructorClass/:classId')
    .get(authControllers.protect, pageRenders.renderInstructorClass);

router.route('/files')
    .post(authControllers.protect, controllers.createFile)

router.route('/files/:id')
.delete(authControllers.protect, controllers.deleteFile);

router.route('/lessons')
    .post(authControllers.protect, controllers.createLesson)
    
 router.route('/lessons/:id')
    .delete(authControllers.protect, controllers.deleteLesson);

router.route('/editLiveLink')
    .put(authControllers.protect, controllers.updateClassLiveLink);

router.route('/messages/:messageId')
    .post(authControllers.protect, chatControllers.createMessage)
    .delete(authControllers.protect, chatControllers.deleteMessage)


// router.route('/class/file')
//     .post(authMiddleware.protect, controllers.createFile)
//     .delete(authMiddleware.protect, controllers.deleteFile);

// router.route('/class/lesson')
//     .post(authMiddleware.protect, controllers.createLesson)
//     .delete(authMiddleware.protect, controllers.deleteLesson);

// router.route('/:email')
//     .get(authMiddleware.protect, controllers.getUser)
//     .put(authMiddleware.protect, controllers.updateUser)
//     .delete(authMiddleware.protect, controllers.deleteUser);


// // New routes for pending students
// router.post('/addPendingStudent', authMiddleware.protect, pageRenders.addPendingStudent);
// router.post('/handlePendingStudent', authMiddleware.protect, pageRenders.handlePendingStudent);

// // Existing routes for rendering classes
// router.get('/userClasses/:email', authMiddleware.protect, pageRenders.renderUserClasses);
// router.post('/studentClass', authMiddleware.protect, pageRenders.renderStudentClass);
// router.post('/instructorClass', authMiddleware.protect, pageRenders.renderInstructorClass);






module.exports = router;