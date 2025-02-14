const db = require('../db')
const { ObjectId } = require('mongodb')
const schemas = require('./validation')

const collection = 'chores'

async function createChore(req, res) {
  /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Chore data',
          required: true,
          schema: {
              $ref: "#/definitions/NewChore"
          }
      }
  */
  const { error } = schemas.choreSchema.validate(req.body, { abortEarly: false })
  if (error) {
    res.status(400).json({ errors: error.details.map((error) => error.message) })
    return
  }

  try {
    const result = await db.insertOne({ collection, data: req.body })
    res.status(201).json({ id: result.insertedId })
  } catch (err) {
    next(err)
  }
}

async function deleteChore(req, res) {
  /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID of the chore to delete',
          required: true,
          type: 'string'
      }
  */
}

async function getChore(req, res) {
  /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID of the chore to get',
          required: true,
          type: 'string'
      }
  */
  const id = ObjectId.createFromHexString(req.params.id)
  await db.findOne({ collection, query: { _id: id } })
    .then((result) => {
      if (!result) {
        res.status(404).send(`No chore found with id: ${req.params.id}`)
      } else {
        res.status(200).json(result)
      }
    })
    .catch((err) => {
      next(err)
    })
}

async function getChores(req, res) {
  /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'get all chores that match the query',
          required: true,
      }
  */
}

async function updateChore(req, res) {
  /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'update the specified chore',
          required: true,
      }
  */
}

module.exports = { createChore, deleteChore, getChore, getChores, updateChore }
