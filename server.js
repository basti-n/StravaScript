const setupServer = require('./server-setup')
const app = setupServer()
const nodemailer = require('nodemailer')
require('dotenv').config()

const fetch = require('node-fetch')
const User = require('./models/User')

app.get('/token', (req, res) => {
  getAccessTokenFromStrava(req.query.code).then(data => {
    return res.json(data)
  })
})

const fetchOptions = (method, type = 'application/json') => ({
  method,
  headers: {
    'Content-Type': type,
  },
})

const getAccessTokenFromStrava = code =>
  fetch(
    `https://www.strava.com/oauth/token?client_id=${
      process.env.STRAVA_CLIENT_ID
    }&client_secret=${
      process.env.STRAVA_CLIENT_SECRET
    }&code=${code}&grant_type=authorization_code`,
    fetchOptions('POST')
  )
    .then(res => res.json())
    .catch(err => err.json({ errors: [err] }))

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

app.get('/user/:id', (req, res) => {
  const { id } = req.params

  User.find({ id: id })
    .then(user => {
      return res.json(user)
    })
    .catch(err => res.json(err))
})

app.patch('/user/:id', (req, res) => {
  const { id } = req.params
  const data = req.body
  User.findOneAndUpdate({ id: id }, data, { new: true })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.post('/user/', (req, res) => {
  const { id, username } = req.body

  id &&
    User.create({ id, username })
      .then(user => res.json(user))
      .catch(err => res.json(err))
})

app.post('/feedback', (req, res) => {
  let mailContent = {
    from: 'stravascript@gmail.com',
    to: 'stravascript@gmail.com',
    subject: `App Feedback from ${req.body.user}`,
    text: req.body.text,
  }

  transporter.sendMail(mailContent, (err, data) => {
    if (err) {
      res.send(err.message)
    } else {
      res.status(200).send('Mail successfully sent')
    }
  })
})
