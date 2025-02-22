const router = require('express').Router()
const { isAuthenticated } = require('../controllers/auth')

router.get('/', isAuthenticated)

module.exports = router