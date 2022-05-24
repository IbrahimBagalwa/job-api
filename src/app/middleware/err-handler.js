const { StatusCodes } = require('http-status-codes')
const { CustomAPIError } = require('../helpers/errors')

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      success: err.success,
      status: err.statusCode,
      message: err.message,
    })
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: `Something went wrong, Please try again later`,
  })
}

module.exports = errorHandler
