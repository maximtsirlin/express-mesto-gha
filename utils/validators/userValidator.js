const { celebrate, Joi } = require('celebrate');
const { isURL, isID } = require('../constants');
const BadRequest = require('../../errors/badRequest-error');

const urlRegex = (url) => {
  if (isURL(url)) {
    return url;
  }
  throw new BadRequest('Некорректный адрес URL');
};

const idRegex = (id) => {
  if (isID(id)) {
    return id;
  }
  throw new BadRequest('Передан некорретный id.');
};

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlRegex),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(idRegex),
  }),
});
