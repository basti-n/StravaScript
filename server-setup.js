const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()

//'mongodb://localhost:27017/stravascript'

module.exports = function() {
  mongoose
    .connect(
      `mongodb+srv://Neumair:${
        process.env.MONGO_PASSWORD
      }@cluster0-puv2j.mongodb.net/stravascript?retryWrites=true&w=majority`,
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

  app.get(['/', '/connect', '/connect/*', '/goals'], function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })

  return app
}
