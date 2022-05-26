const User = require('../model/user')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../helpers/errors')

const auth = async (req, res, next) => {
  const authHeader = req.headers.autorization
  if (!authHeader || !authHeader.startsWith('Baerer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach user to the job routes
    req.user = { userId: payload.userId, username: payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth
