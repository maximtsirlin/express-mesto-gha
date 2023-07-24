const { Joi, celebrate } = require('celebrate');
const { isURL, isID } = require('../constants');
const BadRequest = require('../../errors/badRequest-error');

const urlRegex = (url) => {
  if (isURL) {
    return url;
  }
  throw new BadRequest('Некорректный адрес URL');
};

const idRegex = (id) => {
  if (isID) {
    return id;
  }
  throw new BadRequest('Передан некорретный id.');
};

module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(urlRegex),
  }),
});

module.exports.validateCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(idRegex),
  }),
});
