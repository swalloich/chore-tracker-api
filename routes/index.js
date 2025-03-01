const express = require('express')
const { requiresAuth } = require('express-openid-connect')
const router = express.Router()

router.use('/', require('./swagger'))
router.use('/chores', requiresAuth(), require('./chores'))
router.use('/collections', require('./choreCollections'))
router.use('/profile', require('./profile'))
router.use('/users', require('./users'))

module.exports = router