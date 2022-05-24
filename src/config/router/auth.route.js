const express = require('express')
const { login, register } = require('../../app/controller/auth')

const router = express.Router()

router.route('/create').post(register)
router.route('/login').post(login)

module.exports = router
