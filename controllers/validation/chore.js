const Joi = require('joi')

const choreSchema = Joi.object({
  name: Joi.string(),
  collectionId: Joi.string(),
  description: Joi.string(),
  frequency: Joi.string(),
  nextDue: Joi.date(),
  currentAssignee: Joi.string(),
  assignedUsers: Joi.array().items(Joi.string()),
})

const newChoreSchema = Joi.object({
  name: Joi.string().required(),
  collectionId: Joi.string(),
  description: Joi.string(),
  frequency: Joi.string().required(),
  nextDue: Joi.date().required(),
  currentAssignee: Joi.string().required(),
  assignedUsers: Joi.array().items(Joi.string()).required(),
})

module.exports = { choreSchema, newChoreSchema }