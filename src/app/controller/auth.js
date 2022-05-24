const register = async (req, res) => {
  res.send('Register user')
}

const login = async (req, res) => {
  res.send('login user')
}

module.exports = { register, login }
