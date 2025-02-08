const db = require('../db')
const { ObjectId } = require('mongodb')
const { userSchema } = require('./validation')

const collection = 'users'

async function createUser(req, res) {
  /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Chore data',
          required: true,
          schema: {
              $ref: "#/definitions/NewUser"
          }
      }
  */
}

async function deleteUser(req, res) {
  /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID of the chore to delete',
          required: true,
          type: 'string'
      }
  */
}

async function getUser(req, res) {
  /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID of the chore to get',
          required: true,
          type: 'string'
      }
  */
}

async function getUsers(req, res) {
  /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'get all chores that match the query',
          required: true,
      }
  */
}

async function updateUser(req, res) {
  /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'update the specified chore',
          required: true,
          schema: {
              $ref: "#/definitions/User"
          }
      }
  */
}

module.exports = { createUser, deleteUser, getUser, getUsers, updateUser }
