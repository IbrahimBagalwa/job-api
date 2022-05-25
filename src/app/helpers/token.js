const pkg = require('jsonwebtoken')
require('dotenv'), config()

const { sign, verify, decode } = pkg
const { JWT_EXPIRE_IN_HRS, JWT_KEY } = process.env
const generateToken = (userId) => {
  const token = sign({ id: userId }, JWT_KEY, { expiresIn: JWT_EXPIRE_IN_HRS })
  return token
}
