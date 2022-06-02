const { StatusCodes } = require('http-status-codes')
// const { CustomAPIError } = require('../helpers/errors')

const errorHandler = (err, req, res, next) => {
  let customError = {
    success: false,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, Please try again later',
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({
  //     success: err.success,
  //     status: err.statusCode,
  //     message: err.message,
  //   })
  // }
  if (err.name === 'ValidationError') {
    customError.success,
      (customError.statusCode = StatusCodes.BAD_REQUEST),
      (customError.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(','))
  }
  if (err.code && err.code === 11000) {
    customError.success,
      (customError.statusCode = StatusCodes.BAD_REQUEST),
      (customError.message = `Duplicated value entered for ${Object.keys(
        err.keyValue
      )} field, Please choose another value`)
  }
  return res.status(customError.statusCode).json({
    success: customError.success,
    status: customError.statusCode,
    message: customError.message,
  })
  // return res.status(customError.statusCode).json({
  //   success: false,
  //   status: StatusCodes.INTERNAL_SERVER_ERROR,
  //   message: `Something went wrong, Please try again later`,
  //   err,
  // })
}

module.exports = errorHandler
