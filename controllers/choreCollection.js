const db = require('../db')
const { ObjectId } = require('mongodb')
const { choreCollectionSchema } = require('./validation')

const collection = 'chore-collections'

async function createCollection(req, res) {
  /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Chore collection data',
          required: true,
          schema: {
            $ref: '#/definitions/NewCollection'
          }
      }
  */
}

async function deleteCollection(req, res) {
  /* #swagger.parameters['user_id'] = {
          in: 'path',
          description: 'ID of the user',
          required: true,
          type: 'string'
      }
      #swagger.parameters['collection_id'] = {
          in: 'path',
          description: 'ID of the collection to delete',
          required: true,
          type: 'string'
      }
  */
}

async function getCollection(req, res) {
  /* #swagger.parameters['user_id'] = {
          in: 'path',
          description: 'ID of the user',
          required: true,
          type: 'string'
      }
      #swagger.parameters['collection_id'] = {
          in: 'path',
          description: 'ID of the collection to get',
          required: true,
          type: 'string'
      }
  */
}

async function getCollections(req, res) {
  /* #swagger.parameters['user_id'] = {
          in: 'path',
          description: 'ID of the user',
          required: true,
          type: 'string'
      }
  */
}

async function updateCollection(req, res) {
  /* #swagger.parameters['user_id'] = {
          in: 'path',
          description: 'ID of the user',
          required: true,
          type: 'string'
      }
      #swagger.parameters['collection_id'] = {
          in: 'path',
          description: 'ID of the collection to update',
          required: true,
          type: 'string'
      }
      #swagger.parameters['body'] = {
          in: 'body',
          description: 'Update data for the collection',
          required: true,
          schema: {
              $ref: '#/definitions/Collection'
          }
      }
  */
}

module.exports = { createCollection, deleteCollection, getCollection, getCollections, updateCollection }
