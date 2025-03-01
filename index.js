const express = require('express')
const app = express()
require('./db').connect()
const errorHandler = require('./middleware/errorHandler')
const { auth } = require('express-openid-connect')
const { getCurrentUrl } = require('./utilities')

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: getCurrentUrl(),
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  routes: {
    login: '/auth/login',
    logout: '/auth/logout',
    callback: '/auth/callback',
  }
}

app.use(express.json())
app.use(auth(config))
app.use('/', require('./routes'))

app.use(errorHandler)

const DEFAULT_PORT = process.env.PORT || 8080
app.listen(DEFAULT_PORT, () => {
  console.log(`Server is running on http://localhost:${DEFAULT_PORT}`)
})