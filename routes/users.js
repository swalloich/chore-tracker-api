const express = require('express')
const router = express.Router()
const { createUser, deleteUser, getUser, getUsers, updateUser } = require('../controllers/user')

router.get('/', getUsers)
router.post('/', createUser)
router.delete('/:id', deleteUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)

module.exports = router