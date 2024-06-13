const express = require('express');
const authControllers = require('./controllers/authControllers');
const controllers = require('./controllers/controllers');
const pageRenders = require('./controllers/pageRenders');
const chatControllers = require('./controllers/chatControllers')
const router = express.Router();

router.route('/register')
    .post(controllers.createUser);

router.route('/forgetPassword')
    .patch(authControllers.forgetPassword);

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
    .delete(authControllers.protect, controllers.deleteFile);

router.route('/lessons')
    .post(authControllers.protect, controllers.createLesson)
    .delete(authControllers.protect, controllers.deleteLesson);

router.route('/editLiveLink')
    .put(authControllers.protect, controllers.updateClassLiveLink);

router.route('/messages/:messageId')
    .post(authControllers.protect, chatControllers.createMessage)
    .delete(authControllers.protect, chatControllers.deleteMessage);

module.exports = router;
