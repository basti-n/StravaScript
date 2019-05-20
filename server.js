const setupServer = require('./server-setup')
const app = setupServer()
require('dotenv').config()

const fetch = require('node-fetch')

app.get('/token', (req, res) =>
  getAccessTokenFromStrava().then(data => {
    console.log(data)
    res.json(data)
  })
)

const fetchOptions = (method, type = 'application/json') => ({
  method,
  headers: {
    'Content-Type': type
  }
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
