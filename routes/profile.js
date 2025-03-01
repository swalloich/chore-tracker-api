const express = require('express')
const router = express.Router()
const { requiresAuth } = require('express-openid-connect')
const { getUserProfile } = require('../controllers/profile')

router.get('/', requiresAuth(), getUserProfile
  /*
  #swagger.security = [{ "auth0": [] }]
  */
)

module.exports = router
