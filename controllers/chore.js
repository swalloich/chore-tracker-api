const db = require('../db')
const { ObjectId } = require('mongodb')
const schemas = require('./validation')
const ServerError = require('../middleware/ServerError')

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
  const { error } = schemas.newChoreSchema.validate(req.body, { abortEarly: false })
  if (error) {
    throw new ServerError(400, error.details.map((error) => error.message))
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
  const { error } = schemas.idSchema.validate(req.params.id)
  if (error) {
    throw new ServerError(400, error.details.map((error) => error.message))
  }

  await db.deleteOne({ collection, filter: { _id: ObjectId.createFromHexString(req.params.id) } })
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).send(`No chore found with id: ${req.params.id}`)
      } else {
        res.status(204).send()
      }
    })
    .catch((err) => {
      next(err)
    })
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

async function getChores(req, res, next) {
  /* #swagger.parameters['ids'] = {
          in: 'query',
          description: 'Get all chores in the list of ids, or all chores if not specified. Recommend using GET /chores/:id if only one chore is needed',
          required: false,
      }
  */
  let ids = req.query.ids
  if (ids) {
    if (typeof ids === 'string') {
      ids = ids.split(',')
    }
    const { error } = schemas.idArraySchema.validate(ids, { abortEarly: false })
    if (error) {
      throw new ServerError(400, error.details.map((error) => error.message))
    }
  }
  const params = ids ? { _id: { $in: ids.map((id) => ObjectId.createFromHexString(id)) } } : {}
  const chores = await db.find({ collection, params })
  chores.toArray()
    .then((chores) => {
      res.status(200).json(chores)
    })
    .catch((err) => {
      next(err)
    })
}

async function updateChore(req, res, next) {
  /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'update the specified chore',
          required: true,
          schema: {
              $ref: "#/definitions/Chore"
          }
      }
  */
  const { error } = schemas.choreSchema.validate(req.body, { abortEarly: false })
  if (error) {
    throw new ServerError(400, error.details.map((error) => error.message))
  }

  const id = ObjectId.createFromHexString(req.params.id)
  await db.updateOne({ collection, filter: { _id: id }, data: req.body })
    .then((result) => {
      if (result.matchedCount === 0) {
        res.status(404).send(`No chore found with id: ${req.params.id}`)
      } else {
        res.status(204).send()
      }
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = { createChore, deleteChore, getChore, getChores, updateChore }
