const setupServer = require('./server-setup')
const app = setupServer()

require('dotenv').config()
const fetch = require('node-fetch')

const CodingTracker = require('./models/CodingTracker')
