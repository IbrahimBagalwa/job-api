const { StatusCodes } = require('http-status-codes')
const User = require('../model/user')
const { BadRequestError, UnauthenticatedError } = require('../helpers/errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT() //INSTANCE METHOD
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: 'User has been created successfully',
    data: user,
    token,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError(
      'Invalid credentials, Email or password invalid'
    )
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(
      'Invalid credentials, Email or password invalid'
    )
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: 'Login success',
    data: user,
    token,
  })
}

module.exports = { register, login }
