const { Joi, celebrate } = require('celebrate');
const { urlRegex } = require('../constants');

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(urlRegex),
  }),
});

const validateCardById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateCreateCard,
  validateCardById,
};
