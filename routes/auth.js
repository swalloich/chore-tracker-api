const router = require('express').Router()
const { getCurrentUrl } = require('../utilities')
const { auth } = require('express-openid-connect')
const { isAuthenticated } = require('../controllers/auth')

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: getCurrentUrl(),
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
}

router.use(auth(config))
router.get('/', isAuthenticated)

module.exports = router