const { MongoClient} = require('mongodb')
require('dotenv').config()

const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_PROTOCOL = process.env.DB_PROTOCOL
const DB_URI = process.env.DB_URI
const DB_USER = process.env.DB_USER
const uri = `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_URI}`

let client

function connect() {
  if (client) return client
  MongoClient.connect(uri)
    .then((connection) => {
      client = connection
    })
    .catch((err) => {
      console.error(err)
    })
}

async function deleteOne({ collection, options, query }, next) {
  if (!collection) throw new Error('Collection is required for deleteOne')
  if (!query) throw new Error('Query is required for deleteOne')

  try {
    return client.db(DB_NAME).collection(collection).deleteOne(query, options)
  } catch (err) {
    next(err)
  }
}

/**
 * Finds all documents the parameters specify in a specified collection
 * @param {*} params - The parameters for the find function
 * @param {string} params.collection - The collection to search
 * @param {Object} params.params - The parameters for the search
 * @returns {Promise} - The result of the find function
 */
async function find({ collection, params }, next) {
  if (!collection) throw new Error('Collection is required for find')

  try {
    return client.db(DB_NAME).collection(collection).find({...params})
  } catch (err) {
    next(err)
  }
}

/**
 * Finds a single document in a specified collection
 * @param {Object} params - The parameters for the findOne function
 * @param {string} params.collection - The collection to search
 * @param {string} params.options - The options for the search
 * @param {Object} params.query - The query to search for
 * @returns {Promise} - The result of the findOne function
 */
async function findOne({ collection, options, query }, next) {
  if (!query) throw new Error('Query is required for findOne')
  if (!collection) throw new Error('Collection is required for findOne')

  try {
    return client.db(DB_NAME).collection(collection).findOne(query, options)
  } catch (err) {
    next(err)
  }
}

/**
 * Adds a single document to a specified collection
 * @param {*} params - The parameters for the insertOne function
 * @param {string} params.collection - The collection to insert into
 * @param {Object} params.data - The data to insert 
 * @returns {Promise} - The result of the insertOne function
 */
async function insertOne({ collection, data }, next) {
  if (!data) throw new Error('Data is required for insertOne')
  if (!collection) throw new Error('Collection is required for insertOne')

  try {
    return client.db(DB_NAME).collection(collection).insertOne(data)
  } catch (err) {
    next(err)
  }
}
/**
 * Updates a single document in a specified collection
 * @param {*} params - The parameters for the updateOne function
 * @param {string} params.collection - The collection to update
 * @param {Object} params.data - The data to update
 * @param {Object} params.query - The query for the update
 * @param {Object} params.options - The options for the update
 * @returns {Promise} - The result of the updateOne function
 */
async function updateOne({ collection, data, query, options }, next) {
  if (!collection) throw new Error('Collection is required for updateOne')
  if (!data) throw new Error('Data is required for updateOne')
  if (!query) throw new Error('Query is required for updateOne')

  try {
    return client.db(DB_NAME).collection(collection).updateOne(query, { $set: data }, options)
  } catch (err) {
    next(err)
  }
}

module.exports = { connect, deleteOne, find, findOne, insertOne, updateOne }