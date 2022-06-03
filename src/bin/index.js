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

// Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocumentation = YAML.load('./swagger.yaml')

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
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send(`
      <div style="width: 80%; margin: 0 auto; font-family: sans-serif;">
    <nav style="background-color: #517be6; padding: 0.1rem;">
      <h1 style="text-align: center;">Welcome to Job Api</h1>
    </nav>
    <div style="padding: 2rem;">
        <h2> Hey !</h2>
    
        <p>
          Do you need to show our documentation ??
        </p> 
      <div style="padding: 1rem 0 1rem 0;">
        <p>
            Click here <a href='/api-docs'><b style="text-align: center;">Documentation</b></a>
        </p>
      </div>
      <footer style="background-color: #c4c4c4; padding: 0.1rem">
        <p style="text-align: center; font-size: 0.8rem;">© 2022 <a href="https://github.com/IbrahimBagalwa">Ibrahim Bagalwa</a>. All rights reserved.</p>
      </footer>
  </div>`)
})
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation))
app.use('/api/v1', apiRouter)

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
