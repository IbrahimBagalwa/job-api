const express = require('express')
const { StatusCodes } = require('http-status-codes')
require('dotenv').config()
require('express-async-errors')
const app = express()

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// error handler
const errorHandler = require('../app/middleware/err-handler')
const notFound = require('../app/middleware/not-found')
const apiRouter = require('../config/router')
const connectDB = require('../db/database')

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 requests per windowMs
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

// routes
app.use('/api/v1', apiRouter)
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: `Welcom to our jobs api`,
  })
})

// middleware
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3600
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port} ...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
