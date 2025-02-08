const express = require('express')
const router = express.Router()

router.use('/', require('./swagger'))
router.use('/collections', require('./choreCollections'))
router.use('/chores', require('./chores'))
router.use('/users', require('./users'))

module.exports = router