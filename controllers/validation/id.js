const Joi = require('joi')

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
const idArraySchema = Joi.array().items(idSchema)

module.exports = { idSchema, idArraySchema }