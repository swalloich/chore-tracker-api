const express = require('express')
const router = express.Router()
const { createChore, deleteChore, getChore, getChores, updateChore } = require('../controllers/chore')

router.get('/', getChores)
router.post('/', createChore)
router.delete('/:id', deleteChore)
router.get('/:id', getChore)
router.put('/:id', updateChore)

module.exports = router