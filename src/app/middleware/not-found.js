const { StatusCodes } = require('http-status-codes')

const notFound = (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({
      success: false,
      status: StatusCodes.NOT_FOUND,
      message: `Route you provide ${req.method}=${req.protocol}://${req.headers.host}${req.originalUrl} does not exist`,
    })
}

module.exports = notFound
