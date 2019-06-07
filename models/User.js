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
  weeklyGoal: {
    coding: {
      type: Number,
    },
    sport: {
      type: Number,
    },
  },
  settings: {
    darkMode: {
      type: Boolean,
      Default: false,
    },
    notifications: {
      type: Boolean,
      Default: false,
    },
  },
  codingActivities: {
    type: Array,
  },
})

module.exports = mongoose.model('User', userSchema)
