const mongoose = reqiire('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide the username'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide the email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 12,
  },
})

module.exports = mongoose.model('User', UserSchema)
