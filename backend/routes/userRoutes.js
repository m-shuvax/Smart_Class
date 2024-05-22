const express = require('express')
const authControllers = require('./../controllers/authControllers')
const userControllers = require('./../controllers/userControllers')
const router = express.Router()

router.route('/register')
    .post(authControllers.register)

module.exports = router