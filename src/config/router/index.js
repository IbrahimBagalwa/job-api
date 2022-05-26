const userRouter = require('./auth.route')
const jobRouter = require('./jobs.route')

const express = require('express')
const authenticateUser = require('../../app/middleware/authentication')
const apiRouter = express.Router()

apiRouter.use('/auth', userRouter).use('/job', authenticateUser, jobRouter)

module.exports = apiRouter
