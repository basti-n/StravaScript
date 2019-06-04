const setupServer = require('./server-setup')
const app = setupServer()
const nodemailer = require('nodemailer')
require('dotenv').config()

const fetch = require('node-fetch')

app.get('/token', (req, res) =>
  getAccessTokenFromStrava().then(data => {
    res.json(data)
  })
)

const fetchOptions = (method, type = 'application/json') => ({
  method,
  headers: {
    'Content-Type': type,
  },
})

const getAccessTokenFromStrava = () =>
  fetch(
    `https://www.strava.com/oauth/token?client_id=${
      process.env.STRAVA_CLIENT_ID
    }&client_secret=${process.env.STRAVA_CLIENT_SECRET}&code=${
      process.env.STRAVA_CODE
    }&grant_type=authorization_code`,
    fetchOptions('POST')
  )
    .then(response => response.json())
    .catch(error => error.json({ errors: [error] }))

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

app.post('/feedback', (req, res) => {
  let mailContent = {
    from: 'stravascript@gmail.com',
    to: 'stravascript@gmail.com',
    subject: `App Feedback from ${req.body.user}`,
    text: req.body.data,
  }

  transporter.sendMail(mailContent, (err, data) => {
    if (err) {
      res.send(err.message)
    } else {
      res.status(200).send('Mail successfully sent')
    }
  })
})
