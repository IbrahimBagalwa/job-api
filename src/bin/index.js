const express = require('express')
const { StatusCodes } = require('http-status-codes')
require('dotenv').config()
require('express-async-errors')

const app = express()

// error handler
const errorHandler = require('../app/middleware/err-handler')
const notFound = require('../app/middleware/not-found')

app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: `Welcom to our jobs api`,
  })
})

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3600
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port} ...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
