const mongoose = require('mongoose')

const codingActivitiesSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    Default: 'Coding Activity',
  },
  type: {
    type: String,
    Default: 'Code',
  },
  languages: {
    type: [String],
    required: false,
    default: ['backend', 'css', 'js'],
  },
  start_date: {
    type: String,
    required: true,
  },
  elapsed_time: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('CodingActivities', codingActivitiesSchema)
