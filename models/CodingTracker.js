const mongoose = require('mongoose')

const codeTrackingSchema = new mongoose.Schema({
  language: {
    type: [String],
    required: false,
    default: ['html', 'css', 'js']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: false
  }
})

module.exports = mongoose.model('CodeTracking', codeTrackingSchema)
