const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./custom-err')

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message)
    ;(this.statusCode = StatusCodes.UNAUTHORIZED), (this.success = false)
  }
}

module.exports = UnauthenticatedError
