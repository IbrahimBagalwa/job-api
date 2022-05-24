const userRouter = require('./auth.route')
const jobRouter = require('./jobs.route')

const express = require('express')

const apiRouter = express.Router()

apiRouter.use('/auth', userRouter).use('/job', jobRouter)

module.exports = apiRouter
