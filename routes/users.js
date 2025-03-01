const express = require('express')
const router = express.Router()
const { createUser, deleteUser, getUser, getUsers, updateUser } = require('../controllers/user')
const { isAuthenticated } = require('../controllers/auth')

router.get('/', isAuthenticated, getUsers)
router.post('/', createUser
  /*
  #swagger.security = null
  */
)
router.delete('/:id', isAuthenticated, deleteUser)
router.get('/:id', isAuthenticated, getUser)
router.put('/:id', isAuthenticated, updateUser)
router.use('/auth', require('./auth')
  /*
  #swagger.security = null
  */
)

module.exports = router