const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../controllers/auth')

router.use('/', require('./swagger'))
router.use('/chores', isAuthenticated, require('./chores')
  /*
  #swagger.security = [{
      "bearerAuth": []
  }]
  */
)
router.use('/collections', isAuthenticated, require('./choreCollections')
  /*
  #swagger.security = [{
      "bearerAuth": []
  }]
  */
)
router.use('/users', require('./users')
  /*
  #swagger.security = [{
      "bearerAuth": []
  }]
  */
)

module.exports = router