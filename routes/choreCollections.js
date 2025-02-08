const express = require('express')
const router = express.Router()
const {
  createCollection,
  deleteCollection,
  getCollection,
  getCollections,
  updateCollection
} = require('../controllers/choreCollection')

router.get('/:user_id', getCollections)
router.post('/:user_id', createCollection)
router.delete('/:user_id/:collection_id', getCollection)
router.get('/:user_id/:collection_id', deleteCollection)
router.put('/:user_id/:collection_id', updateCollection)

module.exports = router
