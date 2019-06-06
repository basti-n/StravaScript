const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    trim: true,
  },
  access_token: {
    type: String,
  },
  refresh_token: {
    type: String,
  },
  expires_at: {
    type: Number,
  },
  code: {
    type: String,
  },
})

module.exports = mongoose.model('User', userSchema)
