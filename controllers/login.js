const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ERROR_UNAUTHORIZED } = require('../errors/errors');

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'login_token', { expiresIn: '7d' });
      const day = 24 * 60 * 60 * 1000;
      res.status(201).cookie('login_token', `Bearer ${token}`, {
        maxAge: 7 * day, httpOnly: true,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError');
      res
        .status(ERROR_UNAUTHORIZED)
        .send({ message: 'Ошибка авторизации' });
    });
};
