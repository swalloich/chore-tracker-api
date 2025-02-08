const Joi = require('joi')

const choreCollectionSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  chores: Joi.array().items(Joi.string()).required(),
})

module.exports = choreCollectionSchema