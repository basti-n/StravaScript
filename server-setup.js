const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()

//'mongodb://localhost:27017/stravascript'

module.exports = function() {
  mongoose
    .connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/stravascript',
      {
        useNewUrlParser: true,
      }
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err))

  const app = express()
  app.use(express.json())
  app.use(express.static(path.join(__dirname, 'build')))

  app.listen(process.env.PORT || 4000, err => {
    err ? console.log(err) : console.log('Server ready')
  })

  app.get(
    [
      '/',
      '/connect',
      '/connect/*',
      '/goals',
      '/code',
      '/sport',
      '/faq',
      '/settings',
    ],
    function(req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'))
    }
  )

  return app
}
