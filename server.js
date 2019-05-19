const setupServer = require('./server-setup')
const app = setupServer()
require('dotenv').config()
const fetch = require('node-fetch')

let token

app.get('/strava', (req, res) => {
  console.log('started')
  if (!token) {
    getAccessTokenFromStrava().then(data => {
      token = data.access_token
      getActivitiesFromStrava(token).then(data => {
        console.log(data)
        res.json(data)
      })
    })
  } else {
    getActivitiesFromStrava(token).then(data => console.log(data))
  }
})

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

const getActivitiesFromStrava = token =>
  token &&
  fetch(
    `https://www.strava.com/api/v3/athlete/activities?access_token=${token}`
  )
    .then(res => res.json())
    .catch(error => error.json({ errors: [error] }))
