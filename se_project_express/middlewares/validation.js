const {Joi, celebrate} = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

module.exports.validateCardBody = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        'string.empty': 'The "imageUrl" field must be filled in',
        'string.uri': 'the "imageUrl" field must be a valid url',
      }),
      weather: Joi.string().valid('hot', 'warm', 'cold').required()
    })
  }
)

module.exports.validateUserBody = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string().required().custom(validateURL).messages({
        'string.empty': 'The "imageUrl" field must be filled in',
        'string.uri': 'the "imageUrl" field must be a valid url',
      }),
      email: Joi.string().required().email(),
      password: Joi.string().required()
    })
  }
)

module.exports.validateUpdateUser = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string().required().custom(validateURL).messages({
        'string.empty': 'The "imageUrl" field must be filled in',
        'string.uri': 'the "imageUrl" field must be a valid url',
      })
    })
  }
)

module.exports.authentication = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    })
  }
)

module.exports.validateId = celebrate(
  {
    body: Joi.object().keys({
      params: Joi.object().keys({
        itemId: Joi.string().alphanum().length(24),
      }),
      headers: Joi.object().keys({

      }).unknown(true),
      query: Joi.object().keys({

      })
    })
  }
)