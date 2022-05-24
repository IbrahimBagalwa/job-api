const { StatusCodes } = require('http-status-codes')
const User = require('../model/user')
const { BadRequestError } = require('../helpers/errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: 'User has been created successfully',
    data: user,
  })
}

const login = async (req, res) => {
  res.send('login user')
}

module.exports = { register, login }
