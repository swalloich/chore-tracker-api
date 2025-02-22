const express = require('express')
const router = express.Router()

router.use('/', require('./swagger'))
router.use('/auth', require('./auth'))
router.use('/chores', require('./chores'))
router.use('/collections', require('./choreCollections'))
router.use('/profile', require('./profile'))
router.use('/users', require('./users'))

module.exports = router