const db = require('../db')
const { ObjectId } = require('mongodb')
const { idSchema, userSchema } = require('./validation')
const ServerError = require('../middleware/ServerError')

const collection = 'users'

async function createUser(req, res, next) {
  /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Chore data',
          required: true,
          schema: {
              $ref: "#/definitions/NewUser"
          }
      }
  */
 const { error } = userSchema.validate(req.body, { abortEarly: false })
  if (error) {
    return next(new ServerError(400, error.details.map(error => error.message).join(', ')))
  }

  try {
    const result = await db.insertOne({ collection, data: req.body })
    res.status(201).json({ id: result.insertedId })
  } catch (err) {
    next(err)
  }
}

async function deleteUser(req, res, next) {
  /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID of the chore to delete',
          required: true,
          type: 'string'
      }
  */
  const { error } = idSchema.validate(req.params.id)
  if (error) {
    return next(new ServerError(400, error.details.map(error => error.message).join(', ')))
  }

  await db.deleteOne({ collection, query: { _id: ObjectId.createFromHexString(req.params.id) } })
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).send(`No user found with id: ${req.params.id}`)
      } else {
        res.status(200).send()
      }
    })
    .catch((err) => {
      next(err)
    })
}

async function getUser(req, res, next) {
  /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID of the chore to get',
          required: true,
          type: 'string'
      }
  */
  const { error } = idSchema.validate(req.params.id)
  if (error) {
    return next(new ServerError(400, error.details.map(error => error.message).join(', ')))
  }

  const id = ObjectId.createFromHexString(req.params.id)
  await db.findOne({ collection, query: { _id: id } })
    .then((result) => {
      if (result) {
        res.status(200).json(result)
      } else {
        res.status(404).send(`No user found with id: ${req.params.id}`)
      }
    })
    .catch((err) => {
      next(err)
    })
}

async function getUsers(req, res, next) {
  /* #swagger.parameters['ids'] = {
          in: 'query',
          description: 'Get all users in the list of ids, or all users if not provided',
          required: false,
          type: 'array',
          items: {
              type: 'string'
          }
      }
  */
  let ids = req.query.ids
  if (ids) {
    if (typeof ids === 'string') {
      ids = ids.split(',')
    }
    const { error } = idArraySchema.validate(ids, { abortEarly: false })
    if (error) {
      return next(new ServerError(400, error.details.map(error => error.message).join(', ')))
    }
  }
  const params = ids ? { _id: { $in: ids.map(id => ObjectId.createFromHexString(id)) } } : {}
  const users = await db.find({ collection, params })
  users.toArray()
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      next(err)
    })
}

async function updateUser(req, res, next) {
  /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'update the specified chore',
          required: true,
          schema: {
              $ref: "#/definitions/User"
          }
      }
  */
  const { error } = userSchema.validate(req.body, { abortEarly: false })
  if (error) {
    return next(new ServerError(400, error.details.map(error => error.message).join(', ')))
  }

  const id = ObjectId.createFromHexString(req.params.id)
  await db.updateOne({ collection, query: { _id: id }, data: req.body })
    .then((result) => {
      if (result.matchedCount === 0) {
        res.status(404).send(`No user found with id: ${req.params.id}`)
      } else {
        res.status(200).send()
      }
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = { createUser, deleteUser, getUser, getUsers, updateUser }
